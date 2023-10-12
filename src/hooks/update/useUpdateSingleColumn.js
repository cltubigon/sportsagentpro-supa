import { useMutation } from "@tanstack/react-query"
import supabase from "../../config/supabaseClient"

const updateMutateData = async (
  { updateColumn, from, eqColumn, eqValue },
  option
) => {
  console.log({ option })
  const { data, error } = await supabase
    .from(from)
    .update({ [updateColumn]: option })
    .eq(eqColumn, eqValue)
    .select()
  if (error) {
    console.log("Error is: ", error)
  }
  return data
}

const useUpdateSingleColumn = (query) => {
  return useMutation((option) => updateMutateData(query, option), {})
}

export default useUpdateSingleColumn
