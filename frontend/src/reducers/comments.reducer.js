import { actions as commentsActions } from '../actions/comments.actions'

const initialState = {
  commentsByHash: {}
}

const rootReducer = (state = initialState , action) => {
  switch (action.type) {
    case commentsActions.COMMENTS.SUCCESS:
      return {
        ...state,
        commentsByHash: {
            ...state.commentsByHash,
            ...action.payload
        }
      }
    case commentsActions.COMMENTS.ADD:
      return {
        ...state,
        commentsByHash: {
            ...state.commentsByHash,
            [action.payload.hash]: [action.payload].concat(...(state.commentsByHash[action.payload.hash] || []))
        }
      }
    default:
      return state
  }
}

export default rootReducer;