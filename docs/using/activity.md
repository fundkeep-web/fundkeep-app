# Reading the Activity Feed

The **Activity** page in FundKeep shows a chronological log of every action taken across your goals: creates, deposits, unlocks, and withdrawals.

## Activity Entry Types

| Type | Description |
|---|---|
| `create` | A new goal was created |
| `deposit` | USDC was deposited to a goal |
| `unlock` | A goal reached its target and was unlocked (recorded at deposit time) |
| `withdraw` | Funds were withdrawn from a goal |

Each entry records:
- The goal name it relates to
- The amount involved (where applicable)
- A timestamp

## Storage

FundKeep reads wallet activity from [`fundkeep-indexer`](https://github.com/Michealshodipo56/fundkeep-indexer), which derives it from the contract's on-chain events (`goal_created`, `deposit`, `unlock`, `withdraw`). This history is consistent across browsers and devices. If the indexer is unreachable, the app can show only the recent activity cached in that browser.

On-chain transaction history is always independently recoverable via a Stellar blockchain explorer using your wallet address.

## Interpreting the Feed

The feed is sorted newest-first. A deposit entry and an unlock entry appearing in close sequence on the same goal means that deposit crossed the target threshold and the unlock was triggered in the same transaction.
