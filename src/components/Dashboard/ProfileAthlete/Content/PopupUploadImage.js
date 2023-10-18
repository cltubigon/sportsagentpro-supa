/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Flex,
  Icon,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { AiOutlineClose } from "react-icons/ai"
import { useSelector } from "react-redux"
import supabase from "../../../../config/supabaseClient"
import { useState } from "react"
import { useMutateMultiplePictures } from "../../../../hooks/imageHooks/useMutateMultiplePictures"

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

const PopupUploadImage = ({ setpopup }) => {
  const toast = useToast()
  const uid = useSelector((state) => state.auth.user?.id)
  const userID = useSelector((state) => state.auth.user?.userID)
  const [listOfFiles, setlistOfFiles] = useState([])
  const [uploading, setuploading] = useState(false)

  const { mutate } = useMutateMultiplePictures()

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log({ acceptedFiles })
    if (acceptedFiles && acceptedFiles.length > 0) {
      const files = acceptedFiles?.map((file) => file.name)
      setlistOfFiles(files)
    }

    if (rejectedFiles && rejectedFiles.length > 0) {
      console.log({ rejectedFiles })
      const code = rejectedFiles[0].errors[0].code
      if (code === "file-too-large") {
        toast({
          title: "File too large",
          description: "Must not exceed 6MB",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        })
      } else if (code === "too-many-files") {
        toast({
          title: "Too many files",
          description: "Must not exceed 10 images",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        })
      }
    }
  }, [])

  const maxSize = 6144 * 6144
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize,
    maxFiles: 10,
    acceptedFiles: "image/*", // Accept only image files
  })

  const handleClick = async () => {
    console.log("trying to send")
    setuploading(true)
    for (const file of acceptedFiles) {
      const fileName = dateNow() + file.name
      console.log({ file })
      const { data, error } = await supabase.storage
        .from("gallery")
        .upload(`${uid}/${fileName}`, file)
      console.log({ data, error })
      if (data) {
        const path = data.path
        //  ============== GetList
        const newPath = path.replace(`${uid}/`, "")
        const { data: dataList, error: errorList } = await supabase.storage
          .from("gallery")
          .list(`${uid}`, {
            search: newPath,
          })

        if (dataList) {
          console.log({ dataList })
          const metaData = { ...dataList[0], path }

          mutate({ metaData, userID })
        } else if (errorList) {
          console.log({ errorList })
        }
      } else {
        console.log({ error })
      }
    }
    setuploading(false)
    setlistOfFiles([])

    const timeout = setTimeout(() => {
      setpopup(prev => !prev)
      toast({
      title: `Upload complete`,
      description:  'Successfully uploaded your photos',
      status: `success`,
      duration: 4000,
      isClosable: true,
      position: `top-right`,
      })
    }, 300)
    return () => {
      clearTimeout(timeout)
    }
  }

  const handleCloseButton = () => {
    setpopup((prev) => !prev)
  }
  const handlePopupContainerClick = (e) => {
    e.stopPropagation()
  }

  const imageLists = {
    p: 2,
    borderBottom: "1px solid #ccc",
  }

  console.log({ listOfFiles, uploading })
  return (
    <Flex
      zIndex={999}
      position={"absolute"}
      left={0}
      top={0}
      h={"100%"}
      w={"100%"}
      bgColor={"rgba(0,0,0, 0.5)"}
      justifyContent={"center"}
      alignItems={"center"}
      onClick={handleCloseButton}
    >
      <Flex
        flexDirection={"column"}
        bgColor={"white"}
        w={"580px"}
        p={6}
        gap={6}
        position={"relative"}
        onClick={handlePopupContainerClick}
      >
        <Flex flexDirection={"column"}>
          <Text fontSize={"xl"} fontWeight={"semibold"}>
            Upload your featured photos
          </Text>
          <Text>
            At least 4 images are needed for your featured photos to display. A
            max of 10 images can be uploaded.
          </Text>
        </Flex>
        <Flex
          p={10}
          border={"1px dashed #333333"}
          justifyContent={"center"}
          {...getRootProps({ className: "dropzone" })}
          pointerEvents={listOfFiles?.length !== 0 && uploading && "none"}
        >
          <Input {...getInputProps()} />
          {listOfFiles?.length === 0 || !uploading ? (
            <Text>Drag media or click to upload</Text>
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            />
          )}
        </Flex>
        <Flex flexDirection={"column"} gap={2}>
          <Text>
            Note: The order you upload your photos will be the order they appear
            on your profile.
          </Text>
          <Button colorScheme="twitter" w={"100%"} mb={1} onClick={handleClick}>
            Upload
          </Button>
        </Flex>
        <Flex flexDirection={"column"} maxH={"250px"} overflowY={"auto"}>
          {listOfFiles?.map((item, index) => {
            return (
              <Text sx={imageLists} key={index}>
                {item}
              </Text>
            )
          })}
        </Flex>
        <Icon
          onClick={handleCloseButton}
          position={"absolute"}
          as={AiOutlineClose}
          color={"red"}
          top={6}
          right={6}
        />
      </Flex>
    </Flex>
  )
}

export default PopupUploadImage
