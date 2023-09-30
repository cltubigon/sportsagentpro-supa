/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { DummyImage } from "react-simple-placeholder-image"
import { VscStarFull, VscVerifiedFilled } from "react-icons/vsc"
import ProfileContentInterests from "./ProfileContentInterests"
import ProfileContentAbout from "./ProfileContentAbout"
import ProfileSocialMedia from "./ProfileSocialMedia"
import { useState } from "react"
import { useParams } from "react-router-dom/dist"
import { SkeletonAthleteSelectedProfile } from "../Skeleton/SkeletonAthleteSelectedProfile"
import supabase from "../../config/supabaseClient"
import { useEffect } from "react"

const ProfileContentLeft = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAthlete, setSelectedAthlete] = useState(null)
  console.log("selectedAthlete: ", selectedAthlete)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
      if (data[0]) {
        setSelectedAthlete(data[0])
        setIsLoading(false)
      } else if (error) {
        console.log("error: ", error)
      }
    }
    fetchUser()
  }, [])
  return (
    <Flex flexDirection={"column"} flexGrow={1}>
      {isLoading && (
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
                  {selectedAthlete && selectedAthlete.firstName}{" "}
                  {selectedAthlete && selectedAthlete.lastName}
                </Heading>
                <VscVerifiedFilled color="lightGreen" size={25} />
              </Flex>
              <Text>{selectedAthlete && selectedAthlete.sports} • Forward</Text>
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
