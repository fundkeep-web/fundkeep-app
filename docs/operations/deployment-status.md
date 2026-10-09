# Deployment Status

FundKeep's public environment runs on Stellar Testnet and is intended for demonstration and review.

## Verified services

| Component | Platform | Public location |
| --- | --- | --- |
| Web application | Vercel | [fundkeep.vercel.app](https://fundkeep.vercel.app) |
| Documentation | GitBook | [entity-6.gitbook.io/fundkeep](https://entity-6.gitbook.io/fundkeep) |
| Event indexer and API | Render | [Health endpoint](https://fundkeep-indexer.onrender.com/health) |
| Savings contract | Stellar Testnet | [Contract explorer](https://stellar.expert/explorer/testnet/contract/CBYUMUNDBGT5JTYX62SSFH5NTK2ELLRT2PP3LLZOI757JB4BULDDDFAH) |
| Accepted token SAC | Stellar Testnet | `CCUWRYBOQTKMKTBLBJX5ZOZ2ZGCL7Z4ODNDB53DIPI4XMB4XBONY6G6X` |

The deployed frontend bundle is configured with the contract, token SAC, Testnet RPC and Render indexer shown above. The indexer health response includes its latest processed ledger.

## Topology

```text
Browser + Freighter ---- signed transaction ----> Soroban RPC ----> FundKeep contract
        |
        +---- indexed reads ----> Render indexer/API ----> persistent SQLite disk
```

The frontend is stateless and belongs on Vercel. The indexer continuously polls contract events and requires a long-running Render web service plus a persistent disk. SQLite stores the ledger cursor, goal read models and activity history.

## Vercel configuration

Configure the five public variables from `.env.example`. They contain no secrets, but they are embedded into the browser bundle at build time. A change requires a new Vercel deployment.

## Render configuration

Deploy `fundkeep-indexer` from its committed `render.yaml`. The Blueprint fixes Node 22, the verified contract, Testnet RPC, Vercel CORS origin, health path and persistent-disk location. Confirm `/health` returns `ok: true` and that `lastLedger` advances.

## Release checks

```bash
curl --fail https://fundkeep-indexer.onrender.com/health
curl --fail https://fundkeep.vercel.app
```

Also open the contract in Stellar Expert and verify that Freighter is set to Testnet before signing.
