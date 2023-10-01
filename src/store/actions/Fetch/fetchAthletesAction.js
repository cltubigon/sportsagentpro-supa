// import "firebase/compat/auth"
// import "firebase/compat/firestore"
// import { db } from "../../../config/fbConfig"
// import {
//   collection,
//   getDocs,
//   limit,
//   orderBy,
//   query,
//   startAfter,
//   where,
// } from "firebase/firestore"

// // export const fetchSelectedAthlete = (collectionName, field, value) => {
// //   return async (dispatch, getState) => {
// //     const reduxSelectedProfile = getState().athlete.selectedProfile
// //     try {
// //       // Fetch data from Firestore using query
// //       const collectionRef = collection(db, collectionName)
// //       const querySnapshot = await getDocs(
// //         query(collectionRef, where(field, "==", value))
// //       )

// //       if (!querySnapshot.empty) {
// //         const payload = querySnapshot.docs[0].data()
// //         if (reduxSelectedProfile && payload.id !== reduxSelectedProfile.id) {
// //           dispatch({ type: "SET_SELECTED_PROFILE", payload })
// //         } else if (!reduxSelectedProfile) {
// //           dispatch({ type: "SET_SELECTED_PROFILE", payload })
// //         } else if (
// //           reduxSelectedProfile &&
// //           payload.id === reduxSelectedProfile.id
// //         ) {
// //           return
// //         }
// //       } else {
// //         console.log("Document not found.")
// //       }
// //     } catch (error) {
// //       console.log("Error fetching document:", error)
// //     }
// //   }
// // }

// export const startListeningToAthleteCollection =
//   (timestamp) => async (dispatch, getState) => {
//     const { initialLimit, nextLimit, lastVisible } =
//       getState().utils.pagination.athletes

//     try {
//       let q
//       if (!lastVisible) {
//         console.log("if statement triggered")
//         q = query(
//           collection(db, "athlete"),
//           orderBy("lastName", "asc"),
//           limit(initialLimit)
//         )
//       } else if (lastVisible) {
//         console.log("else if statement triggered")
//         q = query(
//           collection(db, "athlete"),
//           orderBy("lastName", "asc"),
//           limit(nextLimit),
//           startAfter(lastVisible)
//         )
//       }

//       const querySnapshot = await getDocs(q)
//       const updatedData = querySnapshot.docs.map((doc) => doc.data())
//       const setLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]

//       dispatch({ type: "SET_LAST_VISIBLE", payload: setLastVisible })
//       console.log("lastVisible in fetchData bottom: ", lastVisible)
//       dispatch({
//         type: "SET_LAST_ATHLETE_ITEM_REACHED",
//         payload: updatedData.length < nextLimit && updatedData.length > 0,
//       })
//       // dispatch({
//       //   type: "SET_ATHLETE_COLLECTION",
//       //   updatedData,
//       //   timestamp,
//       // })
//     } catch (error) {
//       console.log("Encountered an error:", error)
//     }
//   }

// // export const startListeningToAthleteCollectionssss = (
// //   collectionName,
// //   timestamp
// // ) => {
// //   return (dispatch) => {
// //     const collectionRef = db.collection(collectionName)

// //     if (collectionName === "athlete") {
// //       if (timestamp) {
// //         const collectionLogref = db
// //           .collection("logs")
// //           .doc("Wks9w5h2ntpYzLihg9dW")
// //         collectionLogref.onSnapshot((doc) => {
// //           const data = doc.data()
// //           const areEqual = areObjectsEqual(timestamp, data.athlete_last_updated)
// //           !areEqual && saveData(data.athlete_last_updated)
// //         })
// //       } else if (!timestamp) {
// //         const collectionLogref = db
// //           .collection("logs")
// //           .doc("Wks9w5h2ntpYzLihg9dW")
// //         collectionLogref.onSnapshot((doc) => {
// //           const data = doc.data()
// //           saveData(data.athlete_last_updated)
// //         })
// //       }
// //     }

// //     function saveData(timestamp) {
// //       collectionRef.onSnapshot((snapshot) => {
// //         const updatedData = []
// //         snapshot.forEach((doc) => {
// //           const data = doc.data()
// //           updatedData.push(data)
// //         })
// //         console.log("updatedData: ", updatedData)
// //         dispatch({
// //           type: "SET_ATHLETE_COLLECTION",
// //           updatedData,
// //           timestamp,
// //         })
// //       })
// //     }
// //   }
// // }

// export const listenAndSaveToBuildAthletes = (timestamp) => {
//   return (dispatch, getState) => {
//     const collectionRef = db.collection("athlete")

//     if (timestamp) {
//       const collectionLogref = db.collection("logs").doc("Wks9w5h2ntpYzLihg9dW")
//       collectionLogref.onSnapshot((doc) => {
//         const data = doc.data()
//         const areEqual = areObjectsEqual(timestamp, data.athlete_last_updated)
//         !areEqual && saveData(data.athlete_last_updated)
//       })
//     } else if (!timestamp) {
//       const collectionLogref = db.collection("logs").doc("Wks9w5h2ntpYzLihg9dW")
//       collectionLogref.onSnapshot((doc) => {
//         const data = doc.data()
//         saveData(data.athlete_last_updated)
//       })
//     }

//     function saveData(timestamp) {
//       collectionRef.onSnapshot((snapshot) => {
//         const updatedData = []
//         snapshot.forEach((doc) => {
//           const data = doc.data()
//           updatedData.push(data)
//         })

//         const objWithIsChecked = updatedData.map((athlete) => {
//           return { ...athlete, isChecked: false }
//         })
//         dispatch({
//           type: "SAVE_ATHLETE_TO_STORAGE",
//           objWithIsChecked,
//           timestamp,
//         })
//       })
//     }
//   }
// }

// function areObjectsEqual(obj1, obj2) {
//   const keys1 = Object.keys(obj1)
//   const keys2 = Object.keys(obj2)

//   if (keys1.length !== keys2.length) {
//     return false
//   }

//   for (const key of keys1) {
//     if (obj1[key] !== obj2[key]) {
//       return false
//     }
//   }

//   return true
// }
