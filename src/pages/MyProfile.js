import { Button, Container, Heading } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Footer from "../components/layouts/Footer"

const MyProfile = () => {
  const navigate = useNavigate()

  // const uid = useSelector((state)=> state.firebase.auth.uid)
  const isLoggedIn = useSelector(state => state.auth.profile)
  
  const containerStyle = {
    maxW: "1440px", 
    px: 0,
  }

  useEffect(()=> {
    if (!isLoggedIn) {
      navigate('/login')
    }
  },[])
  return (
    <>
      <Container sx={containerStyle}>
        <Button>Increment</Button>
      </Container>
      <Footer />
    </>
  )
}

export default MyProfile