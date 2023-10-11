import { Flex, Icon, Input, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { RiProfileLine } from "react-icons/ri"
import SelectInputHook from "./Inputs/SelectInputHook"
import MultiSelectInputHook from "./Inputs/MultiSelectInputHook"
import {
  listCurrentTeam,
  listGenderIdentities,
  listSports,
  listWhichBestDescribesYou,
} from "./Inputs/listOfArrays"

const ProfileAthleteBasicInformation = () => {
  const [whichBestDescribesYou, setwhichBestDescribesYou] = useState(null)
  const [genderIdentity, setgenderIdentity] = useState(null)
  const [currentTeam, setcurrentTeam] = useState([])
  const [sports, setsports] = useState([])
  const defaultValue = null
  const defaultSportsValues = ["Boxing"]
  const defaultTeamValues = ["Golden Eagle"]
  return (
    <Flex color={"gray.800"} flexDirection={"column"} gap={4}>
      <Flex alignItems={"center"} gap={3}>
        <Icon as={RiProfileLine} boxSize={6} />
        <Text fontWeight={"semibold"}>Basic info</Text>
      </Flex>
      <Flex gap={4}>
        <Flex flexDirection={"column"} w={"100%"}>
          <Text mb={1}>
            <span style={{ color: "red" }}>*</span> First name
          </Text>
          <Input
            h={"40px"}
            border={"1px solid #ccc"}
            type="input"
            id="firstName"
            placeholder="First name"
          />
        </Flex>
        <Flex flexDirection={"column"} w={"100%"}>
          <Text mb={1}>
            <span style={{ color: "red" }}>*</span> Last name
          </Text>
          <Input
            h={"40px"}
            border={"1px solid #ccc"}
            type="input"
            id="lastName"
            placeholder="Last name"
          />
        </Flex>
      </Flex>

      <Flex flexDirection={"column"} w={"100%"}>
        <Text mb={1}>
          <span style={{ color: "red" }}>*</span> Which best describes you?
        </Text>
        <SelectInputHook
          value={whichBestDescribesYou}
          setValue={setwhichBestDescribesYou}
          initialValue={defaultValue}
          arrayLists={listWhichBestDescribesYou}
        />
      </Flex>
      <Flex flexDirection={"column"} w={"100%"}>
        <Text mb={1}>Gender identity</Text>
        <SelectInputHook
          value={genderIdentity}
          setValue={setgenderIdentity}
          initialValue={defaultValue}
          arrayLists={listGenderIdentities}
        />
      </Flex>
      <Flex flexDirection={"column"} w={"100%"}>
        <Text mb={1}>Current team</Text>
        <MultiSelectInputHook
          value={currentTeam}
          setValues={setcurrentTeam}
          initialValue={defaultTeamValues}
          arrayLists={listCurrentTeam}
        />
      </Flex>
      <Flex flexDirection={"column"} w={"100%"}>
        <Text mb={1}>Sport</Text>
        <MultiSelectInputHook
          value={sports}
          setValues={setsports}
          initialValue={defaultSportsValues}
          arrayLists={listSports}
        />
      </Flex>
    </Flex>
  )
}

export default ProfileAthleteBasicInformation
