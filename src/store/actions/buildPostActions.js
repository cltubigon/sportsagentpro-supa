import supabase from "../../config/supabaseClient"

export const BUILD_POST = () => async (dispatch, getState) => {
  const build = getState().build
  const { email, firstName, lastName, userID } = getState().auth.user

  console.log("build: ", build)
  const newBuild = {
    ...build,
    ownerUID: userID,
    postOwner: email,
    postOwnerFirstName: firstName,
    postOwnerLastName: lastName,
  }
  console.log("newBuild: ", newBuild)

  const {
    isError,
    isSubmitting,
    activeStep,
    submissionType,
    recipients,
    isProcessedSuccesfully,
    editMode,
    ...filteredBuild
  } = newBuild

  console.log("filteredBuild: ", filteredBuild)

  const { data, error } = await supabase
    .from("posts")
    .insert(filteredBuild)
    .select()
  if (data && data[0]) {
    dispatch({ type: "SET_IS_PROCESSED_SUCCESSFULLY", payload: true })
  } else if (error) {
    dispatch({ type: "SET_ERROR", payload: error.message })
    console.log("error: ", error)
  }
}

export const UPDATE_POST = () => async (dispatch, getState) => {
  const build = getState().build
  const {
    isError,
    isSubmitting,
    activeStep,
    submissionType,
    recipients,
    isProcessedSuccesfully,
    editMode,
    ...filteredBuild
  } = build
  console.log({ filteredBuild })

  const { data, error } = await supabase
    .from("posts")
    .update(filteredBuild)
    .eq("id", build.id)
    .select()
  if (data) {
    dispatch({ type: "UPDATE_POST_SUCCESS", payload: true })
  } else if (error) {
    console.log("error", error)
  }
}

export const SET_ERROR = (payload) => (dispatch) => {
  dispatch({ type: "SET_ERROR", payload })
}

export const SET_IS_SUBMITTING = (payload) => (dispatch) => {
  dispatch({ type: "SET_IS_SUBMITTING", payload })
}

export const GET_SELECTED_POST = (postId) => async (dispatch) => {
  console.log("postId: ", postId)
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
  if (data[0]) {
    console.log("data: ", data[0])
    dispatch({ type: "SET_BUILD_STATE", payload: data[0] })
  } else if (error) {
    console.log("error: ", error)
  }
}

export const SET_SUBMISSION_TYPE = (payload, sender) => {
  return (dispatch) => {
    dispatch({ type: "SET_SUBMISSION_TYPE", payload })
  }
}
export const SET_EDIT_MODE = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_EDIT_MODE", payload })
  }
}
// export const setIsProcessedSuccesfully = (payload) => {
//   return (dispatch) => {
//     dispatch({ type: "SET_IS_SUBMITTED_SUCCESSFULLY", payload })
//   }
// }

// export const setBuildState = (data, sender) => {
//   const { activeStep, ...payload } = data
//   return (dispatch) => {
//     dispatch({ type: "SET_BUILD_STATE", payload })
//   }
// }
export const SET_TOTAL_PAYMENT = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_TOTAL_PAYMENT", payload })
  }
}
export const SET_TOTAL_AMOUNT = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_TOTAL_AMOUNT", payload })
  }
}
export const SET_FIRSTNAME_AND_LASTNAME = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_FIRSTNAME_AND_LASTNAME", payload })
  }
}
export const SET_SELECTED_RECIPIENTS = (id) => {
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
export const DELETE_POST = () => async (dispatch, getState) => {
  const id = getState().build.id

  const { error } = await supabase.from("posts").delete().eq("id", id)
  if (error) {
    console.log("error", error)
    return
  }
  dispatch({ type: "DELETE_POST_SUCCESS", payload: true })
}

// export const deletePost = (post, sender) => {
//   return async (dispatch, getState, { getFirebase, getFirestore }) => {
//     const firestore = getFirestore()
//     const email = getState().firebase.auth.email

//     try {
//       if (post.postOwner === email) {
//         await deleteDoc(doc(firestore, "posts", post.id))
//         sender !== "BrandOpportunities" &&
//         dispatch({ type: "DELETE_POST_STATUS", payload: true })
//         dispatch(fetchOpportunityPostsOfOwner(post.postOwner))
//       } else {
//         throw new Error("User not found")
//       }
//     } catch (error) {
//       console.error("Error removing document: ", error)
//       dispatch({ type: "DELETE_POST_STATUS", payload: false })
//     }
//   }
// }

// export const createPost = () => {
//   return async (dispatch, getState, { getFirebase, getFirestore }) => {
//     const build = getState().build
//     const firestore = getFirestore()
//     const uid = getState().firebase.auth.uid
//     const {
//       submissionType,
//       recipients,
//       isProcessedSuccesfully,
//       editMode,
//       ...newObject
//     } = build
//     const sanitizedObject = JSON.parse(JSON.stringify(newObject))

//     try {
//       await addDoc(collection(firestore, "posts"), {
//         ...sanitizedObject,
//         ownerUID: uid,
//         created_at: new Date(),
//       })
//       dispatch({ type: "CREATE_POST_STATUS", sanitizedObject })
//     } catch (err) {
//       console.log("err: ", err)
//       dispatch({ type: "CREATE_POST_STATUS", err })
//     }
//   }
// }

// export const updatePost = (uid) => {
//   return async (dispatch, getState, { getFirebase, getFirestore }) => {
//     const firestore = getFirestore()
//     const updatedData = getState().build
//     const postId = updatedData.id
//     // const { auth } = getState().firebase;
//     // const uid = auth.uid;
//     const sanitizedData = JSON.parse(JSON.stringify(updatedData))

//     try {
//       // Fetch the post document
//       const postRef = doc(firestore, "posts", postId)
//       const postSnapshot = await getDoc(postRef)
//       if (!postSnapshot.exists()) {
//         throw new Error("Post not found")
//       }

//       // Verify the owner
//       const postData = postSnapshot.data()
//       if (postData.ownerUID !== uid) {
//         throw new Error("Unauthorized update")
//       }

//       // Update an existing document
//       const timestamp = Timestamp.fromDate(new Date())

//       const data = { posts_last_updated: timestamp }
//       await updateDoc(doc(firestore, "logs", "C0smjlIYwHzvfRMqPIZs"), data)

//       // Update the post document
//       await updateDoc(postRef, sanitizedData)
//       dispatch({ type: "UPDATE_POST_SUCCESS", payload: true })
//     } catch (error) {
//       console.error("Error updating post:", error)
//       dispatch({ type: "UPDATE_POST_ERROR", error })
//     }
//   }
// }

export const SAVE_POST_TYPE = (data) => {
  return (dispatch) => {
    dispatch({ type: "SAVE_POST_TYPE", data })
  }
}

export const SET_ACTIVE_STEP = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_ACTIVE_STEP", data })
  }
}

// export const setInitialFilteredAthletes = (data) => {
//   return (dispatch) => {
//     const payload = data.map((athlete) => {
//       return { ...athlete, isChecked: false }
//     })
//     dispatch({ type: "SET_INITIAL_FILTERED_ATHLETES", payload })
//   }
// }

// export const setCheckboxTrueOrFalse = (id) => {
//   return (dispatch, getState) => {
//     const state = getState()
//     const athletes = state.build.recipients

//     const payload = athletes.map((athlete) => {
//       const selectStatus = athlete.isChecked
//       if (athlete.id === id) {
//         return { ...athlete, isChecked: !selectStatus }
//       } else {
//         return athlete
//       }
//     })
//     dispatch({ type: "SET_CHECK_TRUE_OR_FALSE", payload })
//   }
// }

export const ADD_OR_REMOVE_ACTIVITIES = (activity) => {
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

export const UPDATE_SELECTED_ACTIVITIES = (data) => {
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

export const SET_CONTENT = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_CONTENT", payload })
  }
}

export const SET_POST_TITLE = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_POST_TITLE", payload })
  }
}

export const SET_POST_EXPIRATION_DATE = (payload) => {
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

export const SET_ACTIVITY_TAB_STATUS = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_ACTIVITY_TAB_STATUS", payload })
  }
}

export const SET_DETAILS_TAB_STATUS = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_DETAILS_TAB_STATUS", payload })
  }
}

// export const setReviewTabStatus = (payload) => {
//   return (dispatch) => {
//     dispatch({ type: 'SET_REVIEW_TAB_STATUS', payload })
//   }
// }

export const SET_PAYMENT_TAB_STATUS = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_PAYMENT_TAB_STATUS", payload })
  }
}

// export const setPostOwner = (payload) => {
//   return (dispatch) => {
//     dispatch({ type: "SET_POST_OWNER", payload })
//   }
// }

export const RESET_BUILD_STATE = (sender) => {
  console.log("sender: ", sender)
  return (dispatch) => {
    dispatch({ type: "RESET_BUILD_STATE" })
  }
}
export const SET_RECIPIENTS_LIST_LAYOUT = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_RECIPIENTS_LIST_LAYOUT", payload })
  }
}
export const SET_ACTIVITIES_LIST_LAYOUT = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_ACTIVITIES_LIST_LAYOUT", payload })
  }
}
