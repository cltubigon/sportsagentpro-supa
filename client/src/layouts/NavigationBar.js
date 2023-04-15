import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react"
import React from "react"
import SubNavigation from "../components/navigation/SubNavigation"

const NavigationBar = () => {
  return (
    <>
    <Flex flexDirection={"column"}>
      <Flex color={"white"} justifyContent={"space-between"} bg={"blue.800"} py={"20px"}  px={"var(--chakra-space-4)"}>
        <Box>
          <Heading as={"h3"} fontSize={"3xl"}>
            Sports Agent Pro
          </Heading>
        </Box>
        <Flex gap={10} alignItems={"center"} >
          <Text>Deals</Text>
          <Text>Profile</Text>
          <Text>Help Center</Text>
          <Text>Logout</Text>
          <Avatar></Avatar>
        </Flex>
      </Flex>
      <Flex px={"var(--chakra-space-4)"}>
        <SubNavigation />
      </Flex>
    </Flex>
    </>
  )
}

export default NavigationBar
