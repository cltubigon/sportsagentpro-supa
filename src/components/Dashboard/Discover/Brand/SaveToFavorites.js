import { Box, Icon } from "@chakra-ui/react"
import React from "react"
import { BsHeart } from "react-icons/bs"

const SaveToFavoritesAthleteType = () => {
  const handleClick = () => {
    console.log("save to favorites")
  }
  const IconContainer = {
    px: 3,
    zIndex: "1",
    alignContent: "flex-end",
    w: "100%",
    textAlign: "right",
    color: "#f8f8f8",
  }
  return (
    <Box sx={IconContainer} onClick={handleClick}>
      <Icon as={BsHeart} boxSize={4} />
    </Box>
  )
}

export default SaveToFavoritesAthleteType
