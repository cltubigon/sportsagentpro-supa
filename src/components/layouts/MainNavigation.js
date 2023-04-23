import { Avatar, Flex, Heading, Text } from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import SignedOutNavigation from "./Navigation/SignedOutNavigation"
import SignedInNavigation from "./Navigation/SignedInNavigation"


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
    <Flex sx={flexContainer}>
        <Flex alignItems={"center"}>
        <Heading as={"h3"} fontSize={"3xl"}>
            <Link to="/">Sports Agent Pros</Link>
        </Heading>
        </Flex>
        <Flex>
            {auth.uid ? <SignedInNavigation /> : <SignedOutNavigation />}
        </Flex>
  </Flex>
  )
}

const mapStateToProps = (state)=> {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(MainNavigation)