import { useMutation, useQueryClient } from "@tanstack/react-query"
import supabase from "../../config/supabaseClient"

const fetchData = async ({metaData, userID}) => {
    const { id, ...profile_picture } = metaData
    const { data, error } = await supabase
      .from("images")
      .upsert([{ profile_picture, userID }])
      .select()
    if (data) {
      console.log({ data })
      return data
    } else if (error) {
      console.log({ error })
    }
}

export const useMutateProfilePicture = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchData, {
    onSuccess: (data) => {
      console.log({ data })
      console.log([`profilePicture - ${data[0]?.id}`])
      queryClient.invalidateQueries([`profilePicture - ${data[0]?.id}`])
    }
  })
}
