const initialState = {
  authError: null,
  user: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      }
    case "SET_AUTH_ERROR":
      return {
        ...state,
        authError: action.payload,
      }
    case "SET_DEFAULT_ERROR":
      return {
        ...state,
        authError: null,
      }
    case "LOGIN_SUCCESS":
      console.log("login success")
      return {
        ...state,
        authError: null,
      }
    case "SIGNUP_SUCCESS":
      console.log("signup success")
      return {
        ...state,
        authError: null,
      }
    case "LOGOUT_SUCCESS":
      console.log("logout success")
      return initialState
    // case "LOGIN_ERROR":
    //   console.log("login error")
    //   return {
    //     ...state,
    //     authError: action.err.code,
    //   }
    // case "SIGNUP_ERROR":
    //   console.log("action.err: ", action.err)
    //   return {
    //     ...state,
    //     authError: action.err.message,
    //   }
    // case "SET_PROFILE":
    //   return {
    //     ...state,
    //     email: action.email,
    //     isLoggedIn: true,
    //     profile: action.payload,
    //   }
    default:
      return state
  }
}

export default authReducer
