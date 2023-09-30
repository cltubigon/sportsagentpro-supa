import {
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore"
import { db } from "../../config/fbConfig"
import supabase from "../../config/supabaseClient"

export const FETCH_POSTS = () => async (dispatch, getState) => {
  console.log("fetching data")
  const { currentPage, itemsPerPage } = getState().utils.pagination.postsOfOwners
  const userID = getState().auth.user.userID
  console.log('userID: ', userID)

  const { data, error } = await supabase // fetch data from supabase
    .from("posts")
    .select("*")
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)
    .order("created_at", { ascending: false })
    .eq('ownerUID', userID)
    .eq('postType', 'opportunity')
  if (data) {
    console.log('data: ', data)
    if (data.length < itemsPerPage) {
      dispatch({ type: 'LAST_ITEM_REACHED_POSTS_OF_OWNER', payload: true })
    }
    dispatch({ type: "SET_ALL_OPPORTUNITY_POSTS", payload: data })
    dispatch({ type: "SET_LOADING_STATUS", payload: false })
    console.log("data: ", data)
  } else if (error) {
    console.log("error: ", error)
  }
}
export const SET_USER_OPPORTUNITY_POSTS = () => async (dispatch, getState) => {
  console.log("fetching data")
  const { currentPage, itemsPerPage } = getState().utils.pagination.postsOfOwners
  const userID = getState().auth.user.userID
  console.log('userID: ', userID)

  const { data, error } = await supabase // fetch data from supabase
    .from("posts")
    .select("*")
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)
    .order("created_at", { ascending: false })
    .eq('ownerUID', userID)
    .eq('postType', 'opportunity')
  if (data) {
    console.log('data: ', data)
    if (data.length < itemsPerPage) {
      dispatch({ type: 'LAST_ITEM_REACHED_POSTS_OF_OWNER', payload: true })
    }
    dispatch({ type: "SET_USER_OPPORTUNITY_POSTS", payload: data })
    dispatch({ type: "SET_LOADING_STATUS", payload: false })
    console.log("data: ", data)
  } else if (error) {
    console.log("error: ", error)
  }
}

export const withdrawToPost = (postId, email) => async (dispatch, getState) => {
  const myOpportunitiesPosts = getState().post.myOpportunitiesPosts
  const updatedOpportunitiesPosts = (updatedPost) => {
    const data = myOpportunitiesPosts.map((opp) => {
      if (opp.id === updatedPost.id) {
        return updatedPost
      }
      return opp
    })
    console.log("data: ", data)
    dispatch({ type: "UPDATED_ALL_OPPORTUNITY_POSTS", payload: data })
  }
  try {
    const ref = doc(db, "posts", postId)
    const postSnapshot = await getDoc(ref)
    const postDoc = postSnapshot.data()
    const currentApplicants = postDoc.postApplicants
    const applicants = currentApplicants.filter(
      (applicantEmail) => applicantEmail !== email
    )
    const updatedPost = { ...postDoc, postApplicants: applicants }
    updatedOpportunitiesPosts(updatedPost)
    await updateDoc(ref, updatedPost)
    console.log("withdrawed successfully")
  } catch (error) {
    console.error("Error withrawing post:", error)
  }
}

export const APPLY_TO_POST = (postId, email) => async (dispatch, getState) => {
  const myOpportunitiesPosts = getState().post.myOpportunitiesPosts
  const updatedOpportunitiesPosts = (updatedPost) => {
    const data = myOpportunitiesPosts.map((opp) => {
      if (opp.id === updatedPost.id) {
        return updatedPost
      }
      return opp
    })
    console.log("data: ", data)
    dispatch({ type: "UPDATED_ALL_OPPORTUNITY_POSTS", payload: data })
  }
  try {
    const ref = doc(db, "posts", postId)
    const postSnapshot = await getDoc(ref)
    const postDoc = postSnapshot.data()
    const updatedPost = {
      ...postDoc,
      postApplicants: [...postDoc.postApplicants, email],
    }
    updatedOpportunitiesPosts(updatedPost)
    await updateDoc(ref, updatedPost)
    console.log("applied successfully")
  } catch (error) {
    console.error("Error withrawing post:", error)
  }
}

export const SET_IS_LOADING = (payload) => (dispatch) => {
  dispatch({ type: "SET_IS_LOADING", payload })
}

// export const savePostsToStorage = (payload) => {
//   console.log("SAVE_POSTS_TO_STORAGE", payload)
//   return (dispatch) => {
//     dispatch({ type: "SAVE_POSTS_TO_STORAGE", payload })
//   }
// }
// export const resetPostState = (payload) => {
//   console.log("RESET_POST_STATE", payload)
//   return (dispatch) => {
//     dispatch({ type: "RESET_POST_STATE", payload })
//   }
// }
