import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const fbConfig = {
  apiKey: "AIzaSyAe38bPj3MIjtMZvquIqZRBVe-Ydy-f3Qw",
  authDomain: "sports-agent-pro-5952a.firebaseapp.com",
  projectId: "sports-agent-pro-5952a",
  storageBucket: "sports-agent-pro-5952a.appspot.com",
  messagingSenderId: "132722525781",
  appId: "1:132722525781:web:97bf0389c4c028a28c76dc",
}

const app = firebase.initializeApp(fbConfig)

export const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableClaims: true,
  attachAuthIsReady: true,
  firebaseStateName: "firebase",
}

export default app