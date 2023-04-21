import { Avatar, Flex, Heading, Text } from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"

const MainNavigation = () => {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
  console.log("MainNavigation")
    const flexContainer = {
        px: "var(--chakra-space-4)",
        color: "white",
        justifyContent: "space-between",
        bg: "blue.800",
        py: "20px",
    }
    const [isLogin, setIsLogin] = useState(false)
  return (
    <Flex sx={flexContainer}>
        <Flex alignItems={"center"}>
        <Heading as={"h3"} fontSize={"3xl"}>
            <Link to="/">Sports Agent Pros</Link>
        </Heading>
        </Flex>
        <Flex>
            {isLogin ?
            <Flex gap={10} alignItems={"center"}>
              <Text>Deals</Text>
              <Text>Profile</Text>
              <Text>Help Center</Text>
              <Text>Logout</Text>
              <Avatar></Avatar>
            </Flex>
            :
            <Link to="/login">

            <Flex flexDirection={"column"}>
              <Avatar size={"sm"} alignSelf={"center"}/>
              <Text>Login</Text>
            </Flex>
            </Link>
            }
        </Flex>
  </Flex>
  )
}

export default MainNavigation