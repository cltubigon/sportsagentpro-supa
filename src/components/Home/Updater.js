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
  console.count('updater triggered')
    const userID = useSelector(state => state.auth.user?.userID)
    const uid = useSelector(state => state.auth.user?.userID)
  const query = {
    key: `update-${userID}`,
    from: "images",
    select: "gallery",
    eqColumn: "userID",
    eqValue: userID,
    uid: uid,
  }
  const {
    data: images,
  } = useItemQueryDataUpdater(query)
  console.log({ images })
  return (
    <>
      <Flex pt={"88px"}>
        <Text>Updater</Text>
        <Mutator userID={userID} images={images} query={query} />
      </Flex>
    </>
  )
}

export default Updater
