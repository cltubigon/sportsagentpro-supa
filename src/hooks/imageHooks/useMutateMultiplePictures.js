import { useMutation } from "@tanstack/react-query"
import supabase from "../../config/supabaseClient"

const fetchData = async ({ metaData, userID }) => {
  const { id, ...gallery } = metaData
  const { data: getData, error: getError } = await supabase
    .from("images")
    .select("gallery")
    .eq("userID", userID)
  if (getData) {
    console.log({ getData })
    const arrayData = getData && getData[0]?.gallery
    console.log({ arrayData })
    if (arrayData) {
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
    } else if (!arrayData) {
      const newArrayData = []
      const { data, error } = await supabase
        .from("images")
        .upsert({ gallery: [...newArrayData, gallery], userID })
        .select()
      if (data) {
        console.log({ data })
      } else if (error) {
        console.log({ error })
      }
    }
  } else if (getError) {
    console.log({ getError })
  }
}

export const useMutateMultiplePictures = () => {
  console.count("calling mutate function")
  return useMutation(fetchData)
}
