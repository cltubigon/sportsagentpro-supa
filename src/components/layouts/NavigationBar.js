import { Flex } from "@chakra-ui/react"
import React from "react"
import SubNavigation from "../navigation/SubNavigation"
import MainNavigation from "../navigation/MainNavigation"

const NavigationBar = () => {
  return (
    <Flex flexDirection={"column"}>
      <MainNavigation/>
      <SubNavigation />
    </Flex>
  )
}

export default NavigationBar