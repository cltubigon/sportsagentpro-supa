/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Image, Text } from "@chakra-ui/react"
import SaveToFavoritesAthleteType from "./Brand/SaveToFavorites"
import useInfinitMultiColumnQueryData from "../../../hooks/useInfiniteMultiColumnQueryData"
import supabase from "../../../config/supabaseClient"

const DiscoverAthleteType = () => {
  console.log("Athlete network is active")

  const { data, isLoading } = useInfinitMultiColumnQueryData({
    key: "brands",
    from: "users",
    select:
      "id, uid, firstName, lastName, which_best_describes_you, images(profile_picture)",
    eqColumn: "userType",
    eqValue: "brand",
    order: "created_at",
    limit: 35,
  })
  console.log({ data })

  const listContainer = {
    bgSize: "cover",
    bgPosition: "center",
    position: "relative",
    height: "140px",
    w: "230px",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: "md",
  }

  const overlayOfContainer = {
    w: "100%",
    h: "100%",
    bg: "linear-gradient(0deg, #2D4856 0%, rgba(255, 255, 255, 0) 100%)",
    position: "absolute",
    top: 0,
    borderRadius: "md",
  }
  return (
    <>
      {/* {!firestoreBrands && <SkeletonDiscover />} */}
      <Flex gap={5} flexWrap={"wrap"}>
        {isLoading && <Text>Loading data...</Text>}
        {!isLoading &&
          data.pages?.map((page) => {
            return page.data?.map((brand, index) => {
              const { firstName, lastName, which_best_describes_you, images } =
                brand
              const profilePictures = brand.images

              const path = images[0]?.profile_picture.path
              const imageURL = supabase.storage
                .from(`avatar`)
                .getPublicUrl(path, {
                  transform: {
                    width: 320,
                    height: 240,
                    resize: "cover", // 'cover' | 'fill' | 'contain'
                  },
                })
              console.log({ path, imageURL })
              return (
                <Flex sx={listContainer} key={index}>
                  {profilePictures.length === 0 && (
                    <Image
                      src={"images/brand-placeholder.jpg"}
                      w={"230px"}
                      h={"140px"}
                      borderRadius={"md"}
                    />
                  )}
                  {profilePictures.length > 0 && (
                    <Image
                      src={imageURL.data.publicUrl}
                      w={"230px"}
                      h={"140px"}
                      borderRadius={"md"}
                    />
                  )}
                  <Flex
                    flexDirection={"column"}
                    position={"absolute"}
                    w={"100%"}
                    h={"100%"}
                    pt={3}
                    pb={6}
                    pr={2}
                    pl={4}
                    justifyContent={"space-between"}
                  >
                    <SaveToFavoritesAthleteType />

                    <Flex
                      flexDirection={"column"}
                      gap={1}
                      color={"white"}
                      zIndex={10}
                    >
                      <Text lineHeight={"1.2em"}>
                        {firstName} {lastName}
                      </Text>
                      <Text fontSize={"xs"}>
                        {which_best_describes_you || "-"}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex sx={overlayOfContainer}></Flex>
                </Flex>
              )
            })
          })}
      </Flex>
    </>
  )
}

export default DiscoverAthleteType
