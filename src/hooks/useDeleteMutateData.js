import { useMutation, useQueryClient } from "@tanstack/react-query"
import supabase from "../config/supabaseClient"

const deleteMutateData = async ({ from, eqColumn, eqValue }) => {
  const { error } = await supabase
    .from(from)
    .delete()
    .eq(eqColumn, eqValue)
    if (error) {
      console.log({ error })
    }
}

const useDeleteMutateData = (query) => {
  const queryClient = useQueryClient()
  return useMutation(() => deleteMutateData(query), {
    onSuccess: () => {
      queryClient.invalidateQueries([query.mainKey])
    },
  })
}

export default useDeleteMutateData
