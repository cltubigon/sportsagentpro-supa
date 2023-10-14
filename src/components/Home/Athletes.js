import { Text, Flex, SimpleGrid, Box } from "@chakra-ui/layout"
import { DummyImage } from "react-simple-placeholder-image"
import { Link } from "react-router-dom"
import { SkeletonLoaderAthlete } from "../Skeleton/SkeletonLoaderAthlete"
import { athletesStyle } from "../../styles/athletesStyle"
import ProfileSocialMedia from "../Profile/ProfileSocialMedia"
import { HomeSkeleton } from "../Skeleton/Skeletons"
import useInfiniteQueryData from "../../hooks/useInfiniteQueryData"
import supabase from "../../config/supabaseClient"
import { Image } from "@chakra-ui/react"

const Athletes = () => {
  const { data, isError, error, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQueryData({
      key: "athletes",
      from: "users",
      eqColumn: "userType",
      eqValue: "athlete",
      order: "created_at",
    })

  // const imageURL = supabase.storage.from(`avatar`).getPublicUrl(pathName)

  if (isError) {
    return (
      <Text fontSize={"4xl"} fontWeight={"bold"}>
        {error.message}
      </Text>
    )
  }
  return (
    <>
      {isLoading && <HomeSkeleton />}
      <SimpleGrid
        minChildWidth={{
          base: "100%",
          sm: "290px",
          md: "300px",
        }}
        gap={{ base: 3, md: 6 }}
        tabIndex={0}
      >
        {data?.pages.map(({ data }) => {
          return data?.map((athlete, index) => {
            const { id, lastName, firstName, team, sports, images } = athlete
            const path = images[0]?.meta_data.path
            const imageURL = supabase.storage.from(`avatar`).getPublicUrl(path)
            const urlIsUndefined =
              imageURL?.data?.publicUrl.includes("undefined")
            console.log({ path })
            console.log({ athlete })
            return (
              <Flex key={index}>
                <Link to={`/profile/${id}`}>
                  <Flex sx={athletesStyle.cardCOntainer}>
                    {imageURL && !urlIsUndefined && (
                      <Flex
                        sx={athletesStyle.imageContainer}
                        bgImage={imageURL && imageURL.data.publicUrl}
                      ></Flex>
                    )}
                    {imageURL && urlIsUndefined && (
                      <Flex
                        sx={athletesStyle.imageContainer}
                        bgImage={"url(images/athlete-placeholder.jpg)"}
                      ></Flex>
                    )}
                    <Flex flexDirection={"column"} gap={1}>
                      <Text sx={athletesStyle.cardAthleteName}>
                        {firstName} {lastName}
                      </Text>
                      <Text sx={athletesStyle.cardSportsType}>
                        {sports} • {team}
                      </Text>
                      <Box sx={athletesStyle.cardSocialMedia}>
                        <ProfileSocialMedia />
                      </Box>
                    </Flex>
                  </Flex>
                </Link>
              </Flex>
            )
          })
        })}
        {hasNextPage && <SkeletonLoaderAthlete fetchNextPage={fetchNextPage} />}
      </SimpleGrid>
    </>
  )
}

export default Athletes
