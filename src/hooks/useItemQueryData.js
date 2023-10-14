import { useQuery, useQueryClient } from "@tanstack/react-query"
import supabase from "../config/supabaseClient"

const fetchItemData = async (query) => {
  const { data, error } = await supabase
    .from(query.from)
    .select("*, images(meta_data)")
    .eq(query.eqColumn, query.eqValue)
  if (error) throw error
  return data
}

const useItemQueryData = (query) => {
  const queryClient = useQueryClient()
  return useQuery([query.key, query.eqValue], () => fetchItemData(query), {
    refetchInterval: 30000,
    initialData: () => {
      const identifier = queryClient
        .getQueryData([query.mainKey])
        ?.pages?.map(({ data }) => {
          return data?.find((individualData) => {
            return individualData.id === query.eqValue
          })
        })
        console.log({ identifier })
      if (identifier) {
        const thisData = identifier.find(val => val !== undefined)
        console.log({ thisData })
        return [thisData]
      } else {
        return undefined
      }
    },
  })
}

export default useItemQueryData
