import React from "react"
import { Flex } from "@chakra-ui/react"
import ProfileAthleteLeftNav from "./Content/ProfileAthleteLeftNav"
import ProfileAthleteMiddleContent from "./Content/ProfileAthleteMiddleContent"
import ProfileAthleteRightContent from "./Content/ProfileAthleteRightContent"
import useGetMultiColumnData from "../../../hooks/useGetMultiColumnData"
import { useSelector } from "react-redux"
import ProfileBrandMiddleContent from "./ProfileBrandMiddleContent"

const ProfileAthleteContent = () => {
  const id = useSelector((state) => state.auth.user?.id)
  const userType = useSelector((state) => state.auth.user?.userType)
  const { data, isLoading } = useGetMultiColumnData({
    key: ["profileInformation", id],
    from: "users",
    select:
      userType === "athlete"
        ? "firstName, lastName, which_best_describes_you, gender_identity, current_team, sport, identifiers_interests, language, ethnicity, bio, current_location, hometown, position, previous_teams, leagues_conferences, athletic_accolades, experience, discipline"
        : userType === "brand" &&
          "firstName, lastName, which_best_describes_you, gender_identity, current_team, sport, brand_category",
    eqColumn: "uid",
    eqValue: id,
  })
  return (
    <Flex gap={6} boxSizing="border-box" pr={6}>
      <ProfileAthleteLeftNav />
      {userType === "athlete" && (
        <ProfileAthleteMiddleContent data={data} isLoading={isLoading} />
      )}
      {userType === "brand" && (
        <ProfileBrandMiddleContent data={data} isLoading={isLoading} />
      )}
      <ProfileAthleteRightContent />
    </Flex>
  )
}

export default ProfileAthleteContent
