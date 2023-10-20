import React, { useState } from "react"
import BlurhashGenerator from "./BlurhashGenerator"
import ImagePreview from "./ImagePreview"
import { Flex } from "@chakra-ui/react"
import Dropzone from "react-dropzone"
import { encode } from "blurhash"

const generateBlurImage = (image, setblurhash) => {
    console.log('generator called', image)
  const img = new Image()
  img.crossOrigin = "anonymous"
  img.src = image

  img.onload = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0, img.width, img.height)
    const imageData = ctx.getImageData(0, 0, img.width, img.height)
    const blurhash = encode(imageData.data, img.width, img.height, 4, 3)
    setblurhash(blurhash)
    // return blurhash
  }
}

function Main() {
  const [blurhash, setblurhash] = useState([])
  const image =
    "https://onyfirisxcfthralzdua.supabase.co/storage/v1/render/image/public/gallery/ffd56560-00de-4e17-9244-19a622c1c379/20231018183502lin2.jpg?width=275&height=275&resize=cover"
    generateBlurImage(image, setblurhash)
    console.log({ blurhash })
  return (
    <></>
    // <Flex flexDirection={"column"} pt={"88px"}>
    //   {image && <BlurhashGenerator image={image} setblurhash={setblurhash} />}
    // </Flex>
  )
}

export default Main
