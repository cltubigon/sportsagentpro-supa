const initialState = {
  authError: null,
  incrementThis: 0,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT":
          console.log('increment successful')
          return {
            ...state,
            incrementThis: action.newValue,
        }
        case "LOGIN_ERROR":
          console.log("login error")
          return {
            ...state,
            authError: action.err.code,
          }
        case "LOGIN_SUCCESS":
          console.log("login success")
          return {
            ...state,
            authError: null,
          }
        case "LOGOUT_SUCCESS":
          console.log("logout success")
          return state
        case "SIGNUP_SUCCESS":
          console.log("signup success")
          return {
            ...state,
            authError: null
          }
        case "SIGNUP_ERROR":
          return {
            ...state,
            authError: action.err.message
          }
        case "SET_ERROR_TO_DEFAULT":
          return {
            ...state,
            authError: null
          }
    default:
      return state
  }
}

export default authReducer