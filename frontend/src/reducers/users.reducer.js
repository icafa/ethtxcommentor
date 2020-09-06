import { actions as usersActions } from '../actions/users.actions'
import agents from '../agents'

const myInfo = localStorage.getItem("myInfo")
const initialState = {
  me: myInfo? JSON.parse(myInfo) : null,
  users:null
}

const rootReducer = (state = initialState , action) => {
  switch (action.type) {
    case usersActions.USERS.SUCCESS:
      return {
        ...state,
        users:action.users
      }
    case usersActions.USERS.LOGOUT:
      agents.setToken(null)
      localStorage.clear();
      return {
        ...state,
        me: null,
      }
    case usersActions.USERS.REGISTER_SUCCESS:
      localStorage.setItem("myInfo", JSON.stringify(action.payload))
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