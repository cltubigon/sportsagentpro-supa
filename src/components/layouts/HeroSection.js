import React from 'react'
import TitleSection from '../HeroSection/QuickAccess/TitleSection'
import QuickAccess from '../HeroSection/QuickAccess/QuickAccess'
import SubNavigation from '../HeroSection/QuickAccess/SubNavigation'

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