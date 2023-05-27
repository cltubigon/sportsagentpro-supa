import { Avatar, AvatarBadge, Box, Button, Flex, Text } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "../../../store/actions/authActions"
import { Link, useNavigate } from "react-router-dom"
import { FaFileContract } from "react-icons/fa"

const SignedInNavigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initials = useSelector(state => state.auth.profile.initials)

  const handleSignOut = ()=> {
    dispatch(signOut())
    navigate('/')
  }

  return (
    <>
      <Flex gap={10} alignItems={"center"} flexGrow={1} justifyContent={'flex-end'}>
        <Box mr={'auto'}>
          <Link to={'/build'}>
            <Button colorScheme="twitter" borderRadius={'100px'} leftIcon={<FaFileContract />}>
                  Build
            </Button>
          </Link>
        </Box>
        <Text>Deals</Text>
        <Link to="/my-profile"><Text>Profile</Text></Link>
        <Text>Help Center</Text>
        <Text cursor={"pointer"} onClick={handleSignOut}>Logout</Text>
        <Avatar name={initials}>
          <AvatarBadge boxSize='0.9em' bg='green.500' />
        </Avatar>
      </Flex>
    </>
  )
}

export default SignedInNavigation