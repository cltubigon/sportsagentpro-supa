import { useMutation } from "@tanstack/react-query"
import supabase from "../../config/supabaseClient"

const fetchData = async (query, { userID, hash, id, owner }) => {
  //   console.log("calling fetchData", userID)
  const { from, select, eqColumn, eqValue } = query
  const { data, error } = await supabase.from("images").select("*").eq("id", id)
  if (data) {
    const profile_picture = data?.map((i) => i.profile_picture)
    // console.log({ profile_picture, owner })
    // const selectedImage = profile_picture && profile_picture[0]
    const imageWithHash = { ...profile_picture[0], hash }
    // const filteredGallery = profile_picture?.filter((item) => item.name !== name)
    // const updatedGallery = [...filteredGallery, imageWithHash]
    console.log({ imageWithHash, id, userID, owner, profile_picture })
      const { data: mutateResult, error } = await supabase
        .from("images")
        .update({ profile_picture: imageWithHash })
        .eq('userID', userID)
        .select()
      if (mutateResult) {
        const result = mutateResult && mutateResult[0]?.profile_picture
        console.log("result", result, {owner})
      } else if (error) {
        console.log({ error })
      }
  }
}

export const useTemporaryMutateMultiplePictures = (query) => {
  return useMutation((props) => fetchData(query, props))
}
