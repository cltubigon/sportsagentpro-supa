import supabase from "../../config/supabaseClient"

export const SET_ATHLETES = () => async (dispatch, getState) => {
    console.log("fetching data")
    const { currentPage, itemsPerPage } = getState().utils.pagination.athletes
    const startAt = (currentPage - 1) * itemsPerPage
    const endtAt = currentPage * itemsPerPage - 1
    console.log("currentPage: ", currentPage)
    console.log("startAt: ", startAt)
    console.log("endtAt: ", endtAt)
  
    const { data, error } = await supabase // fetch data from supabase
      .from("users")
      .select("*")
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)
      .order("created_at", { ascending: false })
    if (data) {
      dispatch({ type: "SET_ATHLETES", payload: data })
      dispatch({ type: "SET_LOADING_STATUS", payload: false })
      console.log("data: ", data)
    } else if (error) {
      console.log("error: ", error)
    }
  }
