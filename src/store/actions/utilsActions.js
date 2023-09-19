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
export const SET_IS_FETCHING = (payload) => (dispatch) => {
  dispatch({ type: "SET_IS_FETCHING", payload })
}
export const SET_REACHED_LAST_ITEM = (payload) => (dispatch) => {
  dispatch({ type: "SET_REACHED_LAST_ITEM", payload })
}