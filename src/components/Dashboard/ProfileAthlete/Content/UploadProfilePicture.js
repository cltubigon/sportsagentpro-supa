/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Input, Text, useToast } from "@chakra-ui/react"
import React from "react"
import { useEffect } from "react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import supabase from "../../../../config/supabaseClient"
import { useSelector } from "react-redux"
import { debounce } from "throttle-debounce"
import { useMutateProfilePicture } from "../../../../hooks/imageHooks/useMutateProfilePicture"
import { generateBlurImage } from "../../../../utils/Blurhash/generateBlurImage"

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

const UploadProfilePicture = () => {
  const toast = useToast
  const uid = useSelector((state) => state.auth.user?.id)
  const userID = useSelector((state) => state.auth.user?.userID)
  const fileExtension = dateNow()
  const maxSize = 1024 * 1024


  const { mutate } = useMutateProfilePicture()

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      const code = rejectedFiles[0].errors[0].code
      if (code === "file-too-large") {
        toast({
          title: "File too large",
          description: "Must not exceed 1MB",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        })
      }
    }
  }, [])
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize,
    acceptedFiles: "image/*", // Accept only image files
  })

  const debounceUpload = debounce(100, async () => {
    const { data: uploadedData, error } = await supabase.storage
      .from("avatar")
      .upload(`${uid}/${fileExtension}`, acceptedFiles[0])
    if (uploadedData) {
      const { path } = uploadedData
      const fileName = path.replace(uid + "/", "")

      const { data, error } = await supabase.storage
        .from("avatar")
        .list(`${uid}`, {
          search: fileName,
        })
      if (data) {
        const imageUrl = supabase.storage.from(`avatar`).getPublicUrl(path, {
          transform: {
            width: 32,
            height: 32,
            resize: "cover", // fill | contain
          },
        })
        const getHash = async (image) => {
          try {
            const hash = await generateBlurImage(image)
            if (hash) {
              const metaData = { ...data[0], hash, path }
              mutate({ metaData, userID })
            }
          } catch (error) {
            console.log({ error })
          }
        }
        getHash(imageUrl.data.publicUrl)
        //   const metaData = { ...data[0], path }
      } else if (error) {
        console.log({ error })
      }
    } else if (error) {
      console.log({ error })
    }
  })

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      debounceUpload()
    }
  }, [acceptedFiles])
  return (
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
  )
}

export default UploadProfilePicture
