import React from "react"
import { Container } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import MainProfile from "../components/Profile/MainProfile"
import Footer from "../components/layouts/Footer"

const Profile = () => {
  console.log("Profile rendered")
  const { id } = useParams()
  console.log('id: ', id)
  const containerStyle = {
    maxW: "1440px",
    px: 0,
    pt: "88px",
  }
  return (
    <>
      <Container sx={containerStyle}>
        <MainProfile id={id} />
      </Container>
      <Footer />
    </>
  )
}

export default Profile
