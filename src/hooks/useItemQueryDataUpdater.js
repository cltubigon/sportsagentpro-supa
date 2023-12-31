import { useQuery } from "@tanstack/react-query"
import supabase from "../config/supabaseClient"

const fetchItemDataUpdater = async (query) => {
  const { from, select, eqColumn, eqValue } = query
  const { data, error } = await supabase
    .from(from)
    .select(select)
    .eq(eqColumn, eqValue)
    .order('created_at', { ascending: false })
    // .range(0,9)
  if (error) throw error
  console.log({ data })
  return data
}

const useItemQueryDataUpdater = (query) => {
  return useQuery(["updates"], () => fetchItemDataUpdater(query))
}

export default useItemQueryDataUpdater
