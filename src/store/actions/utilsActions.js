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
export const SET_ALL_POSTS_CURRENT_PAGE =
  () => async (dispatch, getState) => {
    const { currentPage } = getState().utils.pagination.allPosts
    dispatch({
      type: "SET_ALL_POSTS_CURRENT_PAGE",
      payload: currentPage + 1,
    })
    dispatch({ type: "SET_LOADING_STATUS", payload: true })
  }
