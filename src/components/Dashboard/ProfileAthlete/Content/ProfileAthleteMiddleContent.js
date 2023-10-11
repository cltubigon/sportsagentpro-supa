import { Flex } from "@chakra-ui/react"
import React from "react"
import ProfilePictureSection from "./ProfilePictureSection"
import ProfileAthleteBasicInformation from "./ProfileAthleteBasicInformation"
import ProfileAthleteAboutYou from "./ProfileAthleteAboutYou"
import ProfileAthleteLocation from "./ProfileAthleteLocation"
import GoogleMapAutoComplete from "./GoogleMapAutoComplete/GoogleMapAutoComplete"

const ProfileAthleteMiddleContent = () => {
  console.log('middle content generated')

  return (
    <Flex flexGrow={1} flexDirection={"column"} gap={10} maxW={"875px"} pb={'200px'}>
      <ProfilePictureSection />
      <ProfileAthleteBasicInformation />
      <ProfileAthleteAboutYou />
      <ProfileAthleteLocation />
      <GoogleMapAutoComplete />
    </Flex>
  )
}

export default ProfileAthleteMiddleContent
