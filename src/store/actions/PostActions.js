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