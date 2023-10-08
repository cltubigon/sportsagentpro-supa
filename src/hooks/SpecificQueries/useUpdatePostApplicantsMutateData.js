import { useMutation, useQueryClient } from "@tanstack/react-query"
import supabase from "../../config/supabaseClient"

const updateMutateData = async (
  { updateColumn, from, eqColumn, eqValue },
  updateValue
) => {
  const { data, error } = await supabase
    .from(from)
    .update({ [updateColumn]: updateValue })
    .eq(eqColumn, eqValue)
    .select()
  if (error) {
    console.log("Error is: ", error)
  }
  return data
}

const useUpdatePostApplicantsMutateData = (query) => {
  const { mainKey, eqValue } = query
  const queryClient = useQueryClient()
  return useMutation((updateValue) => updateMutateData(query, updateValue), {
    onMutate: async (updateValue) => {
      await queryClient.cancelQueries(mainKey)
      const prevQueryData = queryClient.getQueryData(mainKey)
      queryClient.setQueryData(mainKey, (oldQueryData) => {
        const newQueryData = oldQueryData?.data.map((post) => {
          if (post.id === eqValue) {
            return { ...post, postApplicants: updateValue }
          } else {
            return post
          }
        })
        return {
          ...oldQueryData,
          data: newQueryData,
        }
      })
      return prevQueryData
    },
    onError: (_error, context) => {
      queryClient.setQueryData(
        [query.mainKey, query.pageNumber],
        context.prevQueryData
      )
    },
    onSettled: (data) => {
      if (!data)
        queryClient.invalidateQueries([query.mainKey, query.pageNumber])
    },
  })
}

export default useUpdatePostApplicantsMutateData
