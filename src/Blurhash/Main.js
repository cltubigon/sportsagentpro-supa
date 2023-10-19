import React, { useState } from "react"
import BlurhashGenerator from "./BlurhashGenerator"
import ImagePreview from "./ImagePreview"
import { Flex } from "@chakra-ui/react"

function Main() {
  const [imageUrl, setImageUrl] = useState("")
  const [previewImage, setPreviewImage] = useState(null)

  const handleImageChange = (e) => {
    setImageUrl(e.target.value)
    setPreviewImage(e.target.value)
  }

  return (
    <Flex flexDirection={'column'} pt={'88px'} >
      <h1>Blurhash Generator</h1>
      <input
        type="text"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={handleImageChange}
      />
      {previewImage && <ImagePreview image={previewImage} />}
      {previewImage && (
        <BlurhashGenerator
          image={previewImage}
          component={({ blurhash }) => (
            <div>
              <h2>Generated Blurhash:</h2>
              <p>{blurhash}</p>
            </div>
          )}
        />
      )}
    </Flex>
  )
}

export default Main
