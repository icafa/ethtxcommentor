import { all, call, put, takeEvery } from 'redux-saga/effects'
import agent, { MAIN_API_ROOT } from '../agents'

import {
  actions as usersActions,
  getUsersSuccess,
  getUsersFailure,
} from '../actions/users.actions'

function *getUsersSaga () {
  try {
    const data = yield call(agent.requests.get(MAIN_API_ROOT, '/users'))
    yield put(getUsersSuccess(data))
  } catch (error) {
    yield put(getUsersFailure(error))
  }
}

export default function* usersSagas () {
  yield all([
    takeEvery(usersActions.USERS.GET, getUsersSaga)
  ])
}
