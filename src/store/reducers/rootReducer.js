import authReducer from "./authReducer"
import teamReducer from "./teamReducer"
import { combineReducers } from "redux"
import { firestoreReducer } from "redux-firestore"
import { firebaseReducer } from "react-redux-firebase"
import athleteReducer from "./athleteReducer"
import postReducer from "./postReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  athlete: athleteReducer,
  team: teamReducer,
  post: postReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer