import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import usersReducer from './users.reducer'
import commentsReducer from './comments.reducer'
import transactionsReducer from './transactions.reducer'


export default history =>
  combineReducers({
    router: connectRouter(history),
    usersReducer,
    commentsReducer,
    transactionsReducer,
  })
