# Connecting Your Wallet

FundKeep uses the Freighter browser extension for transaction signing. Freighter is the standard Stellar wallet for web applications.

## Install Freighter

Download Freighter from [freighter.app](https://freighter.app) and add it as a browser extension. After installing, create or import a Stellar keypair.

## Switch to Testnet

FundKeep v1 runs on Soroban Testnet. In Freighter, go to **Settings → Network** and select **Testnet**. Transactions signed while on Mainnet will fail against the testnet contract.

Fund your testnet account using [Stellar Friendbot](https://friendbot.stellar.org/?addr=YOUR_ADDRESS) if you need XLM for transaction fees.

To fund a goal, your wallet must also hold the test USDC asset configured by FundKeep. Creating a goal creates its on-chain record; it does not transfer USDC. Funding happens separately from the goal details page.

## Connect in the App

1. Open the FundKeep web app.
2. Click **Connect Wallet** in the top navigation.
3. Freighter will prompt you to approve the connection. Approve it.
4. Your abbreviated wallet address will appear in the nav once connected.

## Disconnect

Click your wallet address in the nav and select **Disconnect**. On-chain goal balances remain associated with your wallet. Locally entered goal titles, descriptions, and preferences are stored in that browser; the indexer restores on-chain goal and activity data when configured.
