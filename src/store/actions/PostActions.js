import { collection, addDoc } from "firebase/firestore"

export const createPost = (post) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore()
    try {
      await addDoc(collection(firestore, "post"), {
        ...post,
        createdAt: new Date(),
      })
      dispatch({ type: "CREATE_DEAL", post })
    } catch (err) {
      dispatch({ type: "CREATE_DEAL_ERROR", err })
    }
  }
}

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
    const athletes = state.post.recipients
    
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
    const count = payload.filter(athlete => athlete.isChecked === true)
    const countPayload = count.length
    dispatch({ type: 'SET_CHECK_TRUE_OR_FALSE', payload, countPayload })
  }
}

export const addOrRemoveActivities = (activity) => {
  console.log('activity: ', activity)
  return (dispatch, getState) => {
    const state = getState()
    const selectedActivities = state.post.selectedActivities
    
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
    const selectedActivities = state.post.selectedActivities
    console.log('selectedActivities: ', selectedActivities)

    const payload = selectedActivities.map((activity)=> {
      const amount = data[`activityAmount${activity.id}`]
      const date = data[`activityDate${activity.id}`]
      return {...activity, activityAmount: amount, activityDate: date}
    })

    dispatch({ type: 'UPDATE_AMOUNT_AND_DATE_OF_SELECTED_ACTIVITIES', payload})
  }
}

export const searchAthlete = (payload) => {
  return (dispatch)=> {
    dispatch({ type: 'SEARCH_ATHLETE', payload })
  }
}

export const setActivityTabStatus = (payload) => {
  return (dispatch) => {
    dispatch({ type: 'SET_ACTIVITY_TAB_STATUS', payload })
  }
}