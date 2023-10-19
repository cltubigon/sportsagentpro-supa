import { Flex, Image } from "@chakra-ui/react"
import { motion } from "framer-motion"
import React from "react"
import { useState } from "react"
import { Blurhash } from "react-blurhash"

const ImageOnload = ({ srcOrigin, srcThumb, h: height, w: width }) => {
  const [isFullyLoaded, setisFullyLoaded] = useState(false)
  const handleOnLoad = () => {
    console.log("onload triggered")
    setisFullyLoaded((prev) => !prev)
  }

  const animate = {
    initial: {
      opacity: 0,
    },
    opacity: {
      opacity: 1,
      transition: {
        // duration: 0.5,
      },
    },
  }
  return (
    <Flex h={height} w={width} position={"relative"}>
      {/* ============== Thumbnail Image ============== */}
      {!isFullyLoaded && (
        <Flex
          position={"absolute"}
          bgColor={"red"}
          top={0}
          left={0}
          w={"100%"}
          h={"100%"}
        >
          {/* <Image src={srcThumb} h={height} w={width} loading="lazy" /> */}
          {!isFullyLoaded && (
            // <Skeleton
            //   borderRadius={"md"}
            //   startColor="#BCC6D3"
            //   endColor="#d9d9d9"
            //   w={"400px"}
            //   h={"400px"}
            // />
            <Blurhash
              hash="L6IW4xq^.l-p00]hZg4:8ZG^~Cgh"
              width={400}
              height={400}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          )}
        </Flex>
      )}
      {/* ============== Large Image ============== */}
      <Flex
        as={motion.div}
        variants={animate}
        initial={"initial"}
        animate={isFullyLoaded && "opacity"}
      >
        <Image
          src={srcOrigin}
          h={height}
          w={width}
          loading="lazy"
          onLoad={handleOnLoad}
          backdropBlur={'2xl'}
          blur={'lg'}
        />
      </Flex>
    </Flex>
  )
}

export default ImageOnload
