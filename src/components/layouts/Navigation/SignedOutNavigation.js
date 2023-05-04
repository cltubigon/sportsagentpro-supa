import { Avatar, Flex, Text } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"

const SignedOutNavigation = () => {
  return (
    <Flex gap={6} alignItems={"center"} >
      <Link to="/login">
        <Flex flexDirection={"column"}>
          <Avatar size={"xs"} alignSelf={"center"} />
          <Text>Login</Text>
        </Flex>
      </Link>
    </Flex>
  )
}

export default SignedOutNavigation
