import { Avatar, Flex, Text } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"

const SignedOutNavigation = () => {
  return (
    <>
      <Link to="/login">
        <Flex flexDirection={"column"}>
          <Avatar size={"sm"} alignSelf={"center"} />
          <Text>Login</Text>
        </Flex>
      </Link>
    </>
  )
}

export default SignedOutNavigation
