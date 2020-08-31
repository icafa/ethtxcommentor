# Social transactions
Ethereum block and transaction explorer.
-t
## About the App
Made for the _TrustToken hiring challenge_, it lets you explore ether transactions and blocks on the ethereum blockchain through these features:

- See stats about the latest 10 blocks (total difficulty, total gas used, etc)
- Search a block by its number
- Visualize information about a block
- Visualize the ether transactions on a block (with pagination)
- Visualize information about a particular transaction.

## Technical aspects

### What it's made of
The app was kept slim; it's made with:
- React
- Aragon UI (sadly not the @next version, as it's not properly documented yet)
- React-router
- react-testing-library
- react-spring (animations!)
- web3
- styled-components
- sentry for catching errors

The eslint and prettier configs were taken from the aragon client repo to match how Aragon members write code.

### Folder Structure

```
src/
    assets/
        - any images needed
    Components/
        __tests__ folder
        - presentational components
    Views/
        - Container Components, same as Views in this case
    utils/
        - any minor utilities used
```

### How to run the app
Before you run `yarn start` or try to deploy the app, for making web3 able to connect to infura (if you don't have metamask) you must provide an .env file with the following environment variable:
- `REACT_APP_INFURA_WS_ENDPOINT`: Infura's websocket endpoint with your project id appended.

If you want to be able to catch errors with sentry, provide this env var as well:
- `REACT_APP_SENTRY_DSN`: Your sentry's DSN.

