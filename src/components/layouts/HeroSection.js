import React from 'react'
import TitleSection from '../HeroSection/TitleSection'
import QuickAccess from '../HeroSection/QuickAccess'

const HeroSection = () => {
  console.log("Content area rendered")
  return (
    <>
      <TitleSection/>
      <QuickAccess/>
    </>
  )
}

export default HeroSection