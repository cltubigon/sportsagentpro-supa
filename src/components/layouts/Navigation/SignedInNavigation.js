import { Avatar, AvatarBadge, Box, Button, Flex, Text } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaFileContract } from "react-icons/fa"
import { SUPABASE_SIGNOUT } from "../../../store/actions/authActions"

const SignedInNavigation = () => {
  console.log("SignedIn Navigation Rendered")
  const dispatch = useDispatch()

  const handleSignOut = () => {
    dispatch(SUPABASE_SIGNOUT())
  }

  const user = useSelector((state) => state.auth.user)

  return (
    <>
      <Flex
        gap={10}
        alignItems={"center"}
        flexGrow={1}
        justifyContent={"flex-end"}
      >
        {user && user.userType === "brand" && (
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
        )}
        <Text>Deals</Text>
        <Link to="/my-profile">
          <Text>Profile</Text>
        </Link>
        <Text>Help Center</Text>
        <Text cursor={"pointer"} onClick={handleSignOut}>
          Logout
        </Text>
        <Avatar name={user && `${user.firstName[0]} ${user.lastName[0]}`}>
          <AvatarBadge boxSize="0.9em" bg="green.500" />
        </Avatar>
      </Flex>
    </>
  )
}

export default SignedInNavigation
