import { Flex, Icon, Image } from "@chakra-ui/react"
import React from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const GalleryPopup = ({ setpopupOpen, imageURLs }) => {
  const handleCloseButton = () => {
    setpopupOpen((prev) => !prev)
  }
  const handleImageClick = (e) => {
    e.stopPropagation()
  }
  const handleRightNav = (e) => {
    e.stopPropagation()
  }
  const handleLeftNav = (e) => {
    e.stopPropagation()
  }

  console.log({ imageURLs })
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
        <Image
          userSelect={"none"}
          src="/images/testimage.jpg"
          maxW={"960px"}
          maxH={"80vh"}
          onClick={handleImageClick}
        />

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
