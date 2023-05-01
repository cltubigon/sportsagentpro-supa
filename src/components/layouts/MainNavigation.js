import { Flex, Heading } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import SignedOutNavigation from "./Navigation/SignedOutNavigation"
import SignedInNavigation from "./Navigation/SignedInNavigation"
import { NavigationSkeleton } from "../Skeleton/Skeletons"

const MainNavigation = () => {
  console.count("rendered main navigation")
  const location = useLocation()
  console.log('state', useSelector((state)=> state))
  const auth = useSelector((state)=> state.firebase.auth)
  console.log('uid', auth.uid)
  const flexContainer = {
      px: "var(--chakra-space-4)",
      color: "white",
      justifyContent: "space-between",
      bg: "blue.800",
      py: "20px",
  }
  return (
    <>
      {location.pathname !== '/signup' &&  location.pathname !== '/login' &&
      <Flex sx={flexContainer}>
        <Flex alignItems={"center"}>
        <Heading as={"h3"} fontSize={"3xl"}>
            <Link to="/">Sports Agent Pros</Link>
        </Heading>
        </Flex>
        {auth.isLoaded ? 
        (<Flex>
            {auth.uid ? (<SignedInNavigation />) : (<SignedOutNavigation />)}
        </Flex>)
        :
        (<NavigationSkeleton />)
        }
      </Flex>}
    </>
  )
}
  
export default MainNavigation