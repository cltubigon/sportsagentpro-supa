import { Flex, Image } from "@chakra-ui/react"
import React from "react"
import { useState } from "react"
import { Blurhash } from "react-blurhash"
import "./blurCanvass.css"

const ImageWithBlurhash = ({ srcOrigin, hash, circle }) => {
  const [isFullyLoaded, setisFullyLoaded] = useState(false)
  const handleOnLoad = () => {
    console.log("onload triggered")
    setisFullyLoaded(true)
  }

  // const widthInt = parseInt(width.replace('px', ''))
  // const heightInt = parseInt(height.replace('px', ''))
  // console.log({ isFullyLoaded, hash, srcOrigin })
  return (
    <Flex h={"100%"} w={"100%"} position={"relative"} className="main" gap={0}>
      {/* ============== Thumbnail Image ============== */}
      {hash && (
        <Flex
          className="subCont"
          position={"absolute"}
          top={0}
          left={0}
          w={"100%"}
          h={"100%"}
          opacity={isFullyLoaded && '0'}
        >
          <Blurhash
            // display={isFullyLoaded && "none"}
            className={circle && "blur-canvass"}
            hash={hash}
            width={"100%"}
            height={"100%"}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </Flex>
      )}
      {/* ============== Large Image ============== */}
      <Flex
        w={"100%"}
        h={"100%"}
        opacity={isFullyLoaded && '100'}
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

export default ImageWithBlurhash
