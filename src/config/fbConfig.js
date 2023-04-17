// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAe38bPj3MIjtMZvquIqZRBVe-Ydy-f3Qw",
  authDomain: "sports-agent-pro-5952a.firebaseapp.com",
  projectId: "sports-agent-pro-5952a",
  storageBucket: "sports-agent-pro-5952a.appspot.com",
  messagingSenderId: "132722525781",
  appId: "1:132722525781:web:97bf0389c4c028a28c76dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get Firestore instance
const db = getFirestore(app);

export default firebase