import React from "react"

function ImagePreview({ image }) {
  return (
    <div>
      <img src={image} alt="Preview" />
    </div>
  )
}

export default ImagePreview
