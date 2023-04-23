import authReducer from "./authReducer"
import teamReducer from "./teamReducer"
import athleteReducer from "./athleteReducer"
import { combineReducers } from "redux"
import { firestoreReducer } from "redux-firestore"
import { firebaseReducer } from "react-redux-firebase"

const rootReducer = combineReducers({
  auth: authReducer,
  team: teamReducer,
  athlete: athleteReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer