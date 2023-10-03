import { Text, Flex, SimpleGrid, Box } from "@chakra-ui/layout"
import { DummyImage } from "react-simple-placeholder-image"
import { Link } from "react-router-dom"
import { SkeletonLoaderAthlete } from "../Skeleton/SkeletonLoaderAthlete"
import { athletesStyle } from "../../styles/athletesStyle"
import ProfileSocialMedia from "../Profile/ProfileSocialMedia"
import { HomeSkeleton } from "../Skeleton/Skeletons"
import useInfiniteQueryData from "../../hooks/useInfiniteQueryData"

const Athletes = () => {
  const { data, isError, error, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQueryData({
      key: "athletes",
      from: "users",
      eqColumn: "userType",
      eqValue: "athlete",
      order: "created_at",
    })

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
          return data.map((athlete, index) => {
            const { id, lastName, firstName, team, sports } = athlete
            return (
              <Flex key={index}>
                <Link to={`/profile/${id}`}>
                  <Flex sx={athletesStyle.cardCOntainer}>
                    <Flex sx={athletesStyle.imageContainer}>
                      <DummyImage
                        bgColor="transparent"
                        width={"330px"}
                        height={240}
                        placeholder="330x170"
                      />
                    </Flex>
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
