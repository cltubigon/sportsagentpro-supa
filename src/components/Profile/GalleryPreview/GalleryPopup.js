import { Flex, Icon, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import ImageWithBlurhash from "../../../utils/Blurhash/ImageWithBlurhash"

const GalleryPopup = ({
  setpopupOpen,
  imagePathAndHash,
  initialSelectedIndex,
}) => {
  const [activeIndex, setactiveIndex] = useState(initialSelectedIndex)

  const handleCloseButton = () => {
    setpopupOpen((prev) => !prev)
  }
  const handleImageClick = (e) => {
    e.stopPropagation()
  }
  const handleRightNav = (e) => {
    e.stopPropagation()
    if (activeIndex < imagePathAndHash?.length - 1) {
      setactiveIndex((prev) => prev + 1)
    } else {
      setactiveIndex(0)
    }
  }
  const handleLeftNav = (e) => {
    e.stopPropagation()
    if (activeIndex > 0) {
      setactiveIndex((prev) => prev - 1)
    } else {
      setactiveIndex(imagePathAndHash?.length - 1)
    }
  }

  console.log("imagePathAndHash.length", imagePathAndHash.length)
  console.log({ imagePathAndHash, initialSelectedIndex })
  const navigationStyle = {
    boxSize: 16,
    color: "white",
    position: "absolute",
    cursor: "pointer",
    p: 8,
    w: "150px",
    h: "150px",
  }
  return (
    <Flex
      zIndex={999}
      position={"fixed"}
      left={0}
      top={0}
      h={"100vh"}
      w={"100%"}
      bgColor={"rgba(0,0,0, 0.95)"}
      onClick={handleCloseButton}
    >
      <Flex
        w={"100%"}
        h={"100%"}
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex
          maxW={"960px"}
          h={"100%"}
          // w={'100%'}
          maxH={"700px"}
          position={"relative"}
          userSelect={"none"}
          onClick={handleImageClick}
        >
          {imagePathAndHash?.map((img, index) => {
            return (
              index === activeIndex && (
                <ImageWithBlurhash
                  key={index}
                  srcOrigin={img.path.data.publicUrl.replace(
                    "width=275&height=275&resize=cover",
                    "width=960&height=960&resize=contain"
                  )}
                  hash={img.hash}
                /> || <Text color={'white'}>Hello</Text>
              )
            )
          })}
        </Flex>

        {/* ==================== Left || Right ==================== */}
        <Icon
          as={FaChevronLeft}
          sx={navigationStyle}
          left={"150px"}
          onClick={handleLeftNav}
        />
        <Icon
          as={FaChevronRight}
          sx={navigationStyle}
          right={"150px"}
          onClick={handleRightNav}
        />
      </Flex>
    </Flex>
  )
}

export default GalleryPopup
