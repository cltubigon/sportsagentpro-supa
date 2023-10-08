import React from "react"
import { useSelector } from "react-redux"
import BrandOpportunities from "./BrandOpportunities"
import AthleteOpportunities from "./AthleteOpportunities"

const OpportunitiesContent = ({ scrollToTop }) => {
  const user = useSelector((state) => state.auth.user)
  return (
    <>
      {user && user.userType === "athlete" && (
        <AthleteOpportunities scrollToTop={scrollToTop} />
      )}
      {user && user.userType === "brand" && (
        <BrandOpportunities scrollToTop={scrollToTop} />
      )}
      {/* <BrandOpportunities /> */}
    </>
  )
}

export default OpportunitiesContent
