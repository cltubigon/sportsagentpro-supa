import { Flex, Icon, Input, Skeleton, Text, useToast } from "@chakra-ui/react"
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
import useGetMultiColumnData from "../../../../hooks/useGetMultiColumnData"
import { useSelector } from "react-redux"

const ProfileAthleteBasicInformation = () => {
  const user = useSelector((state) => state.auth.user)
  const toast = useToast()
  const [whichBestDescribesYou, setwhichBestDescribesYou] = useState(null)
  const [genderIdentity, setgenderIdentity] = useState(null)
  const [currentTeam, setcurrentTeam] = useState([])
  const [sports, setsports] = useState([])

  console.log({ sports, currentTeam })

  const { data, isLoading, isError, error } = useGetMultiColumnData({
    key: "basicInformation",
    from: "users",
    select:
      "firstName, lastName, which_best_describes_you, gender_identity, current_team, sport",
    eqColumn: "id",
    eqValue: user?.userID,
  })

  if (isError) {
    toast({
      title: ` Something went wrong`,
      description: error.message,
      status: ` error`,
      duration: 3000,
      isClosable: true,
      position: `top-right`,
    })
  }

  const defaultUserQuery = {
    from: "users",
    eqColumn: "id",
    eqValue: user?.userID,
  }

  const mutateWhichBestDescribesYou = {
    ...defaultUserQuery,
    updateColumn: "which_best_describes_you",
  }
  const mutateGenderIdentity = {
    ...defaultUserQuery,
    updateColumn: "gender_identity",
  }
  const mutateSport = {
    ...defaultUserQuery,
    updateColumn: "sport",
  }
  const mutateCurrentTeam = {
    ...defaultUserQuery,
    updateColumn: "current_team",
  }
  // const mutateFirstName = {
  //   ...defaultUserQuery,
  //   updateColumn: "firstName",
  // }
  // const mutateLastName = {
  //   ...defaultUserQuery,
  //   updateColumn: "lastName",
  // }

  return (
    <Flex color={"gray.800"} flexDirection={"column"} gap={4}>
      <Flex alignItems={"center"} gap={3}>
        <Icon as={RiProfileLine} boxSize={6} />
        <Text fontWeight={"semibold"}>Basic info</Text>
      </Flex>

      <Flex gap={4}>
        <Flex flexDirection={"column"} w={"100%"}>
          {!isLoading ? (
            <InputField
            // query={mutateFirstName}
              data={data[0]?.firstName}
              label={"First name"}
              isRequired={true}
            />
          ) : (
            <SkeletonInput label={"First name"} isRequired={true} />
          )}
        </Flex>
        <Flex flexDirection={"column"} w={"100%"}>
          {!isLoading ? (
            <InputField
            // query={mutateLastName}
              data={data[0]?.lastName}
              label={"Last name"}
              isRequired={true}
            />
          ) : (
            <SkeletonInput label={"Last name"} isRequired={true} />
          )}
        </Flex>
      </Flex>

      {!isLoading ? (
        <SelectInput
          query={mutateWhichBestDescribesYou}
          label={"Which Best Describes You"}
          data={data[0]?.which_best_describes_you}
          value={whichBestDescribesYou}
          setValue={setwhichBestDescribesYou}
          arrayLists={listWhichBestDescribesYou}
          isRequired={false}
        />
      ) : (
        <SkeletonInput label={"Which Best Describes You"} isRequired={false} />
      )}

      {!isLoading ? (
        <SelectInput
        query={mutateGenderIdentity}
          label={"Gender Identity"}
          data={data[0]?.gender_identity}
          value={genderIdentity}
          setValue={setgenderIdentity}
          arrayLists={listGenderIdentities}
          isRequired={false}
        />
      ) : (
        <SkeletonInput label={"Gender Identity"} isRequired={false} />
      )}

      {!isLoading ? (
        <MultiSelectInput
        query={mutateSport}
          label={"Sport"}
          data={data[0]?.sport}
          value={sports}
          setValue={setsports}
          arrayLists={listSports}
          isRequired={false}
        />
      ) : (
        <SkeletonInput label={"Sport"} isRequired={false} />
      )}

      {!isLoading ? (
        <MultiSelectInput
        query={mutateCurrentTeam}
          label={"Current Team"}
          data={data[0]?.current_team}
          value={currentTeam}
          setValue={setcurrentTeam}
          arrayLists={listCurrentTeam}
          isRequired={false}
        />
      ) : (
        <SkeletonInput label={"Current Team"} isRequired={false} />
      )}
    </Flex>
  )
}

const InputField = (props) => {
  const { data, label, isRequired } = props
  return (
    <>
      <Text mb={1}>
        {isRequired && <span style={{ color: "red" }}>*</span>} {label}
      </Text>
      <Input
        h={"40px"}
        border={"1px solid #ccc"}
        defaultValue={data}
        type="input"
        placeholder={label}
      />
    </>
  )
}

const MultiSelectInput = (props) => {
  const { query, label, data, value, setValue, arrayLists, isRequired } = props
  return (
    <Flex flexDirection={"column"} w={"100%"}>
      <Text mb={1}>
        {isRequired && <span style={{ color: "red" }}>*</span>} {label}
      </Text>
      <MultiSelectInputHook
      query={query}
        value={value}
        setValue={setValue}
        initialValue={data}
        arrayLists={arrayLists}
      />
    </Flex>
  )
}
const SelectInput = (props) => {
  const { query, label, data, value, setValue, arrayLists, isRequired } = props
  return (
    <Flex flexDirection={"column"} w={"100%"}>
      <Text mb={1}>
        {isRequired && <span style={{ color: "red" }}>*</span>} {label}
      </Text>
      <SelectInputHook
        query={query}
        value={value}
        setValue={setValue}
        initialValue={data}
        arrayLists={arrayLists}
      />
    </Flex>
  )
}

const SkeletonInput = ({ label, isRequired }) => {
  return (
    <Flex flexDirection={"column"} w={"100%"}>
      <Text mb={1}>
        {isRequired && <span style={{ color: "red" }}>*</span>} {label}
      </Text>
      <Skeleton
        borderRadius={"md"}
        border={"1px solid #000"}
        startColor="#d9d9d9"
        endColor="#ededed"
        w={"100%"}
        h={"40px"}
      />
    </Flex>
  )
}

export default ProfileAthleteBasicInformation
