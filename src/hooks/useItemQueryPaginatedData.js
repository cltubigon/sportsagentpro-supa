import { useQuery, useQueryClient } from "@tanstack/react-query"
import supabase from "../config/supabaseClient"

const fetchItemFromPaginatedData = async (query) => {
    const { from, eqColumn, eqValue } = query
  const { data, error } = await supabase
    .from(from)
    .select("*")
    .eq(eqColumn, eqValue)
  if (error) throw error
  return data
}

const useItemQueryPaginatedData = (query) => {
  const { eqValue, key, mainKey } = query
  const queryClient = useQueryClient()
  return useQuery(key, () => fetchItemFromPaginatedData(query), {
    refetchInterval: 30000,
    initialData: () => {
      const identifier = queryClient
        .getQueryData(mainKey)
        ?.data?.find((individualData) => {
          return individualData.id === eqValue
        })
      if (!identifier) {
        return undefined
      }
      return [identifier]
    },
  })
}

export default useItemQueryPaginatedData
