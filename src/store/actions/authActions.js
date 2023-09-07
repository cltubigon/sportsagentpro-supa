import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore"

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    getFirebase().auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((res) => {
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

export const setAuthError = () => {
  return (dispatch) => {
    dispatch({ type: "SET_ERROR_TO_DEFAULT" })
  }
}

export const signUp = (newUser) => {
  console.log("newUser: ", newUser)
  return async (dispatch, getState) => {
    const auth = getAuth()
    const firestore = getFirestore()

    try {
      console.log("signup action started")
      // Create the user account and add to the team
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      )

      const addUser = await setDoc(
        doc(firestore, "users", userCredential.user.uid),
        {
          // add to users table
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          phoneNumber: newUser.phone,
          userType: newUser.userType,
          id: userCredential.user.uid,
          initials: `${newUser.firstName[0]} ${newUser.lastName[0]}`,
        }
      )
      const addToCollection = await setDoc(
        doc(firestore, newUser.userType, userCredential.user.uid),
        {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          phoneNumber: newUser.phone,
          userType: newUser.userType,
          id: userCredential.user.uid,
          initials: `${newUser.firstName[0]} ${newUser.lastName[0]}`,
        }
      )
      // Update an existing document
      let name
      let logId
      if (newUser.userType === "athlete") {
        logId = "Wks9w5h2ntpYzLihg9dW"
        name = "athlete"
      } else if (newUser.userType === "brand") {
        logId = "yBE823UrrwlLQei7Uyry"
        name = "brand"
      } else {
        console.log(newUser.userType)
      }
      console.log("add new Collection")
      const timestamp = Timestamp.fromDate(new Date())
      const data = { [`${name}_last_updated`]: timestamp }
      console.log("data: ", data)
      await updateDoc(doc(firestore, "logs", logId), data)

      dispatch({ type: "SIGNUP_SUCCESS" })
    } catch (err) {
      dispatch({ type: "SIGNUP_ERROR", err })
      console.error("Error during user signup:", err)
    }
  }
}
export const setProfile = (data) => {
  return (dispatch, getState) => {
    const reduxFirebaseState = getState().firebase
    console.log('reduxFirebaseState: ', reduxFirebaseState)
    if (reduxFirebaseState.profile) {
      console.log("reduxFirebaseState: ", reduxFirebaseState)
      const email = reduxFirebaseState.auth.email
      const { token, isEmpty, isLoaded, ...payload } =
        reduxFirebaseState.profile
      dispatch({ type: "SET_PROFILE", payload, email })
    }
  }
}
