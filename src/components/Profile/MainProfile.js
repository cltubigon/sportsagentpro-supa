/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import ProfileSubNavigation from "./ProfileSubNavigation"
import ProfileContent from "./ProfileContent"
import useItemQueryData from "../../hooks/useItemQueryData"
import { useParams } from "react-router-dom"
import ProfileGallery from "./GalleryPreview/ProfileGallery"
// import { fetchSelectedAthlete } from "../../store/actions/Fetch/fetchAthletesAction"

const Profile = () => {
  const params = useParams()

  const { data, isLoading, isError, error } = useItemQueryData({
    key: "athlete",
    mainKey: 'athletes',
    from: "users",
    select: "*, images(profile_picture, gallery)",
    eqColumn: "id",
    eqValue: params.id,
  })
  console.log('params.id', params.id)
  const query = { data, isLoading, isError, error }
  console.log({ data })
  return (
    <>
      <ProfileSubNavigation />
      <ProfileGallery query={query} />
      <ProfileContent query={query} />
    </>
  )
}

export default Profile
