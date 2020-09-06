import { all, spawn } from 'redux-saga/effects'

import usersSagas from './users.sagas'
import commentsSagas from './comments.sagas'

export default function* rootSaga() {
  yield all([
    spawn(usersSagas),
    spawn(commentsSagas),
  ])
}
