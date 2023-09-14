import React from "react"
import { useSelector } from "react-redux"
import BrandOpportunities from "./BrandOpportunities"
import AthleteOpportunities from "./AthleteOpportunities"

const OpportunitiesContent = () => {
  const profile = useSelector((state) => state.auth.profile)
  const userType = profile && profile.userType
  return (
    <>
      {userType && userType === "athlete" && <AthleteOpportunities />}
      {userType && userType === 'brand' && <BrandOpportunities />}
      {/* <BrandOpportunities /> */}
    </>
  )
}

export default OpportunitiesContent
