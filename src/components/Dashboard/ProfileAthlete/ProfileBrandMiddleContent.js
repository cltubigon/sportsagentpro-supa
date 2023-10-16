import { Flex, Icon, Input, Skeleton, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RiProfileLine } from "react-icons/ri"
import {
  listBrandCategories,
  listBrandWhichBestDescribesYou,
  listCurrentTeam,
  listGenderIdentities,
  listSports,
} from "./Content/Inputs/profileListOfArrays"
import ProfilePictureSection from "./Content/ProfilePictureSection"
import MultiSelectInputHook from "./Content/Inputs/MultiSelectInputHook"
import SelectInputHook from "./Content/Inputs/SelectInputHook"
import { useState } from "react"

const ProfileBrandMiddleContent = ({ data, isLoading }) => {
  const id = useSelector((state) => state.auth.user?.id)
  const userID = useSelector((state) => state.auth.user?.userID)
  const [whichBestDescribesYou, setwhichBestDescribesYou] = useState(null)
  const [genderIdentity, setgenderIdentity] = useState(null)
  const [currentTeam, setcurrentTeam] = useState([])
  const [sports, setsports] = useState([])
  const [brandCategory, setbrandCategory] = useState([])

  console.log({ data })

  const defaultUserQuery = {
    mainKey: ["profileInformation", id],
    from: "users",
    eqColumn: "id",
    eqValue: userID,
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
  const mutateBrandCategory = {
    ...defaultUserQuery,
    updateColumn: "brand_category",
  }

//   console.log({ data })
//   console.log('data[0]?.brad_category', data[0]?.brad_category)
//   console.log('data[0]?.current_team', data[0]?.current_team)
//   console.log('brandCategory', brandCategory)

  return (
    <Flex
      flexGrow={1}
      flexDirection={"column"}
      gap={10}
      maxW={"875px"}
      pb={"200px"}
    >
      <ProfilePictureSection data={!isLoading && data} />
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
            arrayLists={listBrandWhichBestDescribesYou}
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

        {!isLoading ? (
          <MultiSelectInput
            query={mutateBrandCategory}
            label={"Brand category"}
            data={data[0]?.brand_category}
            value={brandCategory}
            setValue={setbrandCategory}
            arrayLists={listBrandCategories}
            isRequired={false}
          />
        ) : (
          <SkeletonInput label={"Brand category"} isRequired={false} />
        )}
      </Flex>
      {/* ===================== End Basic Information ===================== */}
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

const SkeletonInput = ({ label, isRequired }) => {
  return (
    <Flex flexDirection={"column"} w={"100%"}>
      <Text mb={1}>
        {isRequired && <span style={{ color: "red" }}>*</span>} {label}
      </Text>
      <Skeleton
        borderRadius={"md"}
        startColor="#BCC6D3"
        endColor="#d9d9d9"
        w={"100%"}
        h={"40px"}
      />
    </Flex>
  )
}

export default ProfileBrandMiddleContent
