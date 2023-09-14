import authReducer from "./authReducer"
import teamReducer from "./teamReducer"
import { combineReducers } from "redux"
import { firestoreReducer } from "redux-firestore"
import { firebaseReducer } from "react-redux-firebase"
import athleteReducer from "./athleteReducer"
import buildReducer from "./buildReducer"
import brandReducer from "./brandReducer"
import postReducer from "./postReducer"
import utilsReducer from "./utilsReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  athlete: athleteReducer,
  post: postReducer,
  brand: brandReducer,
  utils: utilsReducer,
  team: teamReducer,
  build: buildReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer