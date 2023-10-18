import { useMutation, useQueryClient } from "@tanstack/react-query"
import supabase from "../../config/supabaseClient"

const fetchData = async ({metaData, userID}) => {
  const { data: getData, error: getError } = await supabase
      .from("images")
      .select('gallery')
      .eq('userID', userID)
      if (getData) {
        console.log({ getData })
        const arrayData = getData && getData[0]?.gallery
        const { id, ...gallery } = metaData
        const { data, error } = await supabase
          .from("images")
          .upsert({ gallery: [...arrayData, gallery], userID })
          .select()
        if (data) {
          console.log({ data })
          // return data
        } else if (error) {
          console.log({ error })
        }
      } else if (getError) {
        console.log({ getError })
      }
}

export const useMutateMultiplePictures = () => {
  console.count('calling mutate function')
  const queryClient = useQueryClient()
  return useMutation(fetchData, {
    // onSuccess: (data) => {
    //   console.log({ data })
    //   console.log([`profilePicture - ${data[0]?.id}`])
    //   queryClient.invalidateQueries([`profilePicture - ${data[0]?.id}`])
    // }
  })
}
