/* eslint-disable no-loop-func */
import React from "react"
import useItemQueryDataUpdater from "../../hooks/useItemQueryDataUpdater"
import { Button, Flex, Text } from "@chakra-ui/react"
import supabase from "../../config/supabaseClient"
import { generateBlurImage } from "../../utils/Blurhash/generateBlurImage"
import { useState } from "react"
import { useTemporaryMutateMultiplePictures } from "../../hooks/imageHooks/temporaryMutateMultiplePictures"

const Mutator = ({ images, userID, query }) => {
  const { mutate } = useTemporaryMutateMultiplePictures(query)

  const handleClick = async () => {
    const gallery = images && images[0]?.gallery
    if (gallery?.length > 0) {
      for (const data of gallery) {
        const { path, name } = data
        // const newPath = path.replace(`${query.uid}/`, "")
        const { data: dataList, error: errorList } = await supabase.storage
          .from("gallery")
          .list(`${query.uid}`, {
            search: path,
          })
        if (dataList) {
          const imageURL = supabase.storage.from(`gallery`).getPublicUrl(path, {
            transform: {
              quality: 70,
              width: 32,
              height: 32,
              resize: "cover", // 'cover' | 'fill' | 'contain'
            },
          })

          const getHash = async (image) => {
            try {
              const hash = await generateBlurImage(image)
            //   console.log({ name, hash })
              const props = { name, userID, hash }
              mutate(props)
            } catch (error) {
              console.log({ error })
            }
          }
          getHash(imageURL.data.publicUrl)
        } else if (errorList) {
          console.log({ errorList })
        }
      }
    }
    console.log({ gallery, images })
  }

  return (
    <div>
      <Button colorScheme="twitter" onClick={handleClick}>
        Update
      </Button>
    </div>
  )
}

export default Mutator
