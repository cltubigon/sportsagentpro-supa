import { Flex, Heading } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import SignedOutNavigation from "./Navigation/SignedOutNavigation"
import SignedInNavigation from "./Navigation/SignedInNavigation"
import { signOut, updateProfileState } from "../../store/actions/authActions"
import { useEffect } from "react"

const MainNavigation = () => {
  const dispatch = useDispatch()
  
  const location = useLocation()
  
  const getState = useSelector((state)=> state) // TODO: removable
  const profile = useSelector(state=> state.firebase.profile)
  const auth = useSelector((state)=> state.firebase.auth.uid)
  const dashboardAccess = useSelector(state => state.auth.profile)
  console.count("-----rendered main navigation and the state is: ", getState)
  
  const {firstName,initials,lastName,phoneNumber,userType} = profile
  const userProfile = {firstName,initials,lastName,phoneNumber,userType}

  useEffect(()=> {
    if (dashboardAccess && !auth) {
      dispatch(signOut())
    }
  },[dashboardAccess])

  useEffect(()=> {
    profile.firstName && dispatch(updateProfileState(userProfile))
  },[profile.firstName])

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
        <Flex>
            {dashboardAccess ? (<SignedInNavigation />) : (<SignedOutNavigation />)}
        </Flex>
      </Flex>}
    </>
  )
}
  
export default MainNavigation