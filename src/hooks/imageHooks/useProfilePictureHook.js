import { useQuery } from "@tanstack/react-query"
import supabase from "../../config/supabaseClient"

const fetchData = async ({ from, eqColumn, eqValue }) => {
    console.log({ from, eqColumn, eqValue })
  const { data, error } = await supabase
    .from(from)
    .select("*")
    .eq(eqColumn, eqValue)
  if (data) {
    return data
  } else if (error) {
    console.log({ error })
  }
}

export const useProfilePictureHook = (query) => {
  return useQuery([`profilePicture - ${query.eqValue}`], () => fetchData(query))
}
