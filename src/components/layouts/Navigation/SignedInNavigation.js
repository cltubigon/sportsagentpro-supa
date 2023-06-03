import { Avatar, AvatarBadge, Box, Button, Flex, Text } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { resetAuthState, signOut } from "../../../store/actions/authActions"
import { Link, useNavigate } from "react-router-dom"
import { FaFileContract } from "react-icons/fa"
import { resetB, resetBuildState } from "../../../store/actions/buildPostActions"
import { resetPostState } from "../../../store/actions/postActions"

const SignedInNavigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initials = useSelector((state) => state.auth.profile.initials)
  const auth = useSelector((state) => state.auth)
  
  const { profile } = auth
  const userType = profile.userType
  console.log("userType: ", userType)
  
  const handleSignOut = () => {
    dispatch(signOut())
    dispatch(resetBuildState())
    dispatch(resetPostState())
  }

  return (
    <>
      <Flex
        gap={10}
        alignItems={"center"}
        flexGrow={1}
        justifyContent={"flex-end"}
      >
        {userType && userType === "brand" && (
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
        <Avatar name={initials}>
          <AvatarBadge boxSize="0.9em" bg="green.500" />
        </Avatar>
      </Flex>
    </>
  )
}

export default SignedInNavigation
