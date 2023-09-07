import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const fbConfig = {
  apiKey: "AIzaSyCUrJuu-jCcGdDzyGAAXUuAAImiSniZfIY",
  authDomain: "sportsagentprov2.firebaseapp.com",
  projectId: "sportsagentprov2",
  storageBucket: "sportsagentprov2.appspot.com",
  messagingSenderId: "1017413625568",
  appId: "1:1017413625568:web:b97a78a0fd2dc724d8d285",
  measurementId: "G-1S2KFJSJC6"
}

export const app = firebase.initializeApp(fbConfig)

export const db = firebase.firestore();

export const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableClaims: true,
  attachAuthIsReady: true,
  firebaseStateName: "firebase",
}

// ProjectName: Sports Agent Pro
// const fbConfig = {
//   apiKey: "AIzaSyAe38bPj3MIjtMZvquIqZRBVe-Ydy-f3Qw",
//   authDomain: "sports-agent-pro-5952a.firebaseapp.com",
//   projectId: "sports-agent-pro-5952a",
//   storageBucket: "sports-agent-pro-5952a.appspot.com",
//   messagingSenderId: "132722525781",
//   appId: "1:132722525781:web:97bf0389c4c028a28c76dc",
// }

// ProjectName: SPAv01
// const fbConfig = {
  //   apiKey: "AIzaSyDWUOu8LHIgQpw9Vy6e6Cl_qmWltHeh3AA",
  //   authDomain: "spav01-a7366.firebaseapp.com",
  //   databaseURL: "https://spav01-a7366-default-rtdb.firebaseio.com",
  //   projectId: "spav01-a7366",
  //   storageBucket: "spav01-a7366.appspot.com",
  //   messagingSenderId: "81342887466",
  //   appId: "1:81342887466:web:18cb3e3a376164b07db553"
  // }
  
// ProjectName: SportsAgentPro3