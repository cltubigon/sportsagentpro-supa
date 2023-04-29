import authReducer from "./authReducer"
import teamReducer from "./teamReducer"
import dealReducer from "./dealReducer"
import { combineReducers } from "redux"
import { firestoreReducer } from "redux-firestore"
import { firebaseReducer } from "react-redux-firebase"

const rootReducer = combineReducers({
  auth: authReducer,
  team: teamReducer,
  deal: dealReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer