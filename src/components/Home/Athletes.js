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

const Athletes = () => {
  const dispatch = useDispatch()
  console.count("Athlete rendered")
  const athleteList = useSelector((state) => state.athlete.athletes.data)
  const currentTimeStamp = useSelector(state => state.athlete.athletes.lastUpdated)
  const [isLoading, setIsLoading] = useState(true)
  

  // const startTimeRef = useRef(0);

  // useEffect(() => {
  //   startTimeRef.current = performance.now();
  //   console.log("Initial render");

  //   return () => {
  //     console.log("Last re-render");
  //     const endTime = performance.now();
  //     const renderTime = endTime - startTimeRef.current;
  //     console.log("Render time:", renderTime, "ms");
  //   };
  // }, []);

  useEffect(() => {
    dispatch(startListeningToAthleteCollection("athlete", "Wks9w5h2ntpYzLihg9dW", currentTimeStamp))
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
            const { userId, lastName, firstName, sports, team } = athlete
            return (
              <Flex key={userId}>
                <Link to={`/profile/${userId}`}>
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
        </SimpleGrid>
      )}
    </>
  )
}

export default Athletes
