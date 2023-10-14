import { useMutation } from "@tanstack/react-query"
import supabase from "../../config/supabaseClient"

const fetchData = async ({metaData, userID}) => {
    const { id, ...meta_data } = metaData
    const { data, error } = await supabase
      .from("images")
      .upsert([{ meta_data, userID }])
      .select()
    if (data) {
      return data
    } else if (error) {
      console.log({ error })
    }
}

export const useMutateProfilePicture = () => {
//   const queryClient = useQueryClient()
  return useMutation(fetchData)
}
