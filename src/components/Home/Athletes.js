import { Text, Flex, SimpleGrid, Box } from "@chakra-ui/layout"
import { DummyImage } from "react-simple-placeholder-image"
import ProfileSocialMedia from "../Profile/ProfileSocialMedia"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { HomeSkeleton } from "../Skeleton/Skeletons"
import { useEffect, useState } from "react"
import { SkeletonDiscover } from "../Skeleton/SkeletonDiscover"
import { athletesStyle } from "../../styles/athletesStyle"
import { startListeningToAthleteCollection } from "../../store/actions/Fetch/fetchAthletesAction"
import { SkeletonLoaderAthlete } from "../Skeleton/SkeletonLoaderAthlete"

const Athletes = () => {
  const dispatch = useDispatch()
  const athleteList = useSelector((state) => state.athlete.athletes.data)
  const currentTimeStamp = useSelector(state => state.athlete.athletes.lastUpdated)
  const { lastItemReached, lastVisible } = useSelector(state => state.utils.pagination.athletes)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    dispatch(startListeningToAthleteCollection(currentTimeStamp))
  }, [])

  useEffect(() => {
    athleteList && setIsLoading(false)
  }, [athleteList])
  return (
    <>
      {isLoading && (
        <HomeSkeleton />
      )}
      {athleteList && !isLoading && (
        <SimpleGrid
          minChildWidth={{
            base: "100%",
            sm: "290px",
            md: "300px",
          }}
          gap={{ base: 3, md: 6 }}
          tabIndex={0}
        >
          {athleteList && athleteList.map((athlete, index) => {
            const { id, lastName, firstName, sports, team } = athlete
            return (
              <Flex key={id}>
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
          })}
          {athleteList && !lastItemReached && <SkeletonLoaderAthlete />}
        </SimpleGrid>
      )}
    </>
  )
}

export default Athletes
