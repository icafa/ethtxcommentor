import { all, call, put, takeEvery } from 'redux-saga/effects'
import agent, { MAIN_API_ROOT } from '../agents'

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
    console.log("registerUser start", action.payload)
    const data = yield call(agent.requests.post, MAIN_API_ROOT, '/v1/auth/register', action.payload)
    console.log('registerUser response', data)
    yield put(registerUserSuccess(data))
  } catch (error) {
    console.log('registerUser failure', error)
    yield put(registerUserFailure(error))
  }
}

function *loginUserSaga (action) {
  try {
    console.log("loginUser start", action.payload)
    const data = yield call(agent.requests.post, MAIN_API_ROOT, '/v1/auth/login', action.payload)
    console.log('loginUser response', data)
    yield put(loginUserSuccess(data))
  } catch (error) {
    console.log('loginUser failure', error)
    yield put(loginUserFailure(error))
  }
}

export default function* usersSagas () {
  yield all([
    takeEvery(usersActions.USERS.REGISTER, registerUserSaga),
    takeEvery(usersActions.USERS.LOGIN, loginUserSaga),
    takeEvery(usersActions.USERS.GET, getUsersSaga)
  ])
}
