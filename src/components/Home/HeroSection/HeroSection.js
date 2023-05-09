import React from 'react'
import TitleSection from './QuickAccess/TitleSection'
import QuickAccess from './QuickAccess/QuickAccess'
import SubNavigation from './QuickAccess/SubNavigation'
import { Box } from '@chakra-ui/react'

const HeroSection = () => {
  console.log("HeroSection")
  return (
    <Box>
      <SubNavigation/>
      <TitleSection/>
      <QuickAccess/>
    </Box>
  )
}

export default HeroSection