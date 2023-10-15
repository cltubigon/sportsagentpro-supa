/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Flex,
  Icon,
  Input,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { useEffect } from "react"
import { useDropzone } from "react-dropzone"
import supabase from "../../../../config/supabaseClient"
import { useState } from "react"
import { debounce } from "throttle-debounce"
import { useProfilePictureHook } from "../../../../hooks/imageHooks/useProfilePictureHook"
import { useMutateProfilePicture } from "../../../../hooks/imageHooks/useMutateProfilePicture"
import { BsFillPersonFill } from "react-icons/bs"
import { Link } from "react-router-dom"

const dateNow = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0") // Months are zero-based, so add 1 and pad with leading zero if necessary.
  const day = String(now.getDate()).padStart(2, "0")
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")
  return `${year}${month}${day}${hours}${minutes}${seconds}`
}

const ProfilePictureSection = ({ user, data }) => {
  const fileExtension = dateNow()
  const [publicURL, setPublicURL] = useState(null)

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const { data: image } = useProfilePictureHook({
    from: "images",
    eqColumn: "id",
    eqValue: user.id,
  })

  useEffect(() => {
    if (image && image.length > 0) {
      getPublicUrl(image && image[0]?.profile_picture?.path)
    }
  }, [image])

  const { mutate } = useMutateProfilePicture()

  const getPublicUrl = (path) => {
    setPublicURL(supabase.storage.from(`avatar`).getPublicUrl(path))
  }

  const debounceUpload = debounce(100, async () => {
    const { data, error } = await supabase.storage
      .from("avatar")
      .upload(`${user?.id}/${fileExtension}`, acceptedFiles[0])
    if (error) {
      console.log({ error })
    } else {
      const path = data.path
      getPublicUrl(path)
      getList(data.path)
    }
  })

  const getList = async (path) => {
    const fileName = path.replace(user?.id + "/", "")
    const { data, error } = await supabase.storage
      .from("avatar")
      .list(`${user?.id}`, {
        search: fileName,
      })
    if (data) {
      const metaData = { ...data[0], path }
      mutate({ metaData, userID: user.userID })
    } else if (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      debounceUpload()
    }
  }, [acceptedFiles])
  console.log({ user, data, publicURL, image })
const currentTeam = data && data[0].current_team?.map(team => team).join(" • ")
const currentSport = data && data[0].sport?.map(val => val).join(" • ")
  return (
    <Flex>
      <Flex flexDirection={"column"} flexGrow={1} gap={2}>
        <Flex gap={4} alignItems={"center"}>
          <Flex flexDirection={"column"} gap={2}>
            {/* ===================== Image ===================== */}
            {image?.length > 0 && (
            <Flex
              bgImage={publicURL?.data?.publicUrl}
              bgSize={"cover"}
              bgPosition={"center"}
              w={"125px"}
              h={"125px"}
              borderRadius={"200px"}
              shadow={"0px 3px 5px 1px rgba(0, 0, 0, 0.2)"}
            />
              // <Image
              //   src={publicURL?.data?.publicUrl}
              //   w={"125px"}
              //   h={"125px"}
              //   borderRadius={"200px"}
              //   shadow={"0px 3px 5px 1px rgba(0, 0, 0, 0.2)"}
              // />
            )}
            {image && image.length === 0 && (
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
            {!image && (
              <SkeletonCircle
                startColor="#BCC6D3"
                endColor="#d9d9d9"
                size="10"
                w={"125px"}
                h={"125px"}
                shadow={"0px 3px 5px 1px rgba(0, 0, 0, 0.2)"}
              />
            )}

            {/* ===================== End of Image ===================== */}
          </Flex>
          <Flex flexDirection={"column"} gap={1}>
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              {`${user.firstName} ${user.lastName}`}
            </Text>
            {data && <Text fontSize={"sm"}>{data[0].which_best_describes_you || '-'}</Text>}
            {data && (currentSport || currentTeam) ? <Text fontSize={"sm"} noOfLines={[1]} >{currentSport} • {currentTeam}</Text> : <Text>-</Text>}
          </Flex>
        </Flex>
        <Flex
          {...getRootProps({ className: "dropzone" })}
          w={"120px"}
          justifyContent={"center"}
        >
          <Input {...getInputProps()} />
          <Text fontSize={"sm"} cursor={"default"}>
            Edit
          </Text>
        </Flex>
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
