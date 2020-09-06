import { all, call, put, takeEvery } from 'redux-saga/effects'
import agent, { MAIN_API_ROOT } from '../agents'
import { history } from '../store'

import {
  actions as usersActions,
  registerUserSuccess,
  registerUserFailure,
  loginUserSuccess,
  loginUserFailure,
  getUsersSuccess,
  getUsersFailure,
} from '../actions/users.actions'

function *getUsersSaga () {
  try {
    const data = yield call(agent.requests.get, MAIN_API_ROOT, '/users')
    yield put(getUsersSuccess(data))
  } catch (error) {
    yield put(getUsersFailure(error))
  }
}

function *registerUserSaga (action) {
  try {
    const data = yield call(agent.requests.post, MAIN_API_ROOT, '/v1/auth/register', action.payload)
    agent.setToken(data.token.accessToken)
    yield put(registerUserSuccess(data))
    yield call(forwardTo, '/')
  } catch (error) {
    console.log('registerUser failure', error)
    alert('registerUser failure')
    yield put(registerUserFailure(error))
  }
}

function *loginUserSaga (action) {
  try {
    const data = yield call(agent.requests.post, MAIN_API_ROOT, '/v1/auth/login', action.payload)
    agent.setToken(data.token.accessToken)
    yield put(loginUserSuccess(data))
    yield call(forwardTo, '/')
  } catch (error) {
    console.log('loginUser failure', error)
    alert('loginUser failure')
    yield put(loginUserFailure(error))
  }
}

function forwardTo(location) {
  history.push(location);
}

export default function* usersSagas () {
  yield all([
    takeEvery(usersActions.USERS.REGISTER, registerUserSaga),
    takeEvery(usersActions.USERS.LOGIN, loginUserSaga),
    takeEvery(usersActions.USERS.GET, getUsersSaga)
  ])
}
