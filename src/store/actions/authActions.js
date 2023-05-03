import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  where,
  query,
} from "firebase/firestore"
import { getFirebase } from "react-redux-firebase"

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    console.log('firebase',firebase)
    console.log('getState', getState())
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((res) => {
        dispatch({ type: "LOGIN_SUCCESS" })
        console.log('res',res)
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

export const setAuthError = () => {
  return (dispatch) => {
    dispatch({type: "SET_ERROR_TO_DEFAULT"})
  }
}

export const signUp = (newUser) => {
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
        phoneNumber: newUser.phone,
        userType: newUser.userType,
        initials: `${newUser.firstName[0]} ${newUser.lastName[0]}`,
      })

      const memberRef = collection(firestore, newUser.userType)
      await addDoc(memberRef, {
        userId: userCredential.user.uid,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phoneNumber: newUser.phone,
        initials: `${newUser.firstName[0]} ${newUser.lastName[0]}`,
      })
      dispatch({ type: "SIGNUP_SUCCESS" })
    } catch (err) {
      if (err.message.includes("Document already exists")) {
        dispatch({ type: "SIGNUP_SUCCESS" })
      } else {
        dispatch({ type: "SIGNUP_ERROR", err })
      }
    }
  }
}

export const setCurrentUser = (userId) => ({
  type: 'SET_CURRENT_USER',
  payload: userId,
});

export const fetchCurrentUser = () => async (dispatch) => {
  const firebase = getFirebase()
  await firebase.auth().ready;

  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : null;

  console.log('userId: ', userId)
  console.log('user: ', user)
  dispatch(setCurrentUser(userId));
}