import { actions } from '../actions/transactions.actions'

const initialState = {
  loading: false,
  transactions: [],
}

const rootReducer = (state = initialState , action) => {
  switch (action.type) {
    case actions.TRANSACTIONS.GET:
      return {
        ...state,
        loading: true,
      }
    case actions.TRANSACTIONS.SUCCESS:
      if (state.transactions.length == action.payload.length && !state.loading) {
        return state
      }
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      }
    case actions.TRANSACTIONS.FAILURE:
      return {
        ...state,
        transactions: [],
        loading: false,
      }
    default:
      return state
  }
}

export default rootReducer;