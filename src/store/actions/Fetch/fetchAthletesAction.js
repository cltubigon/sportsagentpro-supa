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
  console.log("collectionName: ", collectionName)
  console.log("field: ", field)
  console.log("value: ", value)
  return async (dispatch, getState) => {
    const reduxSelectedProfileId = getState().athlete.selectedProfile.userId
    console.log("reduxSelectedProfileId: ", reduxSelectedProfileId)
    try {
      // Fetch data from Firestore using query
      const collectionRef = collection(db, collectionName)
      const querySnapshot = await getDocs(
        query(collectionRef, where(field, "==", value))
      )

      if (!querySnapshot.empty) {
        const payload = querySnapshot.docs[0].data()
        if (payload.userId !== reduxSelectedProfileId) {
          dispatch({ type: "SET_SELECTED_PROFILE", payload })
        } else {
          console.log("both are equal.")
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
  docId,
  timestamp
) => {
  return (dispatch) => {
    const collectionRef = db.collection(collectionName)

    if (collectionName === "athlete") {
      if (timestamp) {
        const collectionLogref = db.collection("logs").doc(docId)
        collectionLogref.onSnapshot((doc) => {
          const data = doc.data()
          const areEqual = areObjectsEqual(timestamp, data.athlete_last_updated)
          !areEqual && saveData(data.athlete_last_updated)
        })
      } else if (!timestamp) {
        const collectionLogref = db.collection("logs").doc(docId)
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
          type: "ATHLETE_COLLECTION_UPDATED",
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
