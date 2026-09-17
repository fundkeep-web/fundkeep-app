import Link from "next/link";
import { fetchIndexedGoals } from "@/lib/indexer";
import { formatUsdc, formatDeadline, daysUntil, CADENCE_LABELS } from "@/lib/utils";

export default async function PublicGoalPage({
  params,
}: {
  params: Promise<{ goalId: string }>;
}) {
  const { goalId } = await params;

  // In read-only mode, fetch goal data from indexer or mock fallback
  let goal = null;
  try {
    const goals = await fetchIndexedGoals("");
    goal = goals?.find((g) => String(g.id) === String(goalId)) || null;
  } catch {
    goal = null;
  }

  if (!goal) {
    return (
      <main className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#141414] border border-white/10 text-center">
          <h1 className="text-xl font-bold">Goal Not Found</h1>
          <p className="text-sm text-white/50 mt-2">
            The requested savings goal #{goalId} could not be found or has not been indexed yet.
          </p>
          <Link
            href="/"
            className="inline-flex mt-6 px-4 py-2.5 rounded-xl bg-red text-sm font-bold text-white hover:bg-red/90 transition-colors"
          >
            Back to FundKeep
          </Link>
        </div>
      </main>
    );
  }

  const percent = Math.min(100, Math.round((goal.saved / (goal.target || 1)) * 100));
  const remaining = Math.max(0, goal.target - goal.saved);
  const deadlineDays = daysUntil(goal.deadline);

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.svg" alt="FundKeep logo" width={32} height={32} className="w-8 h-8 object-contain" />
            <span className="text-lg font-bold">
              Fund<span className="text-red">Keep</span>
            </span>
          </Link>
          <span className="px-3 py-1 rounded-lg border border-white/10 bg-white/5 text-xs text-white/70 font-semibold">
            Public View
          </span>
        </header>

        <section className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/10 flex flex-col gap-6 shadow-2xl">
          <div>
            <span className="text-xs uppercase tracking-wider text-red font-bold">Verified Savings Goal #{goal.id}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">{goal.title}</h1>
            {goal.description && (
              <p className="text-sm text-white/60 mt-2 leading-relaxed">{goal.description}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-black">{formatUsdc(goal.saved)} USDC</span>
              <span className="text-sm font-medium text-white/40">Target: {formatUsdc(goal.target)} USDC</span>
            </div>
            <div className="h-3 rounded-full bg-black/50 overflow-hidden">
              <div
                className="h-full bg-red rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/40 mt-1">
              <span>{percent}% achieved</span>
              <span>{formatUsdc(remaining)} USDC remaining</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-white/5 text-xs">
            <div>
              <p className="text-white/40 font-medium">Deadline</p>
              <p className="text-white font-bold mt-0.5">{formatDeadline(goal.deadline)}</p>
              <p className="text-[11px] text-white/40 mt-0.5">
                {deadlineDays < 0 ? "Deadline passed" : `${deadlineDays} days left`}
              </p>
            </div>
            <div>
              <p className="text-white/40 font-medium">Plan Cadence</p>
              <p className="text-white font-bold mt-0.5">{CADENCE_LABELS[goal.cadence] || goal.cadence}</p>
              <p className="text-[11px] text-white/40 mt-0.5">Enforced on Stellar</p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <span>Powered by Soroban Smart Contracts</span>
            <Link
              href="/"
              className="text-white hover:text-red transition-colors font-semibold"
            >
              Start saving on FundKeep &rarr;
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
