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
    console.log('comment response', data)
    yield put(getCommentsSuccess(data))
  } catch (error) {
    yield put(getCommentsFailure(error))
  }
}

export default function* commentsSagas () {
  yield all([
    takeEvery(commentsActions.COMMENTS.GET, getCommentsSaga)
  ])
}
