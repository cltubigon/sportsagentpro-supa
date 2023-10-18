import { Box, Button, Flex, Image, Skeleton } from "@chakra-ui/react"
import { DummyImage } from "react-simple-placeholder-image"
import { ProfileGallerySekeleton } from "../Skeleton/Skeletons"
import supabase from "../../config/supabaseClient"
import { useState } from "react"
import { useEffect } from "react"

const ProfileGallery = ({ query }) => {
  console.log("--------------------------Gallery Rendered")
  const [imageURLs, setimageURLs] = useState([])
  console.log({ query })
  useEffect(() => {
    const galleryItems =
      query?.data && query.data[0].images && query.data[0].images[0]?.gallery
    const galleryPaths = galleryItems
      ?.map((item) => item.path)
      .sort((a, b) => b.localeCompare(a))
    if (galleryPaths?.length > 0) {
      const imageURL = galleryPaths?.map((path) => {
        const publicpath = supabase.storage.from(`gallery`).getPublicUrl(path, {
          transform: {
            width: 275,
            height: 275,
            resize: "cover", // fill | contain
          },
        })
        return publicpath
      })
      if (imageURL?.length < 6) {
        const placeholdersCount = 5 - imageURL.length
        const dummyArray = new Array(placeholdersCount).fill("dummy")
        const mergedArray = [...imageURL, ...dummyArray]
        console.log({ mergedArray })
        setimageURLs(mergedArray)
      } else {
        setimageURLs(imageURL)
      }
    }
  }, [query])
  console.log({ imageURLs })
  const loaderArray = new Array(5).fill(0)
  return (
    <>
      {query ? (
        <Flex
          position={"relative"}
          gap={2}
          boxSizing="border-box"
          alignItems={"center"}
          justifyContent={"space-between"}
          px={4}
          maxH={"280px"}
        >
          {imageURLs?.map((imageURL, index) => {
            console.log({ index })
            return imageURL !== "dummy" && index < 5 ? (
              <Flex
                key={index}
                display={index > 4 && { lph: "none", stl: "flex" }}
                w={"19%"}
                h={"100%"}
              >
                <Image src={imageURL?.data.publicUrl} />
              </Flex>
            ) : (
              index < 5 && (
                <Flex
                  key={index}
                  display={index > 4 && { lph: "none", stl: "flex" }}
                  w={"19%"}
                  h={'100%'}
                >
                  <DummyImage bgColor="#A0AEC0" placeholder="280x280" />
                </Flex>
              )
            )
          })}
          {!query.data &&
            loaderArray?.map((item, index) => {
              return (
                <Flex
                  key={index}
                  display={{ lph: "none", stl: "flex" }}
                  w={"19%"}
                  h={'100%'}
                >
                  <Skeleton
                    startColor="#BCC6D3"
                    endColor="#d9d9d9"
                    w={"100%"}
                    h={{sph: '67px', stl: '136px', ltl: '176px', slt: '186px', llt: '234px', sdt: "251px", ldt: '268px'}}
                  />
                </Flex>
              )
            })}
          {query.data &&
            imageURLs?.length === 0 &&
            loaderArray?.map((item, index) => {
              return (
                <Flex
                  key={index}
                  display={{ lph: "none", stl: "flex" }}
                  w={"19%"}
                  // h={'280px'}
                >
                  <DummyImage
                    bgColor="#A0AEC0"
                    // width={'275px'}
                    // height={'275px'}
                    placeholder="280x280"
                  />
                </Flex>
              )
            })}
          <Box
            position={"absolute"}
            bottom={{ base: 2, sm: 3, md: 5, lg: 10 }}
            right={{ base: 5, sm: 7, md: 8, lg: 12 }}
          >
            <Button
              size={{ base: "xs", md: "md" }}
              bgColor={"transparent"}
              color={"white"}
              border={"1px solid #cdcdcd"}
              dropShadow={"dark-lg"}
              _hover={{ bgColor: "transparent" }}
            >
              View All
            </Button>
          </Box>
        </Flex>
      ) : (
        <ProfileGallerySekeleton />
      )}
    </>
  )
}

export default ProfileGallery
