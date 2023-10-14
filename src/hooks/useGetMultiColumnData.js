import { useQuery } from "@tanstack/react-query"
import supabase from "../config/supabaseClient"

const fetchMultiColumnData = async (query) => {
  const { data, error } = await supabase
    .from(query.from)
    .select(query.select)
    .eq(query.eqColumn, query.eqValue)
  if (error) {
    console.log({ error })
    throw error
  }
  return data
}

const useGetMultiColumnData = (query) => {
  return useQuery(query.key, () => fetchMultiColumnData(query))
}

export default useGetMultiColumnData
