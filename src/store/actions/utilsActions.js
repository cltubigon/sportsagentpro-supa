export const SET_LAST_ITEM_REACHED = (payload) => (dispatch) => {
  dispatch({ type: "SET_LAST_ITEM_REACHED", payload })
}
export const SET_CURRENT_PAGE = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload })
  }
}
export const SET_IS_LOADING = (payload) => {
  return (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload })
  }
}
