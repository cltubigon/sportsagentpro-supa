import { Flex, Icon } from "@chakra-ui/react"
import React, { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import ImageWithBlurhash from "../../../utils/Blurhash/ImageWithBlurhash"

const GalleryPopup = ({
  setpopupOpen,
  imagePathAndHash,
  initialSelectedIndex,
}) => {
  const [activeIndex, setactiveIndex] = useState(initialSelectedIndex)
  const [startX, setStartX] = useState(null)
  const [startY, setStartY] = useState(null)

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

  //================= Swipe Code Start =================
  const handleRightSwipe = (e) => {
    if (activeIndex < imagePathAndHash?.length - 1) {
      setactiveIndex((prev) => prev + 1)
    } else {
      setactiveIndex(0)
    }
  }
  const handleLeftSwipe = (e) => {
    if (activeIndex > 0) {
      setactiveIndex((prev) => prev - 1)
    } else {
      setactiveIndex(imagePathAndHash?.length - 1)
    }
  }

  const handleTouchStart = (e) => {
    setStartX(e.changedTouches[0].clientX)
    setStartY(e.changedTouches[0].clientY)
  }
  const handleTouchEnd = (e) => {
    if (startX !== null) {
      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const deltaX = endX - startX
      const deltaY = endY - startY
      if (deltaX > 10 && deltaY > -100 && deltaY < 60) {
        handleLeftSwipe()
      } else if (deltaX < -20 && deltaY > -100 && deltaY < 60) {
        handleRightSwipe()
      }
    }
  }

  const handleDragStart = (e) => {
    setStartX(e.clientX)
    setStartY(e.clientY)
    e.dataTransfer.setDragImage(document.createElement("div"), 0, 0)
  }

  const handleDragEnd = (e) => {
    if (startX !== null) {
      const endX = e.clientX
      const endY = e.clientY
      const deltaX = endX - startX
      const deltaY = endY - startY

      if (deltaX > 10 && deltaY > -100 && deltaY < 80) {
        handleLeftSwipe()
      } else if (deltaX < -20 && deltaY > -100 && deltaY < 80) {
        handleRightSwipe()
      }

      setStartX(null)
    }
  }
  //================= Swipe Code end =================

  console.log("imagePathAndHash.length", imagePathAndHash.length)
  console.log({ imagePathAndHash, initialSelectedIndex })
  const navigationStyle = {
    boxSize: 16,
    color: "white",
    position: "absolute",
    cursor: "pointer",
    p: 8,
    display: { sph: "none", stl: "block" },
    w: { stl: "120px", slt: "120px", llt: "150px" },
    h: { stl: "120px", slt: "120px", llt: "150px" },
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
          position={"relative"}
          userSelect={"none"}
          onClick={handleImageClick}
        >
          {imagePathAndHash?.map((img, index) => {
            return (
              <Flex
                key={index}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                opacity={index === activeIndex ? 100 : 0}
                w={index !== activeIndex && 0}
                h={index !== activeIndex && 0}
              >
                <ImageWithBlurhash
                  srcOrigin={img.path.data.publicUrl.replace(
                    "width=275&height=275&resize=cover",
                    "width=720&height=720&resize=contain"
                  )}
                  hash={img.hash}
                  // isUserSelect={true}
                />
              </Flex>
            )
          })}
        </Flex>

        {/* ==================== Left || Right ==================== */}
        <Icon
          as={FaChevronLeft}
          sx={navigationStyle}
          left={{ stl: "40px", llt: "80px" }}
          onClick={handleLeftNav}
        />
        <Icon
          as={FaChevronRight}
          sx={navigationStyle}
          right={{ stl: "40px", llt: "80px" }}
          onClick={handleRightNav}
        />
      </Flex>
    </Flex>
  )
}

export default GalleryPopup
