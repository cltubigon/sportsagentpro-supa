import React from "react"
import { useSelector } from "react-redux"
import AthleteOpportunities from "./AthleteOpportunities"
import BrandOpportunities from "./BrandOpportunities"

const OpportunitiesContent = ({ scrollToTop }) => {
  const user = useSelector((state) => state.auth.user)
  return (
    <>
      {user && user.userType === "athlete" && <AthleteOpportunities />}
      {user && user.userType === "brand" && (
        <BrandOpportunities scrollToTop={scrollToTop} />
      )}
      {/* <BrandOpportunities /> */}
    </>
  )
}

export default OpportunitiesContent
