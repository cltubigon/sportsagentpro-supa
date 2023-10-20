import { Flex, Image } from "@chakra-ui/react"
import { motion } from "framer-motion"
import React from "react"
import { useState } from "react"
import { Blurhash } from "react-blurhash"
import "./blurCanvass.css"

const ImageOnload = ({ srcOrigin, hash, circle }) => {
  const [isFullyLoaded, setisFullyLoaded] = useState(false)
  const handleOnLoad = () => {
    console.log("onload triggered")
    setisFullyLoaded((prev) => !prev)
  }

  // const widthInt = parseInt(width.replace('px', ''))
  // const heightInt = parseInt(height.replace('px', ''))

  const animate = {
    initial: {
      opacity: 0,
      filter: 'blur(5px)',
      transition: {
        duration: 0.4,
      }
    },
    opacity: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
      }
    },
  }
  return (
    <Flex h={"100%"} w={"100%"} position={"relative"} className="main" gap={0}>
      {/* ============== Thumbnail Image ============== */}
        <Flex
          className="subCont"
          position={"absolute"}
          top={0}
          left={0}
          w={"100%"}
          h={"100%"}
          as={motion.div}
          variants={animate}
          initial={"opacity"}
          animate={isFullyLoaded && "initial"}
        >
          <Blurhash
            className={circle && "blur-canvass"}
            hash={hash}
            width={"100%"}
            height={"100%"}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </Flex>
      {/* ============== Large Image ============== */}
      <Flex
        as={motion.div}
        variants={animate}
        initial={"initial"}
        animate={isFullyLoaded && "opacity"}
        w={"100%"}
        h={"100%"}
      >
        <Image
          src={srcOrigin}
          h={"100%"}
          w={"100%"}
          loading="lazy"
          onLoad={handleOnLoad}
          borderRadius={circle && "100%"}
        />
      </Flex>
    </Flex>
  )
}

export default ImageOnload
