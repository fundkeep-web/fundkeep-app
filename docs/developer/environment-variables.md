# Environment Variables

Create a `.env.local` file in the project root (`cp .env.example .env.local`). All `NEXT_PUBLIC_` variables are exposed to the browser; never put secrets in them.

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_CONTRACT_ID` | Yes | The deployed FundKeep Soroban contract address | `CBYUMUNDBGT5JTYX62SSFH5NTK2ELLRT2PP3LLZOI757JB4BULDDDFAH` |
| `NEXT_PUBLIC_USDC_CONTRACT_ID` | Yes | The SAC (Stellar Asset Contract) address of the token being saved | See below |
| `NEXT_PUBLIC_STELLAR_NETWORK` | Yes | The deployed network; FundKeep v1 supports `testnet` | `testnet` |
| `NEXT_PUBLIC_SOROBAN_RPC_URL` | Yes | Soroban RPC endpoint for the selected network | `https://soroban-testnet.stellar.org` |
| `NEXT_PUBLIC_INDEXER_URL` | No | Base URL of a running [`fundkeep-indexer`](https://github.com/fundkeep-web/fundkeep-indexer) instance, used for the activity feed and cross-device goal sync | `http://localhost:4000` |

The contract, token, network, and RPC variables are required for wallet actions. `NEXT_PUBLIC_INDEXER_URL` is optional, but without it the app cannot restore indexed activity or on-chain goals across devices.

## About `NEXT_PUBLIC_USDC_CONTRACT_ID`

The deployed contract accepts the configured token SAC. [`fundkeep-contract`](https://github.com/fundkeep-web/fundkeep-contract)'s `scripts/deploy.sh` prints the contract configuration but does not create a test USDC asset. Verify the token SAC against Testnet before using it. **Do not reuse an address you found in an old doc or example without verifying it on-chain first** — an invalid or stale address causes transactions to fail.

## Variables that don't exist

Earlier drafts of this doc referenced `NEXTAUTH_SECRET` / `NEXTAUTH_URL`. FundKeep does not use NextAuth or any server-side session — wallet connection is entirely client-side via Freighter. Those variables do nothing and can be ignored/removed if present in an old `.env.local`.
