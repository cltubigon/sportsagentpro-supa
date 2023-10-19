/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Image, Input, Text } from "@chakra-ui/react"
import { useState } from "react"
import ImageOnload from "./ImageOnload"

const Test = () => {
  const [imageLoaded, setimageLoaded] = useState(false)
  const images = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]

  return (
    <Flex paddingTop={"88px"} flexDirection={"column"}>
      <ImageOnload
        srcOrigin={
          "https://onyfirisxcfthralzdua.supabase.co/storage/v1/render/image/public/gallery/876bc094-a837-488e-87b5-f61e63b32db9/20231018183148deandre1.jpg?format=origin"
        }
        srcThumb={
          "https://onyfirisxcfthralzdua.supabase.co/storage/v1/render/image/public/gallery/876bc094-a837-488e-87b5-f61e63b32db9/20231018183148deandre1.jpg?width=20&height=20&resize=cover"
        }
        w={"400px"}
        h={"400px"}
      />
      {images?.map((image) => {
        return (
          <Image
            key={image}
            src={`/images/Test/${image}.jpeg`}
            h={"400px"}
            w={"400px"}
            loading="lazy"
          />
        )
      })}
    </Flex>
  )
}

export default Test
