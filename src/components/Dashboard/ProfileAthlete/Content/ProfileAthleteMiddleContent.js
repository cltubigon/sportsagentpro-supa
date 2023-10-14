import { Flex, Icon, Input, Skeleton, Text, useToast } from "@chakra-ui/react"
import React, { useState } from "react"
import ProfilePictureSection from "./ProfilePictureSection"
// import ProfileAthleteAboutYou from "./ProfileAthleteAboutYou"
// import ProfileAthleteLocation from "./ProfileAthleteLocation"
// import ProfileAthleticProfile from "./ProfileAthleticProfile"
import { useSelector } from "react-redux"
import useGetMultiColumnData from "../../../../hooks/useGetMultiColumnData"
import SelectInputHook from "./Inputs/SelectInputHook"
import MultiSelectInputHook from "./Inputs/MultiSelectInputHook"
import {
  listAthleticAccolades,
  listCurrentTeam,
  listDiscipline,
  listEthnicity,
  listExperience,
  listGenderIdentities,
  listInterests,
  listLanguages,
  listLeagueConferences,
  listPosition,
  listPreviousTeams,
  listSports,
  listWhichBestDescribesYou,
} from "./Inputs/profileListOfArrays"
import { RiProfileLine } from "react-icons/ri"
import TextAreaHook from "./Inputs/TextAreaHook"
import { GrContactInfo } from "react-icons/gr"
import GoogleMapLocationAutoComplete from "./GoogleMapAutoComplete/GoogleMapAutoCompleteTwo"
import { IoLocationOutline } from "react-icons/io5"
import { BiRun } from "react-icons/bi"

const ProfileAthleteMiddleContent = () => {
  // console.log("middle content generated")
  const user = useSelector((state) => state.auth.user)
  const toast = useToast()
  const [whichBestDescribesYou, setwhichBestDescribesYou] = useState(null)
  const [genderIdentity, setgenderIdentity] = useState(null)
  const [currentTeam, setcurrentTeam] = useState([])
  const [sports, setsports] = useState([])
  const [interests, setinterests] = useState([])
  const [language, setlanguage] = useState([])
  const [ethnicity, setethnicity] = useState([])
  const [position, setposition] = useState([])
  const [previousTeams, setpreviousTeams] = useState([])
  const [leaguesConferences, setleaguesConferences] = useState([])
  const [athleticAccolades, setathleticAccolades] = useState([])
  const [discipline, setdiscipline] = useState([])
  const [experience, setexperience] = useState(null)

  const { data, isLoading, isError, error } = useGetMultiColumnData({
    key: ["profileInformation", user.id],
    from: "users",
    select:
      "firstName, lastName, which_best_describes_you, gender_identity, current_team, sport, identifiers_interests, language, ethnicity, bio, current_location, hometown, position, previous_teams, leagues_conferences, athletic_accolades, experience, discipline",
    eqColumn: "id",
    eqValue: user?.userID,
  })
  // console.log({ data })

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
  const mutateCurrentLocation = {
    ...defaultUserQuery,
    updateColumn: "current_location",
  }
  const mutateHometown = {
    ...defaultUserQuery,
    updateColumn: "hometown",
  }
  const mutatePosition = {
    ...defaultUserQuery,
    updateColumn: "position",
  }
  const mutatePreviousTeams = {
    ...defaultUserQuery,
    updateColumn: "previous_teams",
  }
  const mutateLeaguesConferences = {
    ...defaultUserQuery,
    updateColumn: "leagues_conferences",
  }
  const mutateAthleticAccolades = {
    ...defaultUserQuery,
    updateColumn: "athletic_accolades",
  }
  const mutateExperience = {
    ...defaultUserQuery,
    updateColumn: "experience",
  }
  const mutateDiscipline = {
    ...defaultUserQuery,
    updateColumn: "discipline",
  }

  return (
    <Flex
      flexGrow={1}
      flexDirection={"column"}
      gap={10}
      maxW={"875px"}
      pb={"200px"}
    >
      <ProfilePictureSection user={user} data={!isLoading && data} />
      {/* ===================== Basic Information ===================== */}
      <Flex color={"gray.800"} flexDirection={"column"} gap={4}>
        <Flex alignItems={"center"} gap={3}>
          <Icon as={RiProfileLine} boxSize={6} />
          <Text fontWeight={"semibold"}>Basic info</Text>
        </Flex>

        <Flex gap={4}>
          <Flex flexDirection={"column"} w={"100%"}>
            {!isLoading ? (
              <InputField
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
          <SkeletonInput
            label={"Which Best Describes You"}
            isRequired={false}
          />
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
      {/* ===================== End Basic Information ===================== */}
      {/* ===================== About You ===================== */}
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
      {/* ===================== End of About You ===================== */}
      {/* ===================== Location ===================== */}
      {/* <ProfileAthleteAboutYou /> */}
      {/* <ProfileAthleteLocation /> */}
      <Flex color={"gray.800"} flexDirection={"column"} gap={4}>
        <Flex flexDirection={"column"}>
          <Flex alignItems={"center"} gap={3}>
            <Icon as={IoLocationOutline} boxSize={6} />
            <Text fontWeight={"semibold"}>Locations</Text>
          </Flex>
        </Flex>

        {!isLoading ? (
          <LocationInput
            query={mutateCurrentLocation}
            label={"Current location"}
            data={data[0]?.current_location}
            // setValue={setcurrentLocation}
            isRequired={false}
          />
        ) : (
          <SkeletonInput label={"Current location"} isRequired={false} />
        )}
        {!isLoading ? (
          <LocationInput
            query={mutateHometown}
            label={"Hometown"}
            data={data[0]?.hometown}
            // setValue={sethomeTown}
            isRequired={false}
          />
        ) : (
          <SkeletonInput label={"Hometown"} isRequired={false} />
        )}
      </Flex>
      {/* ===================== End of Location ===================== */}
      {/* ===================== Athletic Profile ===================== */}
      {/* <ProfileAthleticProfile /> */}
      <Flex color={"gray.800"} flexDirection={"column"} gap={4}>
        <Flex flexDirection={"column"}>
          <Flex alignItems={"center"} gap={3}>
            <Icon as={BiRun} boxSize={6} />
            <Text fontWeight={"semibold"}>Athletic Profile</Text>
          </Flex>
        </Flex>
        {!isLoading ? (
          <MultiSelectInput
            query={mutatePosition}
            label={"Position"}
            data={data[0]?.position}
            value={position}
            setValue={setposition}
            arrayLists={listPosition}
            isRequired={false}
          />
        ) : (
          <SkeletonInput label={"Position"} isRequired={false} />
        )}

        {!isLoading ? (
          <MultiSelectInput
            query={mutatePreviousTeams}
            label={"Previous teams"}
            data={data[0]?.previous_teams}
            value={previousTeams}
            setValue={setpreviousTeams}
            arrayLists={listPreviousTeams}
            isRequired={false}
          />
        ) : (
          <SkeletonInput label={"Previous teams"} isRequired={false} />
        )}

        {!isLoading ? (
          <MultiSelectInput
            query={mutateLeaguesConferences}
            label={"Leagues & conferences"}
            data={data[0]?.leagues_conferences}
            value={leaguesConferences}
            setValue={setleaguesConferences}
            arrayLists={listLeagueConferences}
            isRequired={false}
          />
        ) : (
          <SkeletonInput label={"Leagues & conferences"} isRequired={false} />
        )}

        {!isLoading ? (
          <MultiSelectInput
            query={mutateAthleticAccolades}
            label={"Athletic accolades"}
            data={data[0]?.athletic_accolades}
            value={athleticAccolades}
            setValue={setathleticAccolades}
            arrayLists={listAthleticAccolades}
            isRequired={false}
          />
        ) : (
          <SkeletonInput label={"Athletic accolades"} isRequired={false} />
        )}

        {!isLoading ? (
          <SelectInput
            query={mutateExperience}
            label={"Experience"}
            data={data[0]?.experience}
            value={experience}
            setValue={setexperience}
            arrayLists={listExperience}
            isRequired={false}
          />
        ) : (
          <SkeletonInput label={"Experience"} isRequired={false} />
        )}

        {!isLoading ? (
          <MultiSelectInput
            query={mutateDiscipline}
            label={"Discipline"}
            data={data[0]?.discipline}
            value={discipline}
            setValue={setdiscipline}
            arrayLists={listDiscipline}
            isRequired={false}
          />
        ) : (
          <SkeletonInput label={"Discipline"} isRequired={false} />
        )}
      </Flex>
      {/* ===================== End of Athletic Profile ===================== */}
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
        readOnly={true}
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

const LocationInput = (props) => {
  const { query, label, data, setValue } = props
  return (
    <Flex flexDirection={"column"} w={"100%"}>
      <Text mb={1}>{label}</Text>
      <GoogleMapLocationAutoComplete
        query={query}
        initialValue={data}
        setValue={setValue}
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

export default ProfileAthleteMiddleContent
