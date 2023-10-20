import { Flex } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import supabase from "../../../config/supabaseClient"
import { useSelector } from "react-redux"
import useGetMultiColumnData from "../../../hooks/useGetMultiColumnData"
import { generateBlurImage } from "../../../utils/generateBlurImage"

const GenerateBlurhash = () => {
  const id = useSelector((state) => state.auth.user?.id)
  const [imagePaths, setimagePaths] = useState([])
  const [hashes, setHashes] = useState([])

  const { data, isLoading } = useGetMultiColumnData({
    key: ["images", id],
    from: "images",
    select: "gallery",
    eqColumn: "id",
    eqValue: id,
  })
  useEffect(() => {
    const paths = data && data[0]?.gallery?.map((image) => image.path)
    console.log({ paths })
    setimagePaths(paths)
  }, [data])

  useEffect(() => {
    if (imagePaths?.length > 0) {
      const arrayOfHashes = []
      for (const path of imagePaths) {
        const image = supabase.storage.from(`gallery`).getPublicUrl(path, {
          transform: {
            width: 275,
            height: 275,
            resize: "cover", // fill | contain
          },
        })
        const hash = generateBlurImage(image?.data.publicUrl)
        console.log({ image, hash })
      }
      console.log({ arrayOfHashes })
      // setHashes(arrayOfHashes)
    }
  }, [imagePaths])
  console.log({ hashes })

  return <Flex></Flex>
}

export default GenerateBlurhash
