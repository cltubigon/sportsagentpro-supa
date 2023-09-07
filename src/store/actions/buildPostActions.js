import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore"
import { fetchOpportunityPostsOfOwner } from "./Fetch/fetchPostsAction"
import { db } from "../../config/fbConfig"

export const getSelectedPost = (postId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore()
    try {
      const postRef = doc(firestore, "posts", postId)
      const postSnapshot = await getDoc(postRef)
      if (!postSnapshot.exists()) {
        throw new Error("Post not found")
      }
      const data = postSnapshot.data()
      const payload = {...data, selectedRecipients: []}
      dispatch({ type: "SET_BUILD_STATE", payload })
    } catch (error) {
      console.log("Document does not exist!", error)
    }
  }
}

export const setSubmissionType = (payload, sender) => {
  return (dispatch) => {
    dispatch({ type: "SET_SUBMISSION_TYPE", payload })
  }
}
export const setEditMode = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_EDIT_MODE", payload })
  }
}
export const setIsSubmittedSuccessfully = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_IS_SUBMITTED_SUCCESSFULLY", payload })
  }
}

export const setBuildState = (data, sender) => {
  const { activeStep, ...payload } = data
  return (dispatch) => {
    dispatch({ type: "SET_BUILD_STATE", payload })
  }
}
export const setTotalPayment = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_TOTAL_PAYMENT", payload })
  }
}
export const setTotalAmount = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_TOTAL_AMOUNT", payload })
  }
}
export const setFirstNameAndLastName = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_FIRSTNAME_AND_LASTNAME", payload })
  }
}
export const setSelectedRecipients = (id) => {
  return (dispatch, getState) => {
    const selectedRecipients = getState().build.selectedRecipients
    const isPresent = selectedRecipients.includes(id)
    if (isPresent) {
      const getSelections = selectedRecipients.filter((data) => data !== id)
      if (getSelections) {
        const payload = getSelections
        dispatch({ type: "SET_SELECTED_RECIPIENTS", payload })
      } else if (!getSelections) {
        const payload = []
        dispatch({ type: "SET_SELECTED_RECIPIENTS", payload })
      }
    } else {
      const payload = [...selectedRecipients, id]
      dispatch({ type: "SET_SELECTED_RECIPIENTS", payload })
    }
  }
}

export const deletePost = (post, sender) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore()
    const email = getState().firebase.auth.email

    try {
      if (post.postOwner === email) {
        await deleteDoc(doc(firestore, "posts", post.id))
        sender !== "BrandOpportunities" &&
          dispatch({ type: "DELETE_POST", post })
        dispatch(fetchOpportunityPostsOfOwner(post.postOwner))
      } else {
        throw new Error("User not found")
      }
    } catch (error) {
      console.error("Error removing document: ", error)
      dispatch({ type: "DELETE_POST_ERROR", error })
    }
  }
}

export const createPost = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const build = getState().build
    const firestore = getFirestore()
    const uid = getState().firebase.auth.uid
    const {
      submissionType,
      recipients,
      isSubmittedSuccessfully,
      editMode,
      ...newObject
    } = build
    const sanitizedObject = JSON.parse(JSON.stringify(newObject))

    try {
      await addDoc(collection(firestore, "posts"), {
        ...sanitizedObject,
        ownerUID: uid,
        createdAt: new Date(),
      })
      dispatch({ type: "CREATE_POST", sanitizedObject })
    } catch (err) {
      console.log("err: ", err)
      dispatch({ type: "CREATE_POST_ERROR", err })
    }
  }
}

export const updatePost = (uid) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore()
    const updatedData = getState().build
    const postId = updatedData.id
    // const { auth } = getState().firebase;
    // const uid = auth.uid;
    const sanitizedData = JSON.parse(JSON.stringify(updatedData))

    try {
      // Fetch the post document
      const postRef = doc(firestore, "posts", postId)
      const postSnapshot = await getDoc(postRef)
      if (!postSnapshot.exists()) {
        throw new Error("Post not found")
      }

      // Verify the owner
      const postData = postSnapshot.data()
      if (postData.ownerUID !== uid) {
        throw new Error("Unauthorized update")
      }

      // Update an existing document
      const timestamp = Timestamp.fromDate(new Date())

      const data = { posts_last_updated: timestamp }
      await updateDoc(doc(firestore, "logs", "C0smjlIYwHzvfRMqPIZs"), data)

      // Update the post document
      await updateDoc(postRef, sanitizedData)
      dispatch({ type: "UPDATE_POST_SUCCESS" })
    } catch (error) {
      console.error("Error updating post:", error)
      dispatch({ type: "UPDATE_POST_ERROR", error })
    }
  }
}

export const savePostType = (data) => {
  return (dispatch) => {
    dispatch({ type: "SAVE_POST_TYPE", data })
  }
}

export const setActiveStep = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_ACTIVE_STEP", data })
  }
}

export const setInitialFilteredAthletes = (data) => {
  return (dispatch) => {
    const payload = data.map((athlete) => {
      return { ...athlete, isChecked: false }
    })
    dispatch({ type: "SET_INITIAL_FILTERED_ATHLETES", payload })
  }
}

export const setCheckboxTrueOrFalse = (id) => {
  return (dispatch, getState) => {
    const state = getState()
    const athletes = state.build.recipients

    const payload = athletes.map((athlete) => {
      const selectStatus = athlete.isChecked
      if (athlete.id === id) {
        return { ...athlete, isChecked: !selectStatus }
      } else {
        return athlete
      }
    })
    dispatch({ type: "SET_CHECK_TRUE_OR_FALSE", payload })
  }
}

export const addOrRemoveActivities = (activity) => {
  return (dispatch, getState) => {
    const state = getState()
    const selectedActivities = state.build.selectedActivities

    if (!selectedActivities.some((data) => data.id === activity.id)) {
      // Add activity
      const filteredActivity = {
        ...activity,
        isChecked: true,
        activityAmount: "",
        activityDate: "",
      }
      const payload = [...selectedActivities, filteredActivity]
      dispatch({ type: "ADD_OR_REMOVE_ACTIVITIES", payload })
    } else {
      const filteredActivity = selectedActivities.filter(
        (data) => data.id !== activity.id
      ) // Remove activity
      const payload = filteredActivity
      dispatch({ type: "ADD_OR_REMOVE_ACTIVITIES", payload })
    }
  }
}

export const updateSelectedActivities = (data) => {
  return (dispatch, getState) => {
    const state = getState()
    const selectedActivities = state.build.selectedActivities

    const payload = selectedActivities.map((activity) => {
      const amount = data[`activityAmount${activity.id}`]
      const date = data[`activityDate${activity.id}`]

      if (date) {
        const utcFormat = new Date(date).toUTCString().replace("GMT", "UTC")
        const localeFormat = new Date(date).toLocaleString()
        const objPayload = {
          calendarFormat: date || "",
          utcFormat: utcFormat || "",
          localeFormat: localeFormat || "",
        }
        return {
          ...activity,
          activityAmount: amount || "",
          ...{ activityDate: objPayload },
        }
      } else {
        return { ...activity, activityAmount: amount || "", activityDate: "" }
      }
    })

    dispatch({ type: "UPDATE_AMOUNT_AND_DATE_OF_SELECTED_ACTIVITIES", payload })
  }
}
// export const updateSelectedActivities = (data) => {
//   console.log('data: ', data)
//   return (dispatch, getState)=> {
//     const state = getState()
//     const selectedActivities = state.build.selectedActivities
//     console.log('selectedActivities: ', selectedActivities)

//     const payload = selectedActivities.map((activity)=> {
//       const amount = data[`activityAmount${activity.id}`]
//       const date = data[`activityDate${activity.id}`]
//       console.log('date: ', date)
//       console.log('amount: ', amount)

//       const utcFormat = new Date(date).toUTCString().replace("GMT", "UTC")
//       const localeFormat = new Date(date).toLocaleString()
//       const objPayload = {calendarFormat: date || '', utcFormat: utcFormat || '', localeFormat: localeFormat || ''}
//       console.log('utcFormat: ', utcFormat)
//       console.log('localeFormat: ', localeFormat)
//       console.log('objPayload: ', objPayload)

//       return {...activity, activityAmount: amount || "", ...(date !== undefined && { activityDate: objPayload }) }
//     })

//     console.log('payload: ', payload)
//     dispatch({ type: 'UPDATE_AMOUNT_AND_DATE_OF_SELECTED_ACTIVITIES', payload})
//   }
// }

// export const searchAthlete = (payload) => {
//   return (dispatch)=> {
//     dispatch({ type: 'SEARCH_ATHLETE', payload })
//   }
// }

export const setContent = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_CONTENT", payload })
  }
}

export const setPostTitle = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_POST_TITLE", payload })
  }
}

export const setPostExpirationDate = (payload) => {

  const utcFormat = new Date(payload).toUTCString().replace("GMT", "UTC")
  const localeFormat = new Date(payload).toLocaleString()
  const objPayload = {
    calendarFormat: payload,
    utcFormat: utcFormat,
    localeFormat: localeFormat,
  }

  return (dispatch) => {
    dispatch({ type: "SET_POST_EXPIRATION_DATE", payload, objPayload })
  }
}

export const setActivityTabStatus = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_ACTIVITY_TAB_STATUS", payload })
  }
}

export const setDetailsTabStatus = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_DETAILS_TAB_STATUS", payload })
  }
}

// export const setReviewTabStatus = (payload) => {
//   return (dispatch) => {
//     dispatch({ type: 'SET_REVIEW_TAB_STATUS', payload })
//   }
// }

export const setPaymentTabStatus = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_PAYMENT_TAB_STATUS", payload })
  }
}

// export const setPostOwner = (payload) => {
//   return (dispatch) => {
//     dispatch({ type: "SET_POST_OWNER", payload })
//   }
// }

export const resetBuildState = (sender) => {
  return (dispatch) => {
    dispatch({ type: "RESET_BUILD_STATE" })
  }
}
export const setRecipientsListLayout = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_RECIPIENTS_LIST_LAYOUT", payload })
  }
}
export const setActivitiesListLayout = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_ACTIVITIES_LIST_LAYOUT", payload })
  }
}
