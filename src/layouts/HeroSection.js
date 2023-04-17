import React from 'react'
import TitleSection from '../components/HeroSection/TitleSection'
import QuickAccess from '../components/HeroSection/QuickAccess'

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