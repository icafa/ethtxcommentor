import { all, call, put, takeEvery } from 'redux-saga/effects'
import agent, { MAIN_API_ROOT } from '../agents'

import {
  actions as commentsActions,
  getCommentsSuccess,
  getCommentsFailure,
  addCommentSuccess,
  addCommentFailure,
} from '../actions/comments.actions'

function *getCommentsSaga (action) {
  try {
    const data = yield call(agent.requests.get, MAIN_API_ROOT, `/v1/comments?hash=${action.payload}`)
    yield put(getCommentsSuccess({
      hash:  action.payload,
      data,
    }))
  } catch (error) {
    yield put(getCommentsFailure(error))
  }
}

function *addCommentSaga (action) {
  try {
    const data = yield call(agent.requests.post, MAIN_API_ROOT, '/v1/comments', action.payload)
    yield put(addCommentSuccess(data))
  } catch (error) {
    yield put(addCommentFailure(error))
  }
}

export default function* commentsSagas () {
  yield all([
    takeEvery(commentsActions.COMMENTS.GET, getCommentsSaga),
    takeEvery(commentsActions.COMMENTS.ADD, addCommentSaga),
  ])
}
