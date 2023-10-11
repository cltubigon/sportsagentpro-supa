import { Flex, Icon, Text, Textarea } from "@chakra-ui/react"
import React from "react"
import { GrContactInfo } from "react-icons/gr"
import MultiSelectInputHook from "./Inputs/MultiSelectInputHook"
import { listEthnicity, listInterests, listLanguages } from "./Inputs/listOfArrays"
import { useState } from "react"

const ProfileAthleteAboutYou = () => {
    const [interests, setinterests] = useState(null)
    const [language, setlanguage] = useState(null)
    const [ethnicity, setethnicity] = useState(null)
    const defaultValues = []
  return (
    <Flex color={"gray.800"} flexDirection={"column"} gap={4}>
      <Flex flexDirection={'column'}>
        <Flex alignItems={"center"} gap={3}>
          <Icon as={GrContactInfo} boxSize={6} />
          <Text fontWeight={"semibold"}>About You</Text>
        </Flex>
        <Text fontSize={'sm'}>Get discovered by adding more profile information.</Text>
      </Flex>
      <Flex flexDirection={'column'}>
          <Text fontWeight={"semibold"}>Bio</Text>
        <Text mb={2} fontSize={'sm'}>Tell others more about you. Consider linking websites, charities, or articles.</Text>
        <Textarea border={"1px solid #ccc"} minH={'148px'} />
      </Flex>
      <Flex flexDirection={"column"} w={"100%"}>
        <Text mb={1}>Identifiers / Interests</Text>
        <MultiSelectInputHook
          arrayLists={listInterests}
          initialValue={defaultValues}
          value={interests}
          setValues={setinterests}
        />
      </Flex>
      <Flex flexDirection={"column"} w={"100%"}>
        <Text mb={1}>Language</Text>
        <MultiSelectInputHook
          arrayLists={listLanguages}
          initialValue={defaultValues}
          value={language}
          setValues={setlanguage}
        />
      </Flex>
      <Flex flexDirection={"column"} w={"100%"}>
        <Text mb={1}>Ethnicity</Text>
        <MultiSelectInputHook
          value={ethnicity}
          setValues={setethnicity}
          initialValue={defaultValues}
          arrayLists={listEthnicity}
        />
      </Flex>
    </Flex>
  )
}

export default ProfileAthleteAboutYou
