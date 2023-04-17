import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react"
import React from "react"
import SubNavigation from "../components/navigation/SubNavigation"
import MainNavigation from "../components/navigation/MainNavigation"

const NavigationBar = () => {
  return (
    <Flex flexDirection={"column"}>
      <MainNavigation/>
      <SubNavigation />
    </Flex>
  )
}

export default NavigationBar