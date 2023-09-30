/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import ProfileSubNavigation from "./ProfileSubNavigation"
import ProfileGallery from "./ProfileGallery"
import ProfileContent from "./ProfileContent"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { fetchSelectedAthlete } from "../../store/actions/Fetch/fetchAthletesAction"

const Profile = () => {
  console.count("MainProfile is rendered")
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSelectedAthlete("athlete", "id", id))
  }, [])

  return (
    <>
      <ProfileSubNavigation />
      <ProfileGallery />
      <ProfileContent />
    </>
  )
}

export default Profile
