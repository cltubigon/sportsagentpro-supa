import { Avatar, AvatarBadge, Box, Button, Flex, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaFileContract } from "react-icons/fa"

const SignedInNavigation = ({handleSignOut}) => {
  console.log("SignedIn Navigation Rendered")

  const profile = useSelector((state) => state.auth.profile)

  return (
    <>
      <Flex
        gap={10}
        alignItems={"center"}
        flexGrow={1}
        justifyContent={"flex-end"}
      >
        {/* {userType && userType === "brand" && ( */}
        <Box mr={"auto"}>
          <Link to={"/build"}>
            <Button
              colorScheme="twitter"
              borderRadius={"100px"}
              leftIcon={<FaFileContract />}
            >
              Build
            </Button>
          </Link>
        </Box>
        {/* )} */}
        <Text>Deals</Text>
        <Link to="/my-profile">
          <Text>Profile</Text>
        </Link>
        <Link to="/my-component">
          <Text>MyComponent</Text>
        </Link>
        <Text>Help Center</Text>
        <Text cursor={"pointer"} onClick={handleSignOut}>
          Logout
        </Text>
        <Avatar name={profile && profile.initials}>
          {/* <Avatar name={'M M'}> */}
          <AvatarBadge boxSize="0.9em" bg="green.500" />
        </Avatar>
      </Flex>
    </>
  )
}

export default SignedInNavigation
