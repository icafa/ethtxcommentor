import { all, call, put, takeEvery } from 'redux-saga/effects'
import agent, { MAIN_API_ROOT } from '../agents'

import {
  actions as commentsActions,
  getCommentsSuccess,
  getCommentsFailure,
} from '../actions/comments.actions'

function *getCommentsSaga () {
  try {
    const data = yield call(agent.requests.get(MAIN_API_ROOT, '/comments'))
    yield put(getCommentsSuccess(data))
  } catch (error) {
    yield put(getCommentsFailure(error))
  }
}

export default function* usersSagas () {
  yield all([
    takeEvery(commentsActions.USERS.GET, getCommentsSaga)
  ])
}
