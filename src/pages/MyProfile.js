import { Container, Heading } from "@chakra-ui/react"
import React from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"

const MyProfile = ({ auth }) => {
    const navigate = useNavigate()
    if (!auth.uid) return navigate("/login")
  const containerStyle = {
    maxW: "1440px",
    px: 0,
  }
  return (
    <>
      <Container sx={containerStyle}>
        <Heading>My Profile</Heading>
      </Container>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(MyProfile)
