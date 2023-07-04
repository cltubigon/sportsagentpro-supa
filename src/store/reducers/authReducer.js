const initialState = {
  authError: null,
  profile: null,
  email: null,
  isLoggedIn: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
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
            isLoggedIn: true,
            // profile: {...state.profile, ...action.userData},
          }
        case "LOGOUT_SUCCESS":
          console.log("logout success")
          return initialState
        case "SIGNUP_SUCCESS":
          console.log("signup success")
          return {
            ...state,
            isLoggedIn: true,
            authError: null,
          }
        case "SIGNUP_ERROR":
          console.log('action.err: ', action.err)
          return {
            ...state,
            authError: action.err.message
          }
        case "SET_ERROR_TO_DEFAULT":
          return {
            ...state,
            authError: null
          }
        case "SET_PROFILE":
          return {
            ...state,
            email: action.email,
            isLoggedIn: true,
            profile: action.payload,
          }
        default:
          return state
        }
}

export default authReducer