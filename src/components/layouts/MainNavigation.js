import { Flex, Heading } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import SignedOutNavigation from "./Navigation/SignedOutNavigation"
import SignedInNavigation from "./Navigation/SignedInNavigation"
import { NavigationSkeleton } from "../Skeleton/Skeletons"
import { updateProfileState } from "../../store/actions/authActions"
import { useEffect } from "react"

const MainNavigation = () => {
  console.count("rendered main navigation")
  const dispatch = useDispatch()
  const location = useLocation()
  
  const getState = useSelector((state)=> state)
console.log('getState: ', getState)
  const auth = useSelector((state)=> state.firebase.auth)

  const profile = useSelector(state=> state.firebase.profile)
  const {firstName,initials,lastName,phoneNumber,userType} = profile

  const userProfile = {firstName,initials,lastName,phoneNumber,userType}

  console.log('auth.uid: ', auth.uid)
  console.log('profile.firstName: ', profile.firstName)
  useEffect(()=> {
    if (profile.firstName) console.log('dispatched in component', auth.isLoaded)
    if (profile.firstName) {
      dispatch(updateProfileState(userProfile))
    }
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