import { useMutation, useQueryClient } from "@tanstack/react-query"
import supabase from "../../config/supabaseClient"

const updateMutateData = async (
  { updateColumn, from, eqColumn, eqValue },
  option
) => {
  console.log({ option, eqColumn })
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
  const { mainKey, updateColumn } = query
  // console.log({ query })
  const queryClient = useQueryClient()
  return useMutation((option) => updateMutateData(query, option), {
    onMutate: async (updateValue) => {
      await queryClient.cancelQueries(mainKey)
      const prevQueryData = queryClient.getQueryData(mainKey)
      queryClient.setQueryData(mainKey, (oldQueryData) => {
        // console.log({ oldQueryData })
        console.log({ updateColumn })
        const newData = [{ ...oldQueryData[0], [updateColumn]: updateValue }]
        console.log({ newData })
        return newData
      })
      console.log({ mainKey, prevQueryData, updateValue, updateColumn })
      return prevQueryData
    },
    onError: (_error, context) => {
      console.log('context', context)
      queryClient.setQueryData(
        mainKey,
        context.prevQueryData
      )
    },
    onSettled: (data) => {
      if (!data)
        queryClient.invalidateQueries(mainKey)
    },
  })
}

export default useUpdateSingleColumn
