import { useMutation } from "@tanstack/react-query"
import supabase from "../../config/supabaseClient"

const fetchData = async (query, { userID, hash, name, uid }) => {
//   console.log("calling fetchData", userID)
  const { from, select, eqColumn, eqValue } = query
  const { data, error } = await supabase
    .from(from)
    .select(select)
    .eq(eqColumn, eqValue)
  if (data) {
    console.log({ data })
    const gallery = data && data[0]?.gallery
    const selectedImage = gallery?.filter((image) => image.name === name)
    const imageWithHash = { ...selectedImage[0], hash }
    const filteredGallery = gallery?.filter((item) => item.name !== name)
    const updatedGallery = [...filteredGallery, imageWithHash]
    // console.log({ updatedGallery, imageWithHash, selectedImage, name, userID })
    const { data: mutateResult, error } = await supabase
        .from("images")
        .upsert({ gallery: updatedGallery})
        .select()
      if (mutateResult) {
        const result = mutateResult && mutateResult[0]?.gallery
        console.log('result', result)
      } else if (error) {
        console.log({ error })
      }
  }
}

export const useTemporaryMutateMultiplePictures = (query) => {
  return useMutation((props) => fetchData(query, props))
}
