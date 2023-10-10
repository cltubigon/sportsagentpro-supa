import React from "react"
import { Flex } from "@chakra-ui/react"
import ProfileAthleteLeftNav from "./Content/ProfileAthleteLeftNav"
import ProfileAthleteMiddleContent from "./Content/ProfileAthleteMiddleContent"
import ProfileAthleteRightContent from "./Content/ProfileAthleteRightContent"

const ProfileAthleteContent = () => {
  return (
    <Flex gap={6} boxSizing="border-box" pr={6}>
      <ProfileAthleteLeftNav />
      <ProfileAthleteMiddleContent />
      <ProfileAthleteRightContent />
    </Flex>
  )
}

export default ProfileAthleteContent