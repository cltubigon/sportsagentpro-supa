/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import ProfileSubNavigation from "./ProfileSubNavigation"
import ProfileGallery from "./ProfileGallery"
import ProfileContent from "./ProfileContent"
import useItemQueryData from "../../hooks/useItemQueryData"
import { useParams } from "react-router-dom"
// import { fetchSelectedAthlete } from "../../store/actions/Fetch/fetchAthletesAction"

const Profile = () => {
  const params = useParams()

  const { data, isLoading, isError, error } = useItemQueryData({
    key: "athlete",
    mainKey: 'athletes',
    from: "users",
    eqColumn: "id",
    eqValue: params.id,
  })
  const query = { data, isLoading, isError, error }
  console.log({ data })
  return (
    <>
      <ProfileSubNavigation />
      <ProfileGallery />
      <ProfileContent query={query} />
    </>
  )
}

export default Profile
