/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Flex, Image, Input, Text } from "@chakra-ui/react"
import { useState } from "react"
import supabase from "./config/supabaseClient"
import { useDropzone } from "react-dropzone"

const Test = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  console.log({ acceptedFiles })

  return (
    <Flex paddingTop={'88px'} flexDirection={'column'}>
      <Flex {...getRootProps({ className: "dropzone" })} bgColor={'gray.300'} w={'300px'} h={'300px'} >
        <Input {...getInputProps()} />
        <Text>Edit</Text>
      </Flex>
      <ul>
        {acceptedFiles.map((file) => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        ))}
      </ul>
    </Flex>
  )
}

export default Test
