import { Container, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import NavigationBar from '../layouts/NavigationBar'
import ContentArea from '../layouts/ContentArea'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupCard from './Login'

const Home = () => {
  const containerStyle = {
    maxW: "1440px",
    h: "100vh",
    bg: "gray.100",
    px: 0,
  }
  return (
    <Container sx={containerStyle}>
      <NavigationBar/>
      <ContentArea />
    </Container>
  )
}

export default Home