import { Flex, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { IoLocationOutline } from "react-icons/io5"
import MultiSelectInputHook from "./Inputs/MultiSelectInputHook"
import { useState } from "react"
import GoogleMapAutoComplete from "./GoogleMapAutoComplete/GoogleMapAutoComplete"

const ProfileAthleteLocation = () => {
  const [locationValue, setlocationValue] = useState(null)
  const defaultLocation = ""

  console.log({ locationValue })
  return (
    <Flex color={"gray.800"} flexDirection={"column"} gap={4}>
      <Flex flexDirection={"column"}>
        <Flex alignItems={"center"} gap={3}>
          <Icon as={IoLocationOutline} boxSize={6} />
          <Text fontWeight={"semibold"}>Locations</Text>
        </Flex>
      </Flex>
      <Flex flexDirection={"column"} w={"100%"}>
        <Text mb={1}>Ethnicity</Text>
        {/* <MultiSelectInputHook
          // dropList={listEthnicity}
          defaultValue={defaultLocation}
          selectedValues={locationValue}
          onChange={(option) => {
            console.log({ option })
            setlocationValue(option)
          }}
        /> */}
        <GoogleMapAutoComplete
          defaultValue="Default Value"
          onSelect={(selectedValue, coordinates) => {
            // Handle the selected value and coordinates here
            console.log("Selected Value:", selectedValue)
            console.log("Coordinates:", coordinates)
          }}
        />
      </Flex>
    </Flex>
  )
}

export default ProfileAthleteLocation
