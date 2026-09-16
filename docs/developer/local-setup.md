# Local Setup

FundKeep is split across four repos (see [System Architecture](../introduction/architecture.md)). This page covers running the frontend against a deployed contract. To also run the contract or indexer locally, see their own repos' READMEs.

## Prerequisites

- **Node.js** v22.12 or higher
- **[Freighter](https://freighter.app)** browser extension, set to Testnet

## 1. Clone and Install

```bash
git clone https://github.com/Michealshodipo56/fundkeep-app.git
cd fundkeep-app
npm install
```

`npm install` also pulls `@fundkeep/sdk` directly from its GitHub repo (see `package.json`) — no separate setup step needed.

## 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

See [Environment Variables](environment-variables.md) for what each one does. To use the app, configure the deployed contract, token SAC, Testnet network, and Soroban RPC values. See [`fundkeep-contract`](https://github.com/Michealshodipo56/fundkeep-contract)'s `scripts/deploy.sh`, which prints the contract values to put in `NEXT_PUBLIC_CONTRACT_ID`.

## 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 4. (Optional) Run the Indexer Locally

The activity feed and cross-device goal sync use [`fundkeep-indexer`](https://github.com/Michealshodipo56/fundkeep-indexer). Without it, recent activity and goal metadata remain browser-local and on-chain history is not restored by the app.

```bash
git clone https://github.com/Michealshodipo56/fundkeep-indexer.git
cd fundkeep-indexer
npm install
cp .env.example .env   # set CONTRACT_ID to the same value as NEXT_PUBLIC_CONTRACT_ID
npm run dev
```

Then set `NEXT_PUBLIC_INDEXER_URL=http://localhost:4000` in `fundkeep-app/.env.local`.

## Building and Deploying the Contract

The contract lives in [`fundkeep-contract`](https://github.com/Michealshodipo56/fundkeep-contract), not this repo:

```bash
git clone https://github.com/Michealshodipo56/fundkeep-contract.git
cd fundkeep-contract
cargo test
stellar keys generate deployer --network testnet --fund
./scripts/deploy.sh deployer
```

The script builds and deploys the contract, then prints its contract ID and Testnet RPC settings. Set a separately verified Testnet token SAC in `NEXT_PUBLIC_USDC_CONTRACT_ID` before funding goals.
