export const actions = {
  USERS: {
    LOGOUT: 'USER_LOGOUT',
    REGISTER: 'USER_REGISTER',
    REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USER_REGISTER_FAILURE',
    LOGIN: 'USER_LOGIN',
    LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USER_LOGIN_FAILURE',
    GET: 'USERS_GET',
    SUCCESS: 'USERS_SUCCESS',
    FAILURE: 'USERS_FAILURE'
  }
}

export const registerUser = (payload) => ({
  type: actions.USERS.REGISTER,
  payload
})

export const registerUserSuccess = payload => ({
  type: actions.USERS.REGISTER_SUCCESS,
  payload
})

export const registerUserFailure = payload => ({
  type: actions.USERS.REGISTER_FAILURE,
  payload
})

export const loginUser = (payload) => ({
  type: actions.USERS.LOGIN,
  payload
})

export const loginUserSuccess = (payload) => ({
  type: actions.USERS.LOGIN_SUCCESS,
  payload
})

export const loginUserFailure = (payload) => ({
  type: actions.USERS.LOGIN_FAILURE,
  payload
})

export const getUsers = () => ({
  type: actions.USERS.GET
})

export const getUsersSuccess = users => ({
  type: actions.USERS.SUCCESS,
  users
})

export const getUsersFailure = error => ({
  type: actions.USERS.FAILURE,
  error
})

export const logoutUser = () => {
  return {
    type: actions.USERS.LOGOUT,
  }
}