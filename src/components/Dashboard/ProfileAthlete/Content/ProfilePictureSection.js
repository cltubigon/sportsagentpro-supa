/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react"
import React from "react"
import { useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { BsFillPersonFill } from "react-icons/bs"
import supabase from "../../../../config/supabaseClient"
import { useState } from "react"

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
  const toast = useToast()
  const [lastUploadedAvatar, setlastUploadedAvatar] = useState(null)
  const fileExtension = dateNow()
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  console.log({ user })


  const imageURL = supabase.storage
    .from(`avatar/${user?.id}`)
    .getPublicUrl(lastUploadedAvatar,
    //   {
    //   transform: {
    //     width: 120,
    //     height: 120,
    //     resize: "cover",
    //   },
    // }
    )

  // Use the JS library to download a file.
  // const downloadFile = async () => {
  //   const { data: downloadedFile, error } = await supabase.storage
  //     .from(`avatar/${user?.id}`)
  //     .download(`/20231013222912`)
  //   console.log({ downloadedFile, error })
  // }
  // downloadFile()

  const getList = async () => {
    const { data, error } = await supabase.storage
      .from("avatar")
      .list(user?.id, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      })
    if (data) {
      console.log({ data })
      setlastUploadedAvatar(data[0]?.name)
    }
  }
  getList()
  const handleUpload = async () => {
    const { data, error } = await supabase.storage
      .from("avatar")
      .upload(`${user?.id}/${fileExtension}`, acceptedFiles[0])
    if (data) {
      console.log({ data })
      getList()
    } else {
      toast({
        title: ` Something went wrong`,
        description: error.message,
        status: ` error`,
        duration: 3000,
        isClosable: true,
        position: `top-right`,
      })
    }
  }

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      handleUpload()
    }
  }, [acceptedFiles])
  return (
    <Flex>
      <Flex flexDirection={"column"} flexGrow={1} gap={2}>
        <Flex gap={4} alignItems={"center"}>
          <Flex flexDirection={"column"} gap={2}>
            {!imageURL ? (
              <Icon
                as={BsFillPersonFill}
                color={"gray.400"}
                w={"125px"}
                h={"125px"}
                p={6}
                borderRadius={"125px"}
                shadow={"0px 3px 5px 1px rgba(0, 0, 0, 0.2)"}
              />
            ) : (
              <Image src={imageURL?.data?.publicUrl} w={"120px"} h={"120px"} borderRadius={'200px'} />
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
