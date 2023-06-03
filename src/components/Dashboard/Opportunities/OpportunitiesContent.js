import React from "react"
import { useSelector } from "react-redux"
import AthleteOpportunities from "./AthleteOpportunities"
import BrandOpportunities from "./BrandOpportunities"

const OpportunitiesContent = () => {
  const auth = useSelector((state) => state.auth)
  const { profile } = auth
  const userType = profile && profile.userType
  return (
    <>
      {userType && userType === "athlete" && <AthleteOpportunities />}
      {userType && userType === 'brand' && <BrandOpportunities />}
    </>
  )
}

export default OpportunitiesContent
