# Social transactions
Ethereum block and transaction explorer.

## About the App
Made for the _TrustToken challenge_, it lets you explore ether transactions and blocks on the ethereum blockchain through these features:

- See latest block transactions
- See more recent transactions by transaction hash
- Add comments on transaction

## Technical aspects

### What it's made of
The app was kept slim; it's made with:
- React
- Aragon UI
- React-router
- react-testing-library
- react-spring (animations!)
- web3
- styled-components

The eslint and prettier configs were taken from the aragon client repo to match how Aragon members write code.

### How to run the app
Before you run `yarn start` or try to deploy the app, for making web3 able to connect to infura (if you don't have metamask) you must provide an .env file with the following environment variable:
- `REACT_APP_INFURA_WS_ENDPOINT`: Infura's websocket endpoint with your project id appended.


