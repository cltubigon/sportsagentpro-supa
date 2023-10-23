/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Flex,
  Icon,
  // Image,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { useEffect } from "react"
import supabase from "../../../../config/supabaseClient"
import { useState } from "react"
import { useProfilePictureHook } from "../../../../hooks/imageHooks/useProfilePictureHook"
import { BsFillPersonFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import UploadProfilePicture from "./UploadProfilePicture"
import ImageWithBlurhash from "../../../../utils/Blurhash/ImageWithBlurhash"

const ProfilePictureSection = ({ data }) => {
  const user = useSelector((state) => state.auth.user)

  const [publicURL, setPublicURL] = useState(null)
  const selectedPerson = data && data[0]

  const { data: image } = useProfilePictureHook({
    from: "images",
    eqColumn: "id",
    eqValue: user.id,
  })
  const hash = image && image[0]?.profile_picture?.hash
  const profilePicture = image && image[0]?.profile_picture

  const thePath = image && image[0]?.profile_picture?.path
  useEffect(() => {
    if (image && image.length > 0) {
      console.log({ thePath })
      const imageUrl = supabase.storage.from(`avatar`).getPublicUrl(thePath, {
        transform: {
          width: 120,
          height: 120,
          resize: "cover", // fill | contain
        },
      })
      setPublicURL(imageUrl)
    }
  }, [image])

  console.log({ user, data, selectedPerson, publicURL, image, thePath })
  console.log('profilePicture', profilePicture)

  return (
    <Flex>
      <Flex flexDirection={"column"} flexGrow={1} gap={2}>
        <Flex gap={4} alignItems={"center"}>
          <Flex flexDirection={"column"} gap={2}>
            {/* ===================== Image ===================== */}
            {!selectedPerson && (
              <SkeletonCircle
                startColor="#BCC6D3"
                endColor="#d9d9d9"
                size="10"
                w={"125px"}
                h={"125px"}
                shadow={"0px 3px 5px 1px rgba(0, 0, 0, 0.2)"}
              />
            )}
            {image?.length > 0 && profilePicture && (
              // <Image
              //   src={publicURL?.data?.publicUrl}
              //   w={"125px"}
              //   h={"125px"}
              //   borderRadius={"200px"}
              //   shadow={"0px 3px 5px 1px rgba(0, 0, 0, 0.2)"}
              // />
              <Flex w={"125px"} h={"125px"}>
                <ImageWithBlurhash
                  srcOrigin={publicURL?.data?.publicUrl}
                  hash={hash}
                  circle={true}
                />
              </Flex>
            )}
            {selectedPerson && !profilePicture && (
              <Icon
                as={BsFillPersonFill}
                color={"gray.400"}
                w={"125px"}
                h={"125px"}
                p={6}
                borderRadius={"125px"}
                shadow={"0px 3px 5px 1px rgba(0, 0, 0, 0.2)"}
              />
            )}

            {/* ===================== End of Image ===================== */}
          </Flex>
          <Flex flexDirection={"column"} gap={1}>
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              {`${user.firstName} ${user.lastName}`}
            </Text>
            {data && (
              <Text fontSize={"sm"}>
                {data[0].which_best_describes_you || "-"}
              </Text>
            )}
            {data ? (
              <Text fontSize={"sm"}>
                {data && data[0].sport[0]} • {data && data[0].current_team[0]}
              </Text>
            ) : (
              <Text>-</Text>
            )}
          </Flex>
        </Flex>
        <UploadProfilePicture />
      </Flex>
      <Flex>
        <Link to={`/profile/${user.userID}`}>
          <Button colorScheme="twitter">View profile</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default ProfilePictureSection
