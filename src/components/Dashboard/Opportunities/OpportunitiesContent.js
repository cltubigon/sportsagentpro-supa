import React from "react"
import { useSelector } from "react-redux"
import BrandOpportunities from "./BrandOpportunities"
import AthleteOpportunities from "./AthleteOpportunities"

const OpportunitiesContent = () => {
  const user = useSelector((state) => state.auth.user)
  return (
    <>
      {user && user.userType === "athlete" && <AthleteOpportunities />}
      {user && user.userType === 'brand' && <BrandOpportunities />}
      {/* <BrandOpportunities /> */}
    </>
  )
}

export default OpportunitiesContent