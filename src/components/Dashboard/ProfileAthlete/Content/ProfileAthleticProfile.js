// import { Flex, Icon, Skeleton, Text, useToast } from "@chakra-ui/react"
// import React from "react"
// import { BiRun } from "react-icons/bi"
// import { useState } from "react"
// import MultiSelectInputHook from "./Inputs/MultiSelectInputHook"
// import {
//   listAthleticAccolades,
//   listDiscipline,
//   listExperience,
//   listLeagueConferences,
//   listPosition,
//   listPreviousTeams,
// } from "./Inputs/listOfArrays"
// import SelectInputHook from "./Inputs/SelectInputHook"
// import useGetMultiColumnData from "../../../../hooks/useGetMultiColumnData"
// import { useSelector } from "react-redux"

// const ProfileAthleticProfile = () => {
//   const toast = useToast()
//   const user = useSelector((state) => state.auth.user)
//   const [position, setposition] = useState([])
//   const [previousTeams, setpreviousTeams] = useState([])
//   const [leaguesConferences, setleaguesConferences] = useState([])
//   const [athleticAccolades, setathleticAccolades] = useState([])
//   const [discipline, setdiscipline] = useState([])
//   const [experience, setexperience] = useState(null)

//   const { data, isLoading, isError, error } = useGetMultiColumnData({
//     key: "athleticprofile",
//     mainKey: "mainKey",
//     from: "users",
//     select:
//       "position, previous_teams, leagues_conferences, athletic_accolades, experience, discipline",
//     eqColumn: "id",
//     eqValue: user?.userID,
//   })

//   if (isError) {
//     toast({
//       title: ` Something went wrong`,
//       description: error.message,
//       status: ` error`,
//       duration: 3000,
//       isClosable: true,
//       position: `top-right`,
//     })
//   }

//   const defaultUserQuery = {
//     from: "users",
//     eqColumn: "id",
//     eqValue: user?.userID,
//   }

//   const mutatePosition = {
//     ...defaultUserQuery,
//     updateColumn: "position",
//   }
//   const mutatePreviousTeams = {
//     ...defaultUserQuery,
//     updateColumn: "previous_teams",
//   }
//   const mutateLeaguesConferences = {
//     ...defaultUserQuery,
//     updateColumn: "leagues_conferences",
//   }
//   const mutateAthleticAccolades = {
//     ...defaultUserQuery,
//     updateColumn: "athletic_accolades",
//   }
//   const mutateExperience = {
//     ...defaultUserQuery,
//     updateColumn: "experience",
//   }
//   const mutateDiscipline = {
//     ...defaultUserQuery,
//     updateColumn: "discipline",
//   }
//   return (
//     <Flex color={"gray.800"} flexDirection={"column"} gap={4}>
//       <Flex flexDirection={"column"}>
//         <Flex alignItems={"center"} gap={3}>
//           <Icon as={BiRun} boxSize={6} />
//           <Text fontWeight={"semibold"}>Athletic Profile</Text>
//         </Flex>
//       </Flex>
//       {!isLoading ? (
//         <MultiSelectInput
//           query={mutatePosition}
//           label={"Position"}
//           data={data[0]?.position}
//           value={position}
//           setValue={setposition}
//           arrayLists={listPosition}
//           isRequired={false}
//         />
//       ) : (
//         <SkeletonInput label={"Position"} isRequired={false} />
//       )}

//       {!isLoading ? (
//         <MultiSelectInput
//           query={mutatePreviousTeams}
//           label={"Previous teams"}
//           data={data[0]?.previous_teams}
//           value={previousTeams}
//           setValue={setpreviousTeams}
//           arrayLists={listPreviousTeams}
//           isRequired={false}
//         />
//       ) : (
//         <SkeletonInput label={"Previous teams"} isRequired={false} />
//       )}

//       {!isLoading ? (
//         <MultiSelectInput
//           query={mutateLeaguesConferences}
//           label={"Leagues & conferences"}
//           data={data[0]?.leagues_conferences}
//           value={leaguesConferences}
//           setValue={setleaguesConferences}
//           arrayLists={listLeagueConferences}
//           isRequired={false}
//         />
//       ) : (
//         <SkeletonInput label={"Leagues & conferences"} isRequired={false} />
//       )}

//       {!isLoading ? (
//         <MultiSelectInput
//           query={mutateAthleticAccolades}
//           label={"Athletic accolades"}
//           data={data[0]?.athletic_accolades}
//           value={athleticAccolades}
//           setValue={setathleticAccolades}
//           arrayLists={listAthleticAccolades}
//           isRequired={false}
//         />
//       ) : (
//         <SkeletonInput label={"Athletic accolades"} isRequired={false} />
//       )}

//       {!isLoading ? (
//         <SelectInput
//           query={mutateExperience}
//           label={"Experience"}
//           data={data[0]?.experience}
//           value={experience}
//           setValue={setexperience}
//           arrayLists={listExperience}
//           isRequired={false}
//         />
//       ) : (
//         <SkeletonInput label={"Experience"} isRequired={false} />
//       )}

//       {!isLoading ? (
//         <MultiSelectInput
//           query={mutateDiscipline}
//           label={"Discipline"}
//           data={data[0]?.discipline}
//           value={discipline}
//           setValue={setdiscipline}
//           arrayLists={listDiscipline}
//           isRequired={false}
//         />
//       ) : (
//         <SkeletonInput label={"Discipline"} isRequired={false} />
//       )}
//     </Flex>
//   )
// }

// const MultiSelectInput = (props) => {
//   const { query, label, data, value, setValue, arrayLists, isRequired } = props
//   return (
//     <Flex flexDirection={"column"} w={"100%"}>
//       <Text mb={1}>
//         {isRequired && <span style={{ color: "red" }}>*</span>} {label}
//       </Text>
//       <MultiSelectInputHook
//         query={query}
//         value={value}
//         setValue={setValue}
//         initialValue={data}
//         arrayLists={arrayLists}
//       />
//     </Flex>
//   )
// }
// const SelectInput = (props) => {
//   const { query, label, data, value, setValue, arrayLists, isRequired } = props
//   return (
//     <Flex flexDirection={"column"} w={"100%"}>
//       <Text mb={1}>
//         {isRequired && <span style={{ color: "red" }}>*</span>} {label}
//       </Text>
//       <SelectInputHook
//         query={query}
//         value={value}
//         setValue={setValue}
//         initialValue={data}
//         arrayLists={arrayLists}
//       />
//     </Flex>
//   )
// }

// const SkeletonInput = ({ label, isRequired }) => {
//   return (
//     <Flex flexDirection={"column"} w={"100%"}>
//       <Text mb={1}>
//         {isRequired && <span style={{ color: "red" }}>*</span>} {label}
//       </Text>
//       <Skeleton
//         borderRadius={"md"}
//         border={"1px solid #000"}
//         startColor="#d9d9d9"
//         endColor="#ededed"
//         w={"100%"}
//         h={"40px"}
//       />
//     </Flex>
//   )
// }

// export default ProfileAthleticProfile
