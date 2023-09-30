/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { DummyImage } from "react-simple-placeholder-image"
import { VscStarFull, VscVerifiedFilled } from "react-icons/vsc"
import ProfileContentInterests from "./ProfileContentInterests"
import ProfileContentAbout from "./ProfileContentAbout"
import ProfileSocialMedia from "./ProfileSocialMedia"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom/dist"
import { SkeletonAthleteSelectedProfile } from "../Skeleton/SkeletonAthleteSelectedProfile"

const ProfileContentLeft = () => {
  const { id } = useParams()
  const selectedProfile = useSelector((state) => state.athlete.selectedProfile)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (selectedProfile && selectedProfile.id === id) {
      console.log("id: ", id)
      console.log("selectedProfile.id: ", selectedProfile.id)
      selectedProfile && setIsLoading(false)
    }
  }, [selectedProfile])
  console.log("--------------------------ProfileContentLeft")
  return (
    <Flex flexDirection={'column'} flexGrow={1}>
      {isLoading && (
        <Flex py={4}>
          <SkeletonAthleteSelectedProfile />
        </Flex>
      )}
      {selectedProfile && !isLoading && (
        <Stack flex={1} gap={4} pl={2}>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Flex flexDirection={"row"} alignItems={"center"} gap={1}>
                <Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
                  {selectedProfile && selectedProfile.firstName}{" "}
                  {selectedProfile && selectedProfile.lastName}
                </Heading>
                <VscVerifiedFilled color="lightGreen" size={25} />
              </Flex>
              <Text>{selectedProfile && selectedProfile.sports} • Forward</Text>
            </Box>
            <Box>
              <DummyImage
                width={56}
                height={56}
                shape="avatar"
                placeholder="Colored!"
                bgColor="#2A4365"
                className="profile"
              />
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
          <ProfileContentAbout />
          <ProfileContentInterests />
        </Stack>
      )}
    </Flex>
  )
}

export default ProfileContentLeft
