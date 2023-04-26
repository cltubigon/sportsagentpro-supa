import { Flex, Heading, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import SignedOutNavigation from "./Navigation/SignedOutNavigation"
import SignedInNavigation from "./Navigation/SignedInNavigation"
import { NavigationSkeleton } from "../Skeleton/Skeletons"
import { isLoaded } from "react-redux-firebase"


const MainNavigation = ({auth}) => {
  console.log("MainNavigation")

    const flexContainer = {
        px: "var(--chakra-space-4)",
        color: "white",
        justifyContent: "space-between",
        bg: "blue.800",
        py: "20px",
    }
  return (
    <>
      <Flex sx={flexContainer}>
        <Flex alignItems={"center"}>
        <Heading as={"h3"} fontSize={"3xl"}>
            <Link to="/">Sports Agent Pros</Link>
        </Heading>
        </Flex>
        {auth.isLoaded ? <Flex>
            {auth.uid ? <SignedInNavigation /> : <SignedOutNavigation />}
        </Flex>
        :
        <NavigationSkeleton />
        }
      </Flex>
    </>
  )
}
  
const mapStateToProps = (state)=> {
  return {
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(MainNavigation)