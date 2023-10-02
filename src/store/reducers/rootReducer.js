import authReducer from "./authReducer"
import teamReducer from "./teamReducer"
import athleteReducer from "./athleteReducer"
import buildReducer from "./buildReducer"
import brandReducer from "./brandReducer"
import postReducer from "./postReducer"
import utilsReducer from "./utilsReducer"
import counterSlice from "../slice/counterSlice"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  auth: authReducer,
  athlete: athleteReducer,
  post: postReducer,
  brand: brandReducer,
  utils: utilsReducer,
  team: teamReducer,
  build: buildReducer,
  counter: counterSlice,
})

export default rootReducer
