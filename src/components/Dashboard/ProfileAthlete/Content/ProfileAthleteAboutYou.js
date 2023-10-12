import {
  Flex,
  Icon,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react"
import React from "react"
import { GrContactInfo } from "react-icons/gr"
import MultiSelectInputHook from "./Inputs/MultiSelectInputHook"
import {
  listEthnicity,
  listInterests,
  listLanguages,
} from "./Inputs/listOfArrays"
import { useState } from "react"
import useGetMultiColumnData from "../../../../hooks/useGetMultiColumnData"
import { useSelector } from "react-redux"
import TextAreaHook from "./Inputs/TextAreaHook"

const ProfileAthleteAboutYou = () => {
  const toast = useToast()
  const user = useSelector((state) => state.auth.user)
  const [interests, setinterests] = useState([])
  const [language, setlanguage] = useState([])
  const [ethnicity, setethnicity] = useState([])
  const { data, isLoading, isError, error } = useGetMultiColumnData({
    key: "aboutyou",
    from: "users",
    select: "identifiers_interests, language, ethnicity, bio",
    eqColumn: "id",
    eqValue: user?.userID,
  })

  if (isError) {
    toast({
      title: `Something went wrong`,
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

  const mutateIdentifiersInterests = {
    ...defaultUserQuery,
    updateColumn: "identifiers_interests",
  }
  const mutateLanguage = {
    ...defaultUserQuery,
    updateColumn: "language",
  }
  const mutateEthnicity = {
    ...defaultUserQuery,
    updateColumn: "ethnicity",
  }
  const mutateBio = {
    ...defaultUserQuery,
    updateColumn: "bio",
  }

  return (
    <Flex color={"gray.800"} flexDirection={"column"} gap={4}>
      <Flex flexDirection={"column"}>
        <Flex alignItems={"center"} gap={3}>
          <Icon as={GrContactInfo} boxSize={6} />
          <Text fontWeight={"semibold"}>About You</Text>
        </Flex>
        <Text fontSize={"sm"}>
          Get discovered by adding more profile information.
        </Text>
      </Flex>

      {!isLoading ? (
        <TextAreaInput
          query={mutateBio}
          initialValue={""}
          data={data[0]?.bio}
          isRequired={false}
          label={"Bio"}
          description={
            "Tell others more about you. Consider linking websites, charities, or articles."
          }
        />
      ) : (
        <SkeletonTextArea
          isRequired={false}
          label={"Bio"}
          description={
            "Tell others more about you. Consider linking websites, charities, or articles."
          }
        />
      )}

      {!isLoading ? (
        <MultiSelectInput
          query={mutateIdentifiersInterests}
          label={"Identifiers / Interests"}
          data={data[0]?.identifiers_interests}
          value={interests}
          setValue={setinterests}
          arrayLists={listInterests}
          isRequired={false}
        />
      ) : (
        <SkeletonInput label={"Identifiers / Interests"} isRequired={false} />
      )}

      {!isLoading ? (
        <MultiSelectInput
          query={mutateLanguage}
          label={"Language"}
          data={data[0]?.language}
          value={language}
          setValue={setlanguage}
          arrayLists={listLanguages}
          isRequired={false}
        />
      ) : (
        <SkeletonInput label={"Language"} isRequired={false} />
      )}

      {!isLoading ? (
        <MultiSelectInput
          query={mutateEthnicity}
          label={"Ethnicity"}
          data={data[0]?.ethnicity}
          value={ethnicity}
          setValue={setethnicity}
          arrayLists={listEthnicity}
          isRequired={false}
        />
      ) : (
        <SkeletonInput label={"Ethnicity"} isRequired={false} />
      )}
    </Flex>
  )
}

const TextAreaInput = (props) => {
  const { query, data, label, description, isRequired } = props
  return (
    <Flex flexDirection={"column"}>
      <Text fontWeight={"semibold"}>
        {isRequired && <span style={{ color: "red" }}>*</span>} {label}
      </Text>
      <Text mb={2} fontSize={"sm"}>
        {description}
      </Text>
      <TextAreaHook initialValue={data} query={query} />
    </Flex>
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
const SkeletonTextArea = ({ label, isRequired, description }) => {
  return (
    <Flex flexDirection={"column"} w={"100%"}>
      <Text>
        {isRequired && <span style={{ color: "red" }}>*</span>} {label}
      </Text>
      <Text mb={2} fontSize={"sm"}>
        {description}
      </Text>
      <Skeleton
        borderRadius={"md"}
        border={"1px solid #000"}
        startColor="#d9d9d9"
        endColor="#ededed"
        w={"100%"}
        h={"145px"}
      />
    </Flex>
  )
}

export default ProfileAthleteAboutYou
