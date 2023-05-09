import {
  Container,
  Heading,
  Box,
} from '@chakra-ui/react'
import { useState } from 'react'
import UserType from '../components/SignupForm/UserType'
import StepTwoInputFields from '../components/SignupForm/StepTwoInputFields'
import { Link } from 'react-router-dom'
import Footer from '../components/layouts/Footer'

const SignupForm = ()=> {
  console.count('rendered signup page')
  const [userType, setUserType] = useState(null)
  const [oneTwoToggle, setOneTwoToggle] = useState(false)
    
  const containerStyle = {
    maxW: "500px",
    p: 6,
    my: 10,
    border: "1px solid #B8BFC5",
    borderRadius: "8px",
    boxShadow: 'md'
  }
  return (
    <>
      <Box justifyContent={'center'} textAlign={'center'} pt={'50px'}>
        <Heading><Link to={'/'}>Sports Agent Pro</Link></Heading>
      </Box>
      <Container sx={containerStyle}>
        
        <UserType setUserType={setUserType} userType={userType} setOneTwoToggle={setOneTwoToggle} oneTwoToggle={oneTwoToggle} />

        <StepTwoInputFields userType={userType} setOneTwoToggle={setOneTwoToggle} oneTwoToggle={oneTwoToggle} />
      </Container>
      <Footer />
    </>
  )
}

export default SignupForm