import { Text, Flex, SimpleGrid, Box } from "@chakra-ui/layout"
import { DummyImage } from "react-simple-placeholder-image"
// import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { HomeSkeleton } from "../Skeleton/Skeletons"
import { useEffect, useState } from "react"
import { SkeletonDiscover } from "../Skeleton/SkeletonDiscover"
// import { startListeningToAthleteCollection } from "../../store/actions/Fetch/fetchAthletesAction"
import { SkeletonLoaderAthlete } from "../Skeleton/SkeletonLoaderAthlete"
import supabase from "../../config/supabaseClient"
import { athletesStyle } from "../../styles/athletesStyle"
import { useDispatch, useSelector } from "react-redux"
import { SET_ATHLETES } from "../../store/actions/athleteActions"
import ProfileSocialMedia from "../Profile/ProfileSocialMedia"

const Athletes = () => {
  const dispatch = useDispatch()
  const {currentPage, itemsPerPage, isLoading} = useSelector(state => state.utils.pagination.athletes)
  const athleteList = useSelector(state => state.athlete.athletes)
  // const state = useSelector(state => state)
  // console.log('state: ', state)

  const [show, setShow] = useState(false)
  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShow(true)
    }, 2000)

    return () => clearTimeout(showTimeout)
  }, [])

  useEffect(() => {
    console.log('initial athletes fetch')
    dispatch(SET_ATHLETES())
  }, [currentPage])
  console.log('show: ', show)

  return (
    <>
      {/* {isLoading && (
        <HomeSkeleton />
      )} */}
      {/* {athleteList && !isLoading && ( */}
      <SimpleGrid
        minChildWidth={{
          base: "100%",
          sm: "290px",
          md: "300px",
        }}
        gap={{ base: 3, md: 6 }}
        tabIndex={0}
      >
        {athleteList &&
          athleteList.map((athlete, index) => {
            const { id, lastName, firstName, sports, team } = athlete
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
          })}
        {athleteList && show && (
          <SkeletonLoaderAthlete />
        )}
      </SimpleGrid>
      {/* )} */}
    </>
  )
}

export default Athletes