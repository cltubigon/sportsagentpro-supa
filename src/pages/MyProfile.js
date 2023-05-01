import { Button, Container, Heading } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { incrementIt } from "../store/actions/Increment"

const MyProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const uid = useSelector((state)=> state.firebase.auth.uid)
  const value = useSelector((state) => state.auth.incrementThis);
  
  const containerStyle = {
    maxW: "1440px", 
    px: 0,
  }

  useEffect(()=> {
    if (!uid) {
      navigate('/')
    }
  },[uid])
  return (
    <>
      <Container sx={containerStyle}>
        <Heading>Number is: {value}</Heading>
        <Button onClick={()=> dispatch(incrementIt())}>Increment</Button>
      </Container>
    </>
  )
}

export default MyProfile