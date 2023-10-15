// import { Flex, Icon, Skeleton, Text, useToast } from "@chakra-ui/react"
// import React from "react"
// import { IoLocationOutline } from "react-icons/io5"
// // import { useState } from "react"
// import GoogleMapLocationAutoComplete from "./GoogleMapAutoComplete/GoogleMapAutoCompleteTwo"
// import useGetMultiColumnData from "../../../../hooks/useGetMultiColumnData"
// import { useSelector } from "react-redux"

// const ProfileAthleteLocation = () => {
//   const toast = useToast()
//   const user = useSelector(state => state.auth.user)
//   // const [currentLocation, setcurrentLocation] = useState(null)
//   // const [homeTown, sethomeTown] = useState(null)

//   // console.log({ currentLocation, homeTown })

//   const { data, isLoading, isError, error } = useGetMultiColumnData({
//     key: "location",
//     mainKey: "mainKey",
//     from: "users",
//     select: "current_location, hometown",
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

//   const defaultUserMutate = {
//     from: "users",
//     eqColumn: "id",
//     eqValue: user?.userID,
//   }

//   const mutateCurrentLocation = {
//     ...defaultUserMutate,
//     updateColumn: "current_location",
//   }
//   const mutateHometown = {
//     ...defaultUserMutate,
//     updateColumn: "hometown",
//   }

//   return (
//     <Flex color={"gray.800"} flexDirection={"column"} gap={4}>
//       <Flex flexDirection={"column"}>
//         <Flex alignItems={"center"} gap={3}>
//           <Icon as={IoLocationOutline} boxSize={6} />
//           <Text fontWeight={"semibold"}>Locations</Text>
//         </Flex>
//       </Flex>

//       {!isLoading ? (
//         <MyField
//         query={mutateCurrentLocation}
//           label={"Current location"}
//           data={data[0]?.current_location}
//           // setValue={setcurrentLocation}
//           isRequired={false}
//         />
//       ) : (
//         <SkeletonInput label={"Current location"} isRequired={false} />
//       )}
//       {!isLoading ? (
//         <MyField
//         query={mutateHometown}
//           label={"Hometown"}
//           data={data[0]?.hometown}
//           // setValue={sethomeTown}
//           isRequired={false}
//         />
//       ) : (
//         <SkeletonInput label={"Hometown"} isRequired={false} />
//       )}
//     </Flex>
//   )
// }

// const MyField = (props) => {
//   const { query, label, data, setValue } = props
//   return (
//     <Flex flexDirection={"column"} w={"100%"}>
//       <Text mb={1}>{label}</Text>
//       <GoogleMapLocationAutoComplete query={query} initialValue={data} setValue={setValue} />
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
//         startColor="#BCC6D3"
//         endColor="#d9d9d9"
//         w={"100%"}
//         h={"40px"}
//       />
//     </Flex>
//   )
// }

// export default ProfileAthleteLocation
