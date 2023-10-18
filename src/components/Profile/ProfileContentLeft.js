/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Flex,
  Heading,
  Image,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react"
import { DummyImage } from "react-simple-placeholder-image"
import { VscStarFull, VscVerifiedFilled } from "react-icons/vsc"
import ProfileContentInterests from "./ProfileContentInterests"
import ProfileContentAbout from "./ProfileContentAbout"
import ProfileSocialMedia from "./ProfileSocialMedia"
import { SkeletonAthleteSelectedProfile } from "../Skeleton/SkeletonAthleteSelectedProfile"
import supabase from "../../config/supabaseClient"

const ProfileContentLeft = ({ query }) => {
  const pathName =
    query?.data &&
    query.data[0].images &&
    query.data[0].images[0]?.profile_picture?.path
  const imageURL = supabase.storage.from(`avatar`).getPublicUrl(pathName, {
    transform: {
      width: 56,
      height: 56,
      resize: "cover", // fill | contain
    },
  })
  const selectedAthlete = query.data && query.data[0]
  console.log({ selectedAthlete })

  return (
    <Flex flexDirection={"column"} flexGrow={1}>
      {query.isLoading && (
        <Flex py={4}>
          <SkeletonAthleteSelectedProfile />
        </Flex>
      )}
      {selectedAthlete && (
        <Stack flex={1} gap={4} pl={2}>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Flex flexDirection={"row"} alignItems={"center"} gap={1}>
                <Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
                  {selectedAthlete.firstName}{" "}
                  {selectedAthlete.lastName}
                </Heading>
                <VscVerifiedFilled color="lightGreen" size={25} />
              </Flex>
              <Text>{selectedAthlete.sport[0]}{selectedAthlete.position[0] && ' • '}{selectedAthlete.position[0]}</Text>
            </Box>
            <Box>
              {/* =================== Image =================== */}
              {selectedAthlete.images.length === 0 && (
                <DummyImage
                  width={56}
                  height={56}
                  shape="avatar"
                  placeholder="Colored!"
                  bgColor="#A1AEBF"
                  className="profile"
                  shadow={"0px 3px 5px 1px rgba(0, 0, 0, 0.2)"}
                />
              )}
              {!(
                <SkeletonCircle
                  startColor="#BCC6D3"
                  endColor="#d9d9d9"
                  w={"56px"}
                  h={"56px"}
                  shadow={"0px 3px 5px 1px rgba(0, 0, 0, 0.2)"}
                />
              )}
              {selectedAthlete.images.length > 0 && (
                <Image src={imageURL?.data?.publicUrl} w={"56px"}
                h={"56px"} shadow={"0px 3px 5px 1px rgba(0, 0, 0, 0.2)"} borderRadius={"200px"} />
              )}
              {/* =================== End of Image =================== */}
            </Box>
          </Flex>

          <Flex
            color={"gray.600"}
            alignItems={"center"}
            gap={2}
            bg={"blue.100"}
            p={1}
            width={"140px"}
            borderRadius={"md"}
            justifyContent={"center"}
          >
            <VscStarFull color="#1A202C" />
            <Text>All-Star profile</Text>
          </Flex>

          <ProfileSocialMedia />
          <ProfileContentAbout query={query} />
          <ProfileContentInterests />
        </Stack>
      )}
    </Flex>
  )
}

export default ProfileContentLeft
