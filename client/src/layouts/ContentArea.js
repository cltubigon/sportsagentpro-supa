import { Container, Flex, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import HeroSection from '../components/ContentArea/HeroSection'
import QuickAccess from '../components/ContentArea/QuickAccess'

const ContentArea = () => {
  return (
    <>
        <Container bg={"blue.800"} maxW={"1440px"} p={"0"} >
            <Flex px={"var(--chakra-space-4)"}>
                <HeroSection/>
            </Flex>
        </Container>
        <Container maxW={"1440px"} py={"30px"}>
                <QuickAccess/>
        </Container>
    </>
  )
}

export default ContentArea
