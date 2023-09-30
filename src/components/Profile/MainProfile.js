/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import ProfileSubNavigation from "./ProfileSubNavigation"
import ProfileGallery from "./ProfileGallery"
import ProfileContent from "./ProfileContent"
// import { fetchSelectedAthlete } from "../../store/actions/Fetch/fetchAthletesAction"

const Profile = () => {
  console.count("MainProfile is rendered")
  return (
    <>
      <ProfileSubNavigation />
      <ProfileGallery />
      <ProfileContent />
    </>
  )
}

export default Profile
