import { actions as transactionActions } from '../actions/comments.actions'

const initialState = {
  transactions: [],
}

const rootReducer = (state = initialState , action) => {
  switch (action.type) {
    case transactionActions.COMMENTS.SUCCESS:
      return {
        ...state,
        transactions: action.payload,
      }
    default:
      return state
  }
}

export default rootReducer;