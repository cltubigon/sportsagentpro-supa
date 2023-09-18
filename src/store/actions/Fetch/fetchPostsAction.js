import "firebase/compat/auth"
import "firebase/compat/firestore"
import { db } from "../../../config/fbConfig"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"

let unsubscribe = null // Declare a variable to store the unsubscribe function
export const fetchPostsOfCurrentPage = () => async (dispatch, getState) => {
  const myOpportunitiesPosts = getState().post.myOpportunitiesPosts
  const { currentPage, itemsPerPage, totalItems } = getState().utils.pagination

  try {
    const q = query(
      collection(db, "posts"),
      where("postType", "==", "opportunity"),
      orderBy("createdAt", "desc")
    )

    if (unsubscribe) {
      unsubscribe()
    }

    const totalDocuments = querySnapshot.size
    console.log('totalDocuments: ', totalDocuments)
    console.log('myOpportunitiesPosts.length: ', myOpportunitiesPosts.length)
    if (totalItems === myOpportunitiesPosts.length) {
      dispatch({ type: "SET_LAST_ITEM_REACHED", payload: true })
      return
    }
    console.log("total items are not equal, I will proceed")
    
    // Subscribe to real-time updates for the new query
    unsubscribe = onSnapshot(q, (querySnapshot) => {

      const start = (currentPage - 1) * itemsPerPage
      const end = currentPage * itemsPerPage
      const getNumberOfItems =
        end > totalDocuments
          ? start + (itemsPerPage - (end % totalDocuments))
          : end
      const data = querySnapshot.docs
        .slice(start, getNumberOfItems)
        .map((doc) => doc.data())
      dispatch({ type: "SET_ALL_OPPORTUNITY_POSTS", payload: data })
      console.log("data: ", data)

      dispatch({ type: "SET_TOTAL_ITEMS", payload: totalDocuments })
    })
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

export const fetchUserOpportunityPosts = (authEmail) => (dispatch) => {
  const unsubscribe = db
    .collection("posts")
    .where("postOwner", "==", authEmail)
    .where("postType", "==", "opportunity")
    .onSnapshot(
      (querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() })
        })

        console.log("data: ", data)

        dispatch({ type: "SET_USER_OPPORTUNITIES_POSTS", data })
      },
      (error) => {
        console.error("Error fetching data:", error)
        dispatch({
          type: "SET_USER_OPPORTUNITIES_POSTS_ERROR",
          payload: error.message,
        })
      }
    )

  dispatch({
    type: "SET_USER_OPPORTUNITIES_POSTS_UNSUBSCRIBE",
    payload: unsubscribe,
  })
}

// export const fetchAllOpportunityPosts = () => (dispatch) => {
//   const unsubscribe = db
//     .collection("posts")
//     .where("postType", "==", "opportunity")
//     .onSnapshot(
//       (querySnapshot) => {
//         const data = []
//         querySnapshot.forEach((doc) => {
//           data.push({ id: doc.id, ...doc.data() })
//         })

//         console.log("data: ", data)

//         dispatch({ type: "SET_ALL_OPPORTUNITY_POSTS", data })
//       },
//       (error) => {
//         console.error("Error fetching data:", error)
//         dispatch({
//           type: "SET_ALL_OPPORTUNITY_POSTS_ERROR",
//           payload: error.message,
//         })
//       }
//     )

//   dispatch({
//     type: "SET_ALL_OPPORTUNITY_POSTS_UNSUBSCRIBE",
//     payload: unsubscribe,
//   })
// }

export const fetchOpportunityPostsOfOwner = (compEmail) => {
  return async (dispatch, getState) => {
    const firebaseEmail = getState().auth.email

    if (firebaseEmail === compEmail) {
      try {
        const collectionRef = collection(db, "posts")
        const queryOpportunityPosts = query(
          collectionRef,
          where("postOwner", "==", compEmail),
          where("postType", "==", "opportunity")
        )

        const querySnapshot = await getDocs(queryOpportunityPosts)
        const changes = querySnapshot.docChanges()
        const updatedData = changes.map((change) => ({
          id: change.doc.id,
          ...change.doc.data(),
        }))
        console.log("updatedData: ", updatedData)
        // console.log("updatedData: ", updatedData)
        dispatch({ type: "SET_MY_OPPORTUNITIES_POSTS", updatedData })
      } catch (error) {
        console.log("fetch error: ", error)
      }
    } else {
      console.log("emails are NOT the same")
    }
  }
}

export const startListeningToPostsCollection = (collectionName, timestamp) => {
  console.log("Post fetch started")
  return (dispatch) => {
    const collectionRef = db.collection(collectionName)
    console.log("Post fetch started")
    console.log("collectionName: ", collectionName)
    console.log("timestamp: ", timestamp)

    if (timestamp) {
      console.log("reached If statement")
      const collectionLogref = db.collection("logs").doc("C0smjlIYwHzvfRMqPIZs")
      collectionLogref.onSnapshot((doc) => {
        const data = doc.data()
        const areEqual = areObjectsEqual(timestamp, data.posts_last_updated)
        !areEqual && saveData(data.posts_last_updated)
      })
    } else if (!timestamp) {
      console.log("reached Else statement")
      const collectionLogref = db.collection("logs").doc("C0smjlIYwHzvfRMqPIZs")
      collectionLogref.onSnapshot((doc) => {
        const data = doc.data()
        saveData(data.posts_last_updated)
      })
    }

    function saveData(timestamp) {
      console.log("timestamp: ", timestamp)
      collectionRef.onSnapshot((snapshot) => {
        const updatedData = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          updatedData.push(data)
        })
        console.log("updatedData: ", updatedData)
        dispatch({
          type: "SET_POSTS_COLLECTION",
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

function throttle(func, delay) {
  let isThrottled = false
  let lastArgs = null
  let lastContext = null

  function throttledFunc() {
    if (isThrottled) {
      // Save the latest arguments and context
      lastArgs = arguments
      lastContext = this
      return
    }

    // Invoke the function
    func.apply(this, arguments)

    // Set throttling flag
    isThrottled = true

    // Reset the flag after the specified delay
    setTimeout(() => {
      isThrottled = false

      // If there were pending arguments, invoke the function again
      if (lastArgs) {
        throttledFunc.apply(lastContext, lastArgs)
        lastArgs = null
        lastContext = null
      }
    }, delay)
  }

  return throttledFunc
}
