import { Container } from '@chakra-ui/react'
import React from 'react'
import HeroSection from '../components/Home/HeroSection/HeroSection'
import Content from '../components/Home/Content'


const Home = () => {
  const containerStyle = {
    maxW: "1440px",
    px: 0,
  }
  return (
    <Container sx={containerStyle} tabIndex={0}>
      <HeroSection />
      <Content />
    </Container>
  )
}

export default Home