import { Button, Flex, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { GoFileMedia } from "react-icons/go"
import PopupUploadImage from "./Content/PopupUploadImage"
import { useState } from "react"

const ProfileAthleteMedia = () => {
    const [popup, setpopup] = useState(false)
    // const popup = useSelector(state => state.utils.popup)
    console.log({ popup })

    const handleClick = () => {
        setpopup(prev => !prev)
    }
  return (
    <>
      <Flex
        alignItems={"center"}
        gap={3}
        borderBottom={"1px solid #ccc"}
        pb={4}
      >
        <Icon as={GoFileMedia} boxSize={6} />
        <Text fontWeight={"semibold"}>Media</Text>
      </Flex>
      <Flex flexDirection={"column"}>
        <Text fontWeight={"semibold"}>Featured photos</Text>
        <Text fontSize={"sm"}>
          Showcase additional visuals about you by uploading at least 4 photos.
        </Text>
      </Flex>
      {popup && <PopupUploadImage setpopup={setpopup} />}
      <Button border={"1px solid #1DA1F2"} onClick={handleClick}>Add photos</Button>
    </>
  )
}

export default ProfileAthleteMedia
