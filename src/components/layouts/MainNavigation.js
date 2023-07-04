import { Flex, Heading } from "@chakra-ui/react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import SignedOutNavigation from "./Navigation/SignedOutNavigation"
import SignedInNavigation from "./Navigation/SignedInNavigation"
import { MainNavigationStyle } from "../../styles/MainNavigationStyle"
import { useEffect } from "react"
import { useState } from "react"
import { resetBuildState } from "../../store/actions/buildPostActions"
import { resetPostState } from "../../store/actions/postActions"
import { signOut } from "../../store/actions/authActions"

const MainNavigation = () => {
  console.log("MainNavigation")
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const [loggingOut, setIsLoggingOut] = useState(false)

  const handleSignOut = () => {
    dispatch(signOut())
    setIsLoggingOut(true)
  }

  useEffect(() => {
    if (loggingOut && !isLoggedIn) {
      navigate("/")
      dispatch(resetBuildState())
      dispatch(resetPostState())
      setIsLoggingOut(false)
    }
  }, [loggingOut, isLoggedIn])
  return (
    <>
      {location.pathname !== "/signup" &&
        location.pathname !== "/login" &&
        !location.pathname.includes("/build") && (
          <Flex sx={MainNavigationStyle.mainContainer}>
            <Flex sx={MainNavigationStyle.logoContainer}>
              <Heading sx={MainNavigationStyle.logoText}>
                <Link to="/">Sports Agent Pros</Link>
              </Heading>
            </Flex>
            <Flex flexGrow={1}>
              {isLoggedIn ? (
                <SignedInNavigation handleSignOut={handleSignOut} />
              ) : (
                <SignedOutNavigation />
              )}
            </Flex>
          </Flex>
        )}
    </>
  )
}

export default MainNavigation
