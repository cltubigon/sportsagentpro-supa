import { Text, Flex, SimpleGrid, Box } from "@chakra-ui/layout"
import { DummyImage } from "react-simple-placeholder-image"
import ProfileSocialMedia from "../Profile/ProfileSocialMedia"
import { useDispatch, useSelector } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { Link, useLocation } from "react-router-dom"
import { HomeSkeleton } from "../Skeleton/Skeletons"
import { useEffect } from "react"
import { saveAthletesToStorage } from "../../store/actions/athleteActions"
import { SkeletonDiscover } from "../Skeleton/SkeletonDiscover"

const Athletes = () => {
  const post = useSelector((state) => state.post)
  const auth = useSelector((state) => state.auth)
  console.log("post: ", post)
  console.log("auth: ", auth)

  return (
    <>
    <Flex>
      <Text>Loading...</Text>
    </Flex>
      {/* {!firestoreAthletes && <HomeSkeleton />}
      {firestoreAthletes && (
        <SimpleGrid
          minChildWidth={{
            base: "100%",
            sm: "290px",
            md: isNetworkPage ? "250px" : "300px",
          }}
          gap={{ base: 3, md: 6 }}
          tabIndex={0}
        >
          {firestoreAthletes.map((athlete) => {
            return (
              <div key={athlete.id}>
                <Link to={`/profile/${athlete.id}`}>
                  <Flex sx={cardCOntainer}>
                    <Flex sx={imageContainer}>
                      <DummyImage
                        bgColor="transparent"
                        width={"330px"}
                        height={240}
                        placeholder="330x170"
                      />
                    </Flex>
                    <Flex flexDirection={"column"} gap={1}>
                      <Text sx={cardAthleteName}>
                        {athlete.firstName} {athlete.lastName}
                      </Text>
                      <Text sx={cardSportsType}>
                        {athlete.sports} • {athlete.team}
                      </Text>
                      <Box sx={cardSocialMedia}>
                        <ProfileSocialMedia />
                      </Box>
                    </Flex>
                  </Flex>
                </Link>
              </div>
            )
          })}
        </SimpleGrid>
      )} */}
    </>
  )
}

export default firestoreConnect([{ collection: "athlete" }])(Athletes)
