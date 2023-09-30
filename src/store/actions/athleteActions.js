import supabase from "../../config/supabaseClient"

export const SET_ATHLETES = () => async (dispatch, getState) => {
  const { currentPage, itemsPerPage } = getState().utils.pagination.athletes

  const { data, error } = await supabase // fetch data from supabase
    .from("users")
    .select("*")
    .eq("userType", "athlete")
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)
    .order("created_at", { ascending: false })
  if (data) {
    console.log("data: ", data)
    if (data.length < itemsPerPage) {
      console.log("last Item reached")
      dispatch({ type: "LAST_ITEM_REACHED_ATHLETE", payload: true })
    }
    dispatch({ type: "SET_ATHLETES", payload: data })
    dispatch({ type: "SET_LOADING_STATUS", payload: false })
  } else if (error) {
    console.log("error: ", error)
  }
}