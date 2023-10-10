import { Flex, Icon, Text, Textarea } from "@chakra-ui/react"
import React from "react"
import { GrContactInfo } from "react-icons/gr"
import MultiSelectInputHook from "./Inputs/MultiSelectInputHook"
import {
  listEthnicity,
  listInterests,
  listLanguages,
} from "./Inputs/listOfArrays"
import { useState } from "react"

const ProfileAthleteLocation = () => {
  const [interests, setinterests] = useState(null)
  const [language, setlanguage] = useState(null)
  const [ethnicity, setethnicity] = useState(null)
  const defaultValues = []
  return (
    <Flex color={"gray.800"} flexDirection={"column"} gap={4}>
      <Flex flexDirection={"column"}>
        <Flex alignItems={"center"} gap={3}>
          <Icon as={GrContactInfo} boxSize={6} />
          <Text fontWeight={"semibold"}>Locations</Text>
        </Flex>
      </Flex>
      <Flex flexDirection={"column"} w={"100%"}>
        <Text mb={1}>Identifiers / Interests</Text>
        <MultiSelectInputHook
          dropList={listInterests}
          defaultValues={defaultValues}
          selectedValues={interests}
          onClick={(option) => {
            setinterests(option)
          }}
        />
      </Flex>
      <Flex flexDirection={"column"} w={"100%"}>
        <Text mb={1}>Language</Text>
        <MultiSelectInputHook
          dropList={listLanguages}
          defaultValues={defaultValues}
          selectedValues={language}
          onClick={(option) => {
            setlanguage(option)
          }}
        />
      </Flex>
      <Flex flexDirection={"column"} w={"100%"}>
        <Text mb={1}>Ethnicity</Text>
        <MultiSelectInputHook
          dropList={listEthnicity}
          defaultValues={defaultValues}
          selectedValues={ethnicity}
          onClick={(option) => {
            setethnicity(option)
          }}
        />
      </Flex>
    </Flex>
  )
}

export default ProfileAthleteLocation
