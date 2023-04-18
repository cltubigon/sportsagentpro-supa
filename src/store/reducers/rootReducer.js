import authReducer from "./authReducer"
import teamReducer from "./teamReducer"
import { combineReducers } from "redux"
// import {reducer as firebase} from "react-redux-firebase"

const rootReducer = combineReducers({
  // firebase,
  auth: authReducer,
  team: teamReducer,
})

export default rootReducer