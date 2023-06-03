import { collection, addDoc } from "firebase/firestore"

export const setTotalPayment = (payload) => {
  console.log('SET_TOTAL_PAYMENT ', payload)
  return (dispatch) => {
    dispatch({type: "SET_TOTAL_PAYMENT", payload})
  }
}
export const setFirstNameAndLastName = (payload) => {
  console.log('SET_FIRSTNAME_AND_LASTNAME ', payload)
  return (dispatch) => {
    dispatch({type: "SET_FIRSTNAME_AND_LASTNAME", payload})
  }
}
export const setSelectedRecipients = (payload) => {
  console.log('SET_SELECTED_RECIPIENTS ', payload)
  return (dispatch) => {
    dispatch({type: "SET_SELECTED_RECIPIENTS", payload})
  }
}

export const createPost = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const build = getState().build;
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const { recipients, isSubmittedSuccessfully, ...newObject } = build;
    const sanitizedObject = JSON.parse(JSON.stringify(newObject));

    try {
      await addDoc(collection(firestore, "posts"), {
        ...sanitizedObject,
        ownerUID: uid,
        createdAt: new Date(),
      });
      dispatch({ type: "CREATE_POST", sanitizedObject });
    } catch (err) {
      console.log('err: ', err);
      dispatch({ type: "CREATE_POST_ERROR", err });
    }
  };
};


// export const createPost = () => {
//   return async (dispatch, getState, { getFirebase, getFirestore }) => {
//     const build = getState().build
//     const firestore = getFirestore()
//     const uid = getState().firebase.auth.uid
//     console.log('uid: ', uid)
//     console.log('build: ', build)
//     const { recipients, isSubmittedSuccessfully, ...newObject } = build
//     console.log('newObject: ', newObject)

//     try {
//       await addDoc(collection(firestore, "posts"), {
//         ...newObject,
//         // // ownerID: uid && uid,
//         createdAt: new Date(),
//       })
//       dispatch({ type: "CREATE_POST", newObject })
//     } catch (err) {
//       console.log('err: ', err)
//       dispatch({ type: "CREATE_POST_ERROR", err })
//     }
//   }
// }

export const savePostType = (data) => {
  return (dispatch) => {
    dispatch({type: "SAVE_POST_TYPE", data})
    console.log('data reached post action: ', data)
  }
}

export const setActiveStep = (data) => {
  return (dispatch) => {
    dispatch({type: "SET_ACTIVE_STEP", data})
    console.log('setactivestep reached post action')
  }
}

export const setInitialFilteredAthletes = (data) => {
  return (dispatch) => {
    // console.log('data: ', data)
    const payload = data.map((athlete)=> {
      return (
        {...athlete, isChecked: false}
      )
    })
    dispatch({ type:'SET_INITIAL_FILTERED_ATHLETES', payload})
  }
}

export const setCheckboxTrueOrFalse = (id) => {
  return (dispatch, getState) => {
    const state = getState()
    const athletes = state.build.recipients
    
    const payload = athletes.map((athlete) => {
      const selectStatus = athlete.isChecked
      if (athlete.id === id) {
        return (
          {...athlete, isChecked: !selectStatus}
        )
      } else {
        return athlete
      }
    })
    // const count = payload.filter(athlete => athlete.isChecked === true)
    // const countPayload = count.length
    dispatch({ type: 'SET_CHECK_TRUE_OR_FALSE', payload })
  }
}

export const addOrRemoveActivities = (activity) => {
  console.log('activity: ', activity)
  return (dispatch, getState) => {
    const state = getState()
    const selectedActivities = state.build.selectedActivities
    
    if (!selectedActivities.some(data=> data.id === activity.id)) {  // Add activity
      const filteredActivity = { ...activity, isChecked: true, activityAmount: '', activityDate: '' }
      console.log('filteredActivity yes: ', filteredActivity)
      const payload = [...selectedActivities, filteredActivity]
      dispatch({ type: 'ADD_OR_REMOVE_ACTIVITIES', payload})
    } else {
      const filteredActivity = selectedActivities.filter(data => data.id !== activity.id) // Remove activity
      console.log('filteredActivity else: ', filteredActivity)
      const payload = filteredActivity
      dispatch({ type: 'ADD_OR_REMOVE_ACTIVITIES', payload})
    }
  }
}

export const updateSelectedActivities = (data) => {
  console.log('data: ', data)
  return (dispatch, getState)=> {
    const state = getState()
    const selectedActivities = state.build.selectedActivities
    console.log('selectedActivities: ', selectedActivities)

    const payload = selectedActivities.map((activity)=> {
      const amount = data[`activityAmount${activity.id}`]
      const date = data[`activityDate${activity.id}`]
      console.log('date: ', date)
      console.log('amount: ', amount)
      
      if (date) {
        const utcFormat = new Date(date).toUTCString().replace("GMT", "UTC")
        const localeFormat = new Date(date).toLocaleString()
        const objPayload = {calendarFormat: date || '', utcFormat: utcFormat || '', localeFormat: localeFormat || ''}
        console.log('utcFormat: ', utcFormat)
        console.log('localeFormat: ', localeFormat)
        console.log('objPayload: ', objPayload)
        return {...activity, activityAmount: amount || "", ...{ activityDate: objPayload } }
      } else {
        return {...activity, activityAmount: amount || "", activityDate: '' }
      }

    })

    console.log('payload: ', payload)
    dispatch({ type: 'UPDATE_AMOUNT_AND_DATE_OF_SELECTED_ACTIVITIES', payload})
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
    dispatch({ type: 'SET_CONTENT', payload })
  }
}

export const setPostTitle = (payload) => {
  console.log('SET_POST_TITLE action: ', payload)
  return (dispatch) => {
    dispatch({ type: 'SET_POST_TITLE', payload })
  }
}

export const setPostExpirationDate = (payload) => {
  console.log('SET_POST_EXPIRATION_DATE PH time: ', payload)

  const utcFormat = new Date(payload).toUTCString().replace("GMT", "UTC")
  const localeFormat = new Date(payload).toLocaleString()
  const objPayload = {calendarFormat: payload, utcFormat: utcFormat, localeFormat: localeFormat}

  return (dispatch) => {
    dispatch({ type: 'SET_POST_EXPIRATION_DATE', payload, objPayload })
  }
}

export const setActivityTabStatus = (payload) => {
  return (dispatch) => {
    dispatch({ type: 'SET_ACTIVITY_TAB_STATUS', payload })
  }
}

export const setDetailsTabStatus = (payload) => {
  return (dispatch) => {
    dispatch({ type: 'SET_DETAILS_TAB_STATUS', payload })
  }
}

// export const setReviewTabStatus = (payload) => {
//   return (dispatch) => {
//     dispatch({ type: 'SET_REVIEW_TAB_STATUS', payload })
//   }
// }

export const setPaymentTabStatus = (payload) => {
  return (dispatch) => {
    dispatch({ type: 'SET_PAYMENT_TAB_STATUS', payload })
  }
}

export const setPostOwner = (payload) => {
  return (dispatch) => {
    dispatch({ type: 'SET_POST_OWNER', payload })
  }
}

export const resetPostState = () => {
  return (dispatch) => {
    dispatch({ type: 'RESET_POST_STATE' })
  }
}
export const setRecipientsListLayout = (payload) => {
  return (dispatch) => {
    dispatch({ type: 'SET_RECIPIENTS_LIST_LAYOUT', payload })
  }
}
export const setActivitiesListLayout = (payload) => {
  return (dispatch) => {
    dispatch({ type: 'SET_ACTIVITIES_LIST_LAYOUT', payload })
  }
}