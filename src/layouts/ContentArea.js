import { Container, Flex, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import HeroSection from '../components/ContentArea/HeroSection'
import QuickAccess from '../components/ContentArea/QuickAccess'

const ContentArea = () => {
  console.log("Content area rendered")
  return (
    <>
      <HeroSection/>
      <QuickAccess/>
    </>
  )
}

export default ContentArea