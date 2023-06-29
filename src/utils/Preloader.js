import { Flex, Heading, Icon } from "@chakra-ui/react"
import { motion } from "framer-motion"
import React from "react"
import { CiBasketball } from "react-icons/ci"
import { preloaderStyle } from "../styles/preloaderStyle"

const Preloader = () => {
  return (
    <>
      <Flex sx={preloaderStyle.mainContainer}>
        <Flex>
          <Heading sx={preloaderStyle.spa}>S</Heading>
          <Heading sx={preloaderStyle.spa}>P</Heading>
          <Heading sx={preloaderStyle.spa}>A</Heading>
        </Flex>
        <Flex
          as={motion.div}
          variants={preloaderStyle}
          initial={"initial"}
          animate={"rotate"}
          sx={preloaderStyle.ballContainer}
        >
          <Icon as={CiBasketball} color={"#2A4365"} boxSize={8} />
        </Flex>
      </Flex>
    </>
  )
}

export default Preloader
