import { Flex } from "@chakra-ui/react"
import React from "react"
import MainNavigation from "../navigation/MainNavigation"

const NavigationBar = () => {
  return (
    <Flex flexDirection={"column"}>
      <MainNavigation/>
    </Flex>
  )
}

export default NavigationBar