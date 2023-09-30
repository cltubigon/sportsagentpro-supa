import { updateDoc, doc, getDoc } from "firebase/firestore"
import { db } from "../../config/fbConfig"
import supabase from "../../config/supabaseClient"

export const FETCH_POSTS = () => async (dispatch, getState) => {
  const { currentPage, itemsPerPage } = getState().utils.pagination.allPosts

  const { data, error } = await supabase // fetch data from supabase
    .from("posts")
    .select("*")
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)
    .order("created_at", { ascending: false })
    .eq("postType", "opportunity")
  if (data) {
    if (data.length < itemsPerPage) {
      dispatch({ type: "LAST_ITEM_REACHED_OF_ALL_POSTS", payload: true })
    }
    dispatch({ type: "SET_ALL_OPPORTUNITY_POSTS", payload: data })
    console.log("data: ", data)
  } else if (error) {
    console.log("error: ", error)
  }
}
export const SET_USER_OPPORTUNITY_POSTS = () => async (dispatch, getState) => {
  const { currentPage, itemsPerPage } =
    getState().utils.pagination.postsOfOwners
  const userID = getState().auth.user.userID

  const { data, error } = await supabase // fetch data from supabase
    .from("posts")
    .select("*")
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)
    .order("created_at", { ascending: false })
    .eq("ownerUID", userID)
    .eq("postType", "opportunity")
  if (data) {
    if (data.length < itemsPerPage) {
      dispatch({ type: "LAST_ITEM_REACHED_POSTS_OF_OWNER", payload: true })
    }
    dispatch({ type: "SET_USER_OPPORTUNITY_POSTS", payload: data })
    dispatch({ type: "SET_LOADING_STATUS", payload: false })
  } else if (error) {
    console.log("error: ", error)
  }
}

export const withdrawToPost = (postId, email) => async (dispatch, getState) => {
  const allPosts = getState().post.allPosts
  const updatedOpportunitiesPosts = (updatedPost) => {
    const data = allPosts.map((opp) => {
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

export const APPLY_TO_POST = (thisPost) => async (dispatch, getState) => {
  const allPosts = getState().post.allPosts
  const userID = getState().auth.user.userID

  // const updatedSelectedPost = {
  //   ...thisPost,
  //   postApplicants: [...thisPost.postApplicants, userID],
  // }
  const index = allPosts.findIndex((post) => post.id === thisPost.id)
  

  // Update supabase posts - This will run second
  const updateSupaDatabase = async (newValue) => {
    const { data, error } = await supabase
      .from("posts")
      .update({ postApplicants: newValue })
      .eq("id", thisPost.id)
      .select()
      if (data[0]) {
        console.log('data updated: ', data[0])
        if (index !== -1) {
          allPosts[index] = data[0]
        }
        dispatch({ type: "UPDATED_ALL_OPPORTUNITY_POSTS", payload: allPosts })
        dispatch({ type: "SET_IS_LOADING_ALL_POSTS", payload: false })
      } else if (error) {
        console.log('error: ', error)
      }
  }

  // Get current applicants - This will run first
  const getCurrentApplicants = async () => {
    let { data: posts, error } = await supabase
      .from("posts")
      .select("postApplicants")
      .eq("id", thisPost.id)
    if (posts[0]) {
      const currApplicants = posts[0].postApplicants
      const newValue = [...currApplicants, userID]
      updateSupaDatabase(newValue)
    } else if (error) {
      console.log("error: ", error)
    }
  }
  getCurrentApplicants()

}

export const SET_IS_LOADING_ALL_POSTS = (payload) => (dispatch) => {
  dispatch({ type: "SET_IS_LOADING_ALL_POSTS", payload })
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
