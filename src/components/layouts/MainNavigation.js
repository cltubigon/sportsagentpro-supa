import { Flex, Heading } from "@chakra-ui/react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import SignedOutNavigation from "./Navigation/SignedOutNavigation"
import SignedInNavigation from "./Navigation/SignedInNavigation"
import { MainNavigationStyle } from "../../styles/MainNavigationStyle"
import { useEffect } from "react"
import { useState } from "react"

const MainNavigation = () => {
  console.log("MainNavigation")
  const location = useLocation()
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.user)

  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    if (signingOut) {
      navigate("/")
    }

    return setSigningOut(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  
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
              {user ? <SignedInNavigation setSigningOut={setSigningOut} /> : <SignedOutNavigation />}
            </Flex>
          </Flex>
        )}
    </>
  )
}

export default MainNavigation
