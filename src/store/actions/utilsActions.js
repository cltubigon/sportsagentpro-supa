export const SET_POPUP = (isOpen) => async (dispatch) => {
  console.log("dispatching postID")
  dispatch({ type: "SET_POPUP", payload: { isOpen } })
}
export const SET_SHOW_DRAWER =
  (postID, pageNumber, postApplicants) => async (dispatch) => {
    console.log("dispatching postID")
    dispatch({
      type: "SET_SHOW_DRAWER",
      payload: { postID, pageNumber, postApplicants },
    })
  }
export const SET_ATHLETE_CURRENT_PAGE = () => async (dispatch, getState) => {
  const { currentPage } = getState().utils.pagination.athletes
  dispatch({ type: "SET_ATHLETE_CURRENT_PAGE", payload: currentPage + 1 })
  dispatch({ type: "SET_LOADING_STATUS", payload: true })
}
export const SET_POSTS_OF_OWNERS_CURRENT_PAGE =
  () => async (dispatch, getState) => {
    const { currentPage } = getState().utils.pagination.postsOfOwners
    dispatch({
      type: "SET_POSTS_OF_OWNERS_CURRENT_PAGE",
      payload: currentPage + 1,
    })
    dispatch({ type: "SET_LOADING_STATUS", payload: true })
  }
export const SET_ALL_POSTS_CURRENT_PAGE = () => async (dispatch, getState) => {
  const { currentPage } = getState().utils.pagination.allPosts
  dispatch({
    type: "SET_ALL_POSTS_CURRENT_PAGE",
    payload: currentPage + 1,
  })
  dispatch({ type: "SET_LOADING_STATUS", payload: true })
}
