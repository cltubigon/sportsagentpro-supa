/* eslint-disable no-loop-func */
import React from "react"
import useItemQueryDataUpdater from "../../hooks/useItemQueryDataUpdater"
import { Button, Flex, Text } from "@chakra-ui/react"
import supabase from "../../config/supabaseClient"
import { generateBlurImage } from "../../utils/Blurhash/generateBlurImage"
import { useState } from "react"
import { useTemporaryMutateMultiplePictures } from "../../hooks/imageHooks/temporaryMutateMultiplePictures"

const Mutator = ({ images, listofAthletes, userID, query }) => {
  const { mutate } = useTemporaryMutateMultiplePictures(query)

  const handleClick = async () => {
    for (const athlete of listofAthletes) {
      const owner = `${athlete.firstName} ${athlete.lastName}`
      const userID = athlete.id
      const id = athlete.uid
      const images = athlete?.images
      console.log({ images })
      if (images?.length > 0) {
        const profilePicture = images && images[0]?.profile_picture
        const path = profilePicture.path
        console.log({ id, userID, path, athlete, images, profilePicture })
        const imageUrl = supabase.storage
          .from("avatar")
          .getPublicUrl(path, {
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
            if (hash) {
              console.count('hash is: ', { hash })
              const props = { userID, hash, id, owner }
              mutate(props)
            }
          } catch (error) {
            console.log({ error })
          }
        }
        getHash(imageUrl.data.publicUrl)
      }
    }

    // if (profilePictures?.length > 0) {
    //   for (const data of profilePictures) {
    //     const { path, name } = data
    //     // const newPath = path.replace(`${query.uid}/`, "")
    //     const { data: dataList, error: errorList } = await supabase.storage
    //       .from("profile_picture")
    //       .list(`${query.uid}`, {
    //         search: path,
    //       })
    //     if (dataList) {
    //       const imageURL = supabase.storage.from(`profile_picture`).getPublicUrl(path, {
    //         transform: {
    //           quality: 70,
    //           width: 32,
    //           height: 32,
    //           resize: "cover", // 'cover' | 'fill' | 'contain'
    //         },
    //       })

    //       const getHash = async (image) => {
    //         try {
    //           const hash = await generateBlurImage(image)
    //         //   console.log({ name, hash })
    //           const props = { name, userID, hash }
    //           mutate(props)
    //         } catch (error) {
    //           console.log({ error })
    //         }
    //       }
    //       getHash(imageURL.data.publicUrl)
    //     } else if (errorList) {
    //       console.log({ errorList })
    //     }
    //   }
    // }
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
