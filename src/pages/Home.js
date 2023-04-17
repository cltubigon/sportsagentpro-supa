import { Container } from '@chakra-ui/react'
import React from 'react'
import NavigationBar from '../components/layouts/NavigationBar'
import HeroSection from '../components/layouts/HeroSection'
import Content from '../components/layouts/Content'

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
      <HeroSection />
      <Content />
    </Container>
  )
}

export default Home