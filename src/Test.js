/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Flex, Image, Input } from "@chakra-ui/react"
import { useState } from "react"
import supabase from "./config/supabaseClient"

const Test = () => {
  const [file, setfile] = useState(null)
  const handleOnChange = (e) => {
    setfile(e.target.files[0])
  }
  const handleFileUpload = async (e) => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload("public/avatar6.jpeg", file, {
        upsert: false, // Set this to false to avoid overwriting existing files
      })

    if (data) {
      console.log({ data })
    }
    if (error) {
      console.log({ error })
    }
  }
  

  return (
    <Flex pt="88px" flexDirection={'column'}>
      <Input
        placeholder="Select file to upload"
        size="md"
        type="file"
        onChange={handleOnChange}
      />
      <Button onClick={handleFileUpload}>Upload</Button>
    </Flex>
  )
}

export default Test

// const imageUrl = supabase.storage
//   .from('avatars')
//   .getPublicUrl('public/avatar6.jpeg', { width: 500, height: 600, resize: 'cover' })
//   console.log({ imageUrl })