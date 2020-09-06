import { actions as usersActions } from '../actions/users.actions'

const initialState = {
  me: null,
  users:null
}

const rootReducer = (state = initialState , action) => {
  switch (action.type) {
    case usersActions.USERS.SUCCESS:
      return {
        ...state,
        users:action.users
      }
    case usersActions.USERS.REGISTER_SUCCESS:
      return {
        ...state,
        me: action.payload,
      }
    case usersActions.USERS.LOGIN_SUCCESS:
      return {
        ...state,
        me: action.payload,
      }
    default:
      return state
  }
}

export default rootReducer;