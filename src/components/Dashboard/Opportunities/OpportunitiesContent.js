import React from "react"
import { useSelector } from "react-redux"
import AthleteOpportunities from "./AthleteOpportunities"
import BrandOpportunities from "./BrandOpportunities"

const OpportunitiesContent = ({ clientHeight, clientWidth }) => {
  const user = useSelector((state) => state.auth.user)
  return (
    <>
      {user && user.userType === "athlete" && <AthleteOpportunities  clientWidth={clientWidth} clientHeight={clientHeight} />}
      {user && user.userType === "brand" && <BrandOpportunities  clientWidth={clientWidth} clientHeight={clientHeight} />}
      {/* <BrandOpportunities /> */}
    </>
  )
}

export default OpportunitiesContent
