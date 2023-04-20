import React from 'react'
import TitleSection from '../HeroSection/TitleSection'
import QuickAccess from '../HeroSection/QuickAccess'
import SubNavigation from '../HeroSection/SubNavigation'

const HeroSection = () => {
  console.log("Content area rendered")
  return (
    <>
      <SubNavigation/>
      <TitleSection/>
      <QuickAccess/>
    </>
  )
}

export default HeroSection