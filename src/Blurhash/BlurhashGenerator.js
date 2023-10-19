import React, { useState, useEffect } from "react"
import { encode } from "blurhash"

function BlurhashGenerator({ image, component }) {
  const [blurhash, setBlurhash] = useState(null)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = image

    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0, img.width, img.height)
      const imageData = ctx.getImageData(0, 0, img.width, img.height)
      const blurhash = encode(imageData.data, img.width, img.height, 4, 3)
      setBlurhash(blurhash)
    }
  }, [image])

  return <div>{component({ blurhash })}</div>
}

export default BlurhashGenerator