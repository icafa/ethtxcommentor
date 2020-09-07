import { all, call, put, takeEvery } from 'redux-saga/effects'

import {
  actions as transactionActions,
  getTransactionsSuccess,
  getTransactionsFailure,
} from '../actions/transactions.actions'
import { getInjectedProvider } from '../utils/web3-utils'
import Web3 from 'web3'

function *getTransactionsSaga (action) {
  const { prevStartBlockNumber, prevLastBlockNumber, lastBlockNumber, startBlockNumber, transactions } = action.payload
  try {
      const web3 = new Web3(
        getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
      )
      const fetchSingleBlock = async (id) => {
        let block = await web3.eth.getBlock(id, true)
        const { transactions } = block
        // Filter only ethereum transfers
        const fetchedTransactions = transactions.filter(
            transaction => transaction.value > 0 && transaction.to !== null
        )
        return fetchedTransactions
      }
      let newTransactions = []
      if (!prevStartBlockNumber || !prevLastBlockNumber) {
        for (let id = lastBlockNumber; id >= startBlockNumber; id --) {
          const fetchedTransactions = yield fetchSingleBlock(id)
          newTransactions = newTransactions.concat(...fetchedTransactions)
        }
      } else {
        newTransactions = [...transactions]
        if (startBlockNumber < prevStartBlockNumber) {
          for (let id = prevStartBlockNumber - 1; id >= startBlockNumber; id --) {
            const fetchedTransactions = yield fetchSingleBlock(id)
            newTransactions = newTransactions.concat(...fetchedTransactions)
          }
        }
        if (lastBlockNumber > prevLastBlockNumber) {
          for (let id = prevLastBlockNumber + 1; id <= lastBlockNumber; id ++) {
            const fetchedTransactions = yield fetchSingleBlock(id)
            newTransactions = fetchedTransactions.concat(...newTransactions)
          }
        }
      }
      yield put(getTransactionsSuccess(newTransactions))
  } catch (error) {
    yield put(getTransactionsFailure(error))
  }
}

export default function* transactionSagas () {
  yield all([
    takeEvery(transactionActions.TRANSACTIONS.GET, getTransactionsSaga),
  ])
}
