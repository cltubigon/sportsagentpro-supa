export const SET_ATHLETE_CURRENT_PAGE = () => async (dispatch, getState) => {
  const { currentPage } = getState().utils.pagination.athletes
  dispatch({ type: "SET_ATHLETE_CURRENT_PAGE", payload: currentPage + 1 })
  dispatch({ type: "SET_LOADING_STATUS", payload: true })
}