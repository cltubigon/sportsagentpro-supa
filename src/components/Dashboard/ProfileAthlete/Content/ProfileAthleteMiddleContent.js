import { Flex } from "@chakra-ui/react"
import React from "react"
import ProfilePictureSection from "./ProfilePictureSection"
import ProfileAthleteBasicInformation from "./ProfileAthleteBasicInformation"
import ProfileAthleteAboutYou from "./ProfileAthleteAboutYou"
import ProfileAthleteLocation from "./ProfileAthleteLocation"

const ProfileAthleteMiddleContent = () => {

  return (
    <Flex flexGrow={1} flexDirection={"column"} gap={10} maxW={"875px"} pb={'200px'}>
      <ProfilePictureSection />
      <ProfileAthleteBasicInformation />
      <ProfileAthleteAboutYou />
      <ProfileAthleteLocation />
    </Flex>
  )
}

export default ProfileAthleteMiddleContent
