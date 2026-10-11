# Environment Variables

Create a `.env.local` file in the project root (`cp .env.example .env.local`). All `NEXT_PUBLIC_` variables are exposed to the browser; never put secrets in them.

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_CONTRACT_ID` | Yes | The deployed FundKeep Soroban contract address | `CBYUMUNDBGT5JTYX62SSFH5NTK2ELLRT2PP3LLZOI757JB4BULDDDFAH` |
| `NEXT_PUBLIC_USDC_CONTRACT_ID` | Yes | The SAC (Stellar Asset Contract) address of the token being saved | See below |
| `NEXT_PUBLIC_STELLAR_NETWORK` | Yes | The deployed network; FundKeep v1 supports `testnet` | `testnet` |
| `NEXT_PUBLIC_SOROBAN_RPC_URL` | Yes | Soroban RPC endpoint for the selected network | `https://soroban-testnet.stellar.org` |
| `NEXT_PUBLIC_INDEXER_URL` | No | Primary [`fundkeep-indexer`](https://github.com/fundkeep-web/fundkeep-indexer) base URL for the activity feed and cross-device goal sync | `https://fundkeep-indexer.onrender.com` |
| `NEXT_PUBLIC_INDEXER_FALLBACK_URL` | No | Secondary indexer used when the primary times out, has a network error, is rate limited, or returns a server error | `https://fundkeep-indexer-gnus.onrender.com` |

The contract, token, network, and RPC variables are required for wallet actions. The app uses the hosted primary and fallback indexers by default. Set `NEXT_PUBLIC_INDEXER_URL` and `NEXT_PUBLIC_INDEXER_FALLBACK_URL` to override them for another deployment.

## About `NEXT_PUBLIC_USDC_CONTRACT_ID`

The deployed contract accepts the configured token SAC. [`fundkeep-contract`](https://github.com/fundkeep-web/fundkeep-contract)'s `scripts/deploy.sh` prints the contract configuration but does not create a test USDC asset. Verify the token SAC against Testnet before using it. **Do not reuse an address you found in an old doc or example without verifying it on-chain first** — an invalid or stale address causes transactions to fail.

## Variables that don't exist

Earlier drafts of this doc referenced `NEXTAUTH_SECRET` / `NEXTAUTH_URL`. FundKeep does not use NextAuth or any server-side session — wallet connection is entirely client-side via Freighter. Those variables do nothing and can be ignored/removed if present in an old `.env.local`.
