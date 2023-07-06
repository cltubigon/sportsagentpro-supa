import "firebase/compat/auth"
import "firebase/compat/firestore"
import { db } from "../../../config/fbConfig"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"

export const fetchSelectedAthlete = (collectionName, field, value) => {
  return async (dispatch, getState) => {
    const reduxSelectedProfile = getState().athlete.selectedProfile
    try {
      // Fetch data from Firestore using query
      const collectionRef = collection(db, collectionName)
      const querySnapshot = await getDocs(
        query(collectionRef, where(field, "==", value))
      )

      if (!querySnapshot.empty) {
        const payload = querySnapshot.docs[0].data()
        if (reduxSelectedProfile && payload.id !== reduxSelectedProfile.id) {
          dispatch({ type: "SET_SELECTED_PROFILE", payload })
        } else if (!reduxSelectedProfile) {
          dispatch({ type: "SET_SELECTED_PROFILE", payload })
        } else if (reduxSelectedProfile && payload.id === reduxSelectedProfile.id) {
          return
        }
      } else {
        console.log("Document not found.")
      }
    } catch (error) {
      console.log("Error fetching document:", error)
    }
  }
}

export const startListeningToAthleteCollection = (
  collectionName,
  timestamp
) => {
  return (dispatch) => {
    const collectionRef = db.collection(collectionName)

    if (collectionName === "athlete") {
      if (timestamp) {
        const collectionLogref = db.collection("logs").doc('Wks9w5h2ntpYzLihg9dW')
        collectionLogref.onSnapshot((doc) => {
          const data = doc.data()
          const areEqual = areObjectsEqual(timestamp, data.athlete_last_updated)
          !areEqual && saveData(data.athlete_last_updated)
        })
      } else if (!timestamp) {
        const collectionLogref = db.collection("logs").doc('Wks9w5h2ntpYzLihg9dW')
        collectionLogref.onSnapshot((doc) => {
          const data = doc.data()
          saveData(data.athlete_last_updated)
        })
      }
    }

    function saveData(timestamp) {
      collectionRef.onSnapshot((snapshot) => {
        const updatedData = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          updatedData.push(data)
        })
        console.log("updatedData: ", updatedData)
        dispatch({
          type: "SET_ATHLETE_COLLECTION",
          updatedData,
          timestamp,
        })
      })
    }

    function areObjectsEqual(obj1, obj2) {
      const keys1 = Object.keys(obj1)
      const keys2 = Object.keys(obj2)

      if (keys1.length !== keys2.length) {
        return false
      }

      for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
          return false
        }
      }

      return true
    }
  }
}
