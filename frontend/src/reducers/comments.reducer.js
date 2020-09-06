import { actions as commentsActions } from '../actions/comments.actions'

const initialState = {
  commentsByHash: {},
  commentsLoading: {},
}

const rootReducer = (state = initialState , action) => {
  switch (action.type) {
    case commentsActions.COMMENTS.GET:
      return {
        ...state,
        commentsLoading: {
          ...state.commentsLoading,
          [action.payload.hash]: true
        }
      }
    case commentsActions.COMMENTS.SUCCESS:
      return {
        ...state,
        commentsByHash: {
            ...state.commentsByHash,
            [action.payload.hash]: action.payload.data
        },
        commentsLoading: {
          ...state.commentsLoading,
          [action.payload.hash]: false
        }
      }
    case commentsActions.COMMENTS.FAILURE:
      return {
        ...state,
        commentsByHash: {
            ...state.commentsByHash,
            [action.payload.hash]: []
        },
        commentsLoading: {
          ...state.commentsLoading,
          [action.payload.hash]: false
        }
      }
    case commentsActions.COMMENTS.ADD_SUCCESS:
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