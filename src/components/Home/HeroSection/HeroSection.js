import React from 'react'
import TitleSection from './QuickAccess/TitleSection'
import QuickAccess from './QuickAccess/QuickAccess'
import SubNavigation from './QuickAccess/SubNavigation'

const HeroSection = () => {
  console.log("HeroSection")
  return (
    <>
      <SubNavigation/>
      <TitleSection/>
      <QuickAccess/>
    </>
  )
}

export default HeroSection