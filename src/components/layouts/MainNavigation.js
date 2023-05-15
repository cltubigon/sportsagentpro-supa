import { Button, Flex, Heading } from "@chakra-ui/react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import SignedOutNavigation from "./Navigation/SignedOutNavigation"
import SignedInNavigation from "./Navigation/SignedInNavigation"
import { signOut, updateProfileState } from "../../store/actions/authActions"
import { useEffect } from "react"
import {FaFileContract} from 'react-icons/fa'

const MainNavigation = () => {
  const dispatch = useDispatch()

  const location = useLocation()

  const getState = useSelector((state) => state) // TODO: removable
  const profile = useSelector((state) => state.firebase.profile)
  const auth = useSelector((state) => state.firebase.auth.uid)
  const isLoggedIn = useSelector((state) => state.auth.profile)
  console.log("MainNavigation")

  const { firstName, initials, lastName, phoneNumber, userType } = profile
  const userProfile = { firstName, initials, lastName, phoneNumber, userType }

  useEffect(() => {
    const runTimeout = setTimeout(() => {
      if (isLoggedIn && !auth) {
        console.log("signing out, bye2x")
        dispatch(signOut())
      }
    }, 8000)

    return () => {
      clearTimeout(runTimeout)
      console.log("timeout cleared")
    }
  }, [isLoggedIn])

  useEffect(() => {
    profile.firstName && dispatch(updateProfileState(userProfile))
  }, [profile.firstName])

  const flexContainer = {
    px: "var(--chakra-space-4)",
    color: "white",
    justifyContent: "space-between",
    bg: "blue.800",
    py: "20px",
    position: "fixed",
    width: "100%",
    zIndex: "999",
  }
  const myConsole = () => {
    console.log('I am navigating to homepage.')
  }
  return (
    <>
      {location.pathname !== "/signup" && location.pathname !== "/login" && location.pathname !== "/build" && (
        <Flex sx={flexContainer}>
          <Flex alignItems={"center"} gap={6}>
            <Heading as={"h3"} fontSize={"3xl"}>
              <Link to="/" onClick={myConsole}>Sports Agent Pros</Link>
            </Heading>
            <Link to={'/build'}><Button colorScheme="twitter" borderRadius={'100px'} leftIcon={<FaFileContract />}>
              Build
            </Button></Link>
          </Flex>
          <Flex>
            {isLoggedIn ? <SignedInNavigation /> : <SignedOutNavigation />}
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default MainNavigation
