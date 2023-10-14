/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Flex,
  Icon,
  Image,
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

const ProfilePictureSection = ({ user }) => {
  const fileExtension = dateNow()
  const [publicURL, setPublicURL] = useState(null)
  const urlIsUndefined = publicURL?.data?.publicUrl.includes("undefined")
  console.log({ user, publicURL, urlIsUndefined })

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const { data: image } = useProfilePictureHook({
    from: "images",
    eqColumn: "id",
    eqValue: user.id,
  })

  useEffect(() => {
    if (image) {
      console.log("image: calling getPublicUrl")
      getPublicUrl(image && image[0]?.meta_data?.path)
    }
  }, [image])

  const { mutate } = useMutateProfilePicture()

  const getPublicUrl = (path) => {
    console.log("getPublicUrl is triggered")
    setPublicURL(supabase.storage.from(`avatar`).getPublicUrl(path))
  }

  const debounceUpload = debounce(100, async () => {
    console.log("debounceUpload is triggered")
    const { data, error } = await supabase.storage
      .from("avatar")
      .upload(`${user?.id}/${fileExtension}`, acceptedFiles[0])
    if (error) {
      console.log({ error })
    } else {
      const path = data.path
      console.log("debounce: calling getPublicUrl")
      getPublicUrl(path)
      getList(data.path)
    }
  })

  const getList = async (path) => {
    console.log("getList is triggered")
    const fileName = path.replace(user?.id + "/", "")
    const { data, error } = await supabase.storage
      .from("avatar")
      .list(`${user?.id}`, {
        search: fileName,
      })
    if (data) {
      const metaData = { ...data[0], path }
      console.log('user.id', user.id)
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

  return (
    <Flex>
      <Flex flexDirection={"column"} flexGrow={1} gap={2}>
        <Flex gap={4} alignItems={"center"}>
          <Flex flexDirection={"column"} gap={2}>
            {publicURL && urlIsUndefined && (
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
            {!publicURL && (
              <SkeletonCircle
                startColor="#d9d9d9"
                endColor="#ededed"
                size="10"
                w={"125px"}
                h={"125px"}
              />
            )}
            {publicURL && !urlIsUndefined && (
              <Image
                src={publicURL?.data?.publicUrl}
                w={"125px"}
                h={"125px"}
                borderRadius={"200px"}
              />
            )}
          </Flex>
          <Flex flexDirection={"column"} gap={1}>
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              Burnice Bailey
            </Text>
            <Text fontSize={"sm"}>Professional Athlete</Text>
            <Text fontSize={"sm"}>Basketball • AC Connecticut</Text>
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
        <Button>View profile</Button>
        <Button colorScheme="twitter">Save</Button>
      </Flex>
    </Flex>
  )
}

export default ProfilePictureSection
