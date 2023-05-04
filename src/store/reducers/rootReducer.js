import authReducer from "./authReducer"
import teamReducer from "./teamReducer"
import dealReducer from "./dealReducer"
import { combineReducers } from "redux"
import { firestoreReducer } from "redux-firestore"
import { firebaseReducer } from "react-redux-firebase"
import athleteReducer from "./athleteReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  athlete: athleteReducer,
  team: teamReducer,
  deal: dealReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer