export interface IndexerGoal {
  goalId: number;
  owner: string;
  token: string;
  targetAmount: string;
  currentAmount: string;
  deadline: number;
  status: "LOCKED" | "UNLOCKED" | "WITHDRAWN";
  createdAtLedger: number;
  updatedAtLedger: number;
}

export interface IndexerActivity {
  id: number;
  goalId: number;
  owner: string;
  type: "create" | "deposit" | "unlock" | "withdraw";
  amount: string | null;
  ledger: number;
  txHash: string | null;
  createdAt: string;
}

const DEFAULT_INDEXER_URL = "https://fundkeep-indexer.onrender.com";
const DEFAULT_INDEXER_FALLBACK_URL = "https://fundkeep-indexer-gnus.onrender.com";
const INDEXER_REQUEST_TIMEOUT_MS = 8_000;

function baseUrls(): string[] {
  return [
    process.env.NEXT_PUBLIC_INDEXER_URL ?? DEFAULT_INDEXER_URL,
    process.env.NEXT_PUBLIC_INDEXER_FALLBACK_URL ?? DEFAULT_INDEXER_FALLBACK_URL,
  ].reduce<string[]>((urls, value) => {
    const normalized = value.trim().replace(/\/+$/, "");
    if (normalized && !urls.includes(normalized)) urls.push(normalized);
    return urls;
  }, []);
}

function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 425 || status === 429 || status >= 500;
}

async function fetchIndexerJson<T>(path: string): Promise<T | null> {
  for (const base of baseUrls()) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), INDEXER_REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`${base}${path}`, {
        cache: "no-store",
        signal: controller.signal,
      });
      if (response.ok) return (await response.json()) as T;
      if (!isRetryableStatus(response.status)) return null;
    } catch {
      // Try the next configured indexer after network errors, invalid JSON, or timeouts.
    } finally {
      clearTimeout(timeout);
    }
  }

  return null;
}

/** Never throws — returns an empty list if every indexer is unreachable. */
export async function fetchIndexedGoals(owner: string): Promise<IndexerGoal[]> {
  const data = await fetchIndexerJson<{ goals?: IndexerGoal[] }>(
    `/api/goals/${encodeURIComponent(owner)}`
  );
  return data?.goals ?? [];
}

export async function fetchIndexedActivityResult(
  owner: string,
  limit = 100
): Promise<{ reachable: boolean; activity: IndexerActivity[] }> {
  const data = await fetchIndexerJson<{ activity?: IndexerActivity[] }>(
    `/api/activity/${encodeURIComponent(owner)}?limit=${encodeURIComponent(String(limit))}`
  );
  if (!data) return { reachable: false, activity: [] };
  return { reachable: true, activity: data.activity ?? [] };
}

/** Never throws — returns an empty list if every indexer is unreachable. */
export async function fetchIndexedActivity(
  owner: string,
  limit = 100
): Promise<IndexerActivity[]> {
  const result = await fetchIndexedActivityResult(owner, limit);
  return result.activity;
}
