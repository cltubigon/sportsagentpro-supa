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
    console.log('data: ', data)
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
    
    dispatch({ type: 'SET_CHECK_TRUE_OR_FALSE', payload })
  }
}

export const selectedActivities = (activity) => {
  console.log('activity: ', activity)
  return (dispatch, getState) => {
    const state = getState()
    const selectedActivities = state.post.selectedActivities
    console.log('selectedActivities: ', selectedActivities)

    if (!selectedActivities.some((data)=> {
      return (
        data.id === activity.id
      )
    })) {
      const filteredActivity = activity
      const payload = [...selectedActivities, filteredActivity]
      dispatch({ type: 'SET_SELECTED_ACTIVITIES', payload})
    } else {
      const filteredActivity = selectedActivities.filter((data) => {
        return (
          data.id !== activity.id
          )
        })
        
      const payload = filteredActivity
      dispatch({ type: 'SET_SELECTED_ACTIVITIES', payload})
    }
  }
}

export const searchAthlete = (payload) => {
  return (dispatch)=> {
    dispatch({ type: 'SEARCH_ATHLETE', payload })
  }
}