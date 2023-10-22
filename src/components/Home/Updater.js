/* eslint-disable no-loop-func */
import React from "react"
import useItemQueryDataUpdater from "../../hooks/useItemQueryDataUpdater"
import { Flex, Text } from "@chakra-ui/react"
import supabase from "../../config/supabaseClient"
import { generateBlurImage } from "../../utils/Blurhash/generateBlurImage"
import { useState } from "react"
import { useTemporaryMutateMultiplePictures } from "../../hooks/imageHooks/temporaryMutateMultiplePictures"
import Mutator from "./Mutator"
import { useSelector } from "react-redux"

const Updater = () => {
  console.count("updater triggered")
  // const userID = "fbb739e3-51db-4b08-96a5-33048bbfee46"
  // const uid = "d58614c5-e2be-40ec-8863-14ce7458a552"
  const query = {
    key: `updater`,
    from: "users",
    select: "*,images(profile_picture, gallery)",
    eqColumn: "userType",
    eqValue: "brand",
    // uid: uid,
  }
  const { data: athletes } = useItemQueryDataUpdater(query)
  const listofAthletes = athletes?.map(groupOfAthlete => groupOfAthlete)
  const images = listofAthletes?.map(athlete => athlete.images)
  console.log({ images, listofAthletes, athletes })

  return (
    <>
      <Flex pt={"88px"}>
        <Text>Updater</Text>
        <Mutator images={images} query={query} listofAthletes={listofAthletes} />
      </Flex>
    </>
  )
}

export default Updater
