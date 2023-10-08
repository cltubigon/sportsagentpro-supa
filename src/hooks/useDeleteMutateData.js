import { useMutation, useQueryClient } from "@tanstack/react-query"
import supabase from "../config/supabaseClient"

const deleteMutateData = async ({ from, eqColumn }, id) => {
  const { error } = await supabase
    .from(from)
    .delete()
    .eq(eqColumn, id)
    if (error) {
      console.log({ error })
    }
}

const useDeleteMutateData = (query) => {
  const queryClient = useQueryClient()
  return useMutation((id) => deleteMutateData(query, id), {
    onSuccess: () => {
      queryClient.invalidateQueries([query.mainKey])
    },
  })
}

export default useDeleteMutateData
