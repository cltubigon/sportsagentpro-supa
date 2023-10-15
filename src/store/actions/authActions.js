import supabase from "../../config/supabaseClient"

// export const signIn = (credentials) => {
//   return (dispatch, getState, { getFirebase }) => {
//     getFirebase()
//       .auth()
//       .signInWithEmailAndPassword(credentials.email, credentials.password)
//       .then((res) => {
//         dispatch({ type: "LOGIN_SUCCESS" })
//       })
//       .catch((err) => {
//         dispatch({ type: "LOGIN_ERROR", err })
//       })
//   }
// }

export const SUPABASE_SIGNIN =
  ({ email, password }) =>
  async (dispatch) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    const getUserData = async (authData) => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("uid", authData.user.id)

        console.log("data: ", data)
        if (data[0]) {
          console.log("data: ", data)
          const { id, firstName, lastName, phoneNumber, userType } = data[0]
          console.log("id: ", id)
          const userID = id
          const userData = {
            userID,
            firstName,
            lastName,
            phoneNumber,
            userType,
          }
          console.log("userData: ", userData)
          const mergedData = { ...authData.user, ...userData }
          dispatch({ type: "SET_USER", payload: mergedData })
          dispatch({ type: "LOGIN_SUCCESS" })
        } else if (error) {
          console.log("error: ", error)
        }
      } catch (error) {
        console.log("error: ", error)
        dispatch({ type: "SET_AUTH_ERROR", payload: "User not found" })
      }
    }

    if (data.user) {
      console.log("Supabase login successful", data)
      console.log("data.session", data.user)
      getUserData(data)
    } else if (error) {
      dispatch({ type: "SET_AUTH_ERROR", payload: "Invalid email or password" })
    }
  }

export const SUPABASE_SIGNOUT = () => async (dispatch) => {
  let { error } = await supabase.auth.signOut()
  if (error) {
    console.log("error: ", error)
  }
  dispatch({ type: "LOGOUT_SUCCESS" })
}

export const SET_DEFAULT_ERROR = () => {
  return (dispatch) => {
    dispatch({ type: "SET_DEFAULT_ERROR" })
  }
}

export const SUPABASE_SIGNUP =
  ({ firstName, lastName, email, password, userType, phone }) =>
  async (dispatch) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    const addUserToTable = async (authData) => {
      // This will run second
      console.log('reached addUserToTable')
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            email,
            firstName,
            lastName,
            userType,
            phoneNumber: phone,
            uid: authData.user.id,
          },
        ])
        .select()
      if (data[0]) {
        console.log('reached if else if')
        const { id, firstName, lastName, phoneNumber, userType } = data[0]
        const userData = { firstName, lastName, phoneNumber, userType }
        const mergedData = { ...authData.user, ...userData, userID: id }
        console.log({ data, userData, mergedData })
        dispatch({ type: "SET_USER", payload: mergedData })
        dispatch({ type: "SIGNUP_SUCCESS" })
      } else if (error) {
        console.log("error adding it to the table: ", error)
      }
    }

    if (data.user) {
      console.log('yes it is data user')
      addUserToTable(data)
    } else if (error) {
      console.log("error iss: ", error.message)
      dispatch({ type: "SET_AUTH_ERROR", payload: error.message })
    }
  }

// export const signUp = (newUser) => {
//   console.log("newUser: ", newUser)
//   return async (dispatch, getState) => {
//     const auth = getAuth()
//     const firestore = getFirestore()

//     try {
//       console.log("signup action started")
//       // Create the user account and add to the team
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         newUser.email,
//         newUser.password
//       )

//       const addUser = await setDoc(
//         doc(firestore, "users", userCredential.user.uid),
//         {
//           // add to users table
//           firstName: newUser.firstName,
//           lastName: newUser.lastName,
//           phoneNumber: newUser.phone,
//           userType: newUser.userType,
//           id: userCredential.user.uid,
//           initials: `${newUser.firstName[0]} ${newUser.lastName[0]}`,
//         }
//       )
//       const addToCollection = await setDoc(
//         doc(firestore, newUser.userType, userCredential.user.uid),
//         {
//           firstName: newUser.firstName,
//           lastName: newUser.lastName,
//           phoneNumber: newUser.phone,
//           userType: newUser.userType,
//           id: userCredential.user.uid,
//           initials: `${newUser.firstName[0]} ${newUser.lastName[0]}`,
//         }
//       )
//       // Update an existing document
//       let name
//       let logId
//       if (newUser.userType === "athlete") {
//         logId = "Wks9w5h2ntpYzLihg9dW"
//         name = "athlete"
//       } else if (newUser.userType === "brand") {
//         logId = "yBE823UrrwlLQei7Uyry"
//         name = "brand"
//       } else {
//         console.log(newUser.userType)
//       }
//       console.log("add new Collection")
//       const timestamp = Timestamp.fromDate(new Date())
//       const data = { [`${name}_last_updated`]: timestamp }
//       console.log("data: ", data)
//       await updateDoc(doc(firestore, "logs", logId), data)

//       dispatch({ type: "SIGNUP_SUCCESS" })
//     } catch (err) {
//       dispatch({ type: "SIGNUP_ERROR", err })
//       console.error("Error during user signup:", err)
//     }
//   }
// }
// export const setProfile = (data) => {
//   return (dispatch, getState) => {
//     const reduxFirebaseState = getState().firebase
//     console.log("reduxFirebaseState: ", reduxFirebaseState)
//     if (reduxFirebaseState.profile) {
//       console.log("reduxFirebaseState: ", reduxFirebaseState)
//       const email = reduxFirebaseState.auth.email
//       const { token, isEmpty, isLoaded, ...payload } =
//         reduxFirebaseState.profile
//       dispatch({ type: "SET_PROFILE", payload, email })
//     }
//   }
// }
