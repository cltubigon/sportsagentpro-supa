import { encode } from "blurhash"

export const generateBlurImage = (image) => {
  console.log('called generateBlurImage', image)
  return new Promise((resolve, reject) => {
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
      resolve(blurhash)
    }

    img.onerror = (error) => {
      reject(error)
    }
  })
}