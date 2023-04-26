import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore"

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" })
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err })
      })
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT_SUCCESS" })
      })
  }
}

export const signUp = (newUser, teamId) => {
  return async (dispatch, getState) => {
    const auth = getAuth()
    const firestore = getFirestore()

    try {
      // Create the user account and add to the team
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      )

      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        // add to users table
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]} ${newUser.lastName[0]}`,
      })
      console.log("--user added")

      const memberRef = collection(firestore, "athlete", newUser.team, "members") // TODO: change newUser.team to ID of team
      await addDoc(memberRef, {
        userId: userCredential.user.uid,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]} ${newUser.lastName[0]}`,
      })
      console.log("--user added to team collection")
      dispatch({ type: "SIGNUP_SUCCESS" })
    } catch (err) {
      console.log("not recorded", err)
      console.log("not recorded", err.message)
      if (err.message.includes("Document already exists")) {
        dispatch({ type: "SIGNUP_SUCCESS" })
      } else {
        dispatch({ type: "SIGNUP_ERROR", err })
      }
    }
  }
}