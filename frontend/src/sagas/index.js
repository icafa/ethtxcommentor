import { all, spawn } from 'redux-saga/effects'

import usersSagas from './users.sagas'
import commentsSagas from './comments.sagas'
import transactionSagas from './transactions.sagas'

export default function* rootSaga() {
  yield all([
    spawn(usersSagas),
    spawn(commentsSagas),
    spawn(transactionSagas),
  ])
}
