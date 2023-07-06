import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { startListeningToAthleteCollection } from "../../../store/actions/Fetch/fetchAthletesAction"
import { Flex, Icon, Text } from "@chakra-ui/react"
import {
  BsHeart,
  BsHeartFill,
  BsHeartHalf,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs"
import firstimage from "../../../assets/images/firstimage.jpg"
import { disAthStyle } from "../../../styles/DiscoverAthletesStyle"
import { SkeletonDiscoverAthletes } from "../../Skeleton/SkeletonDiscoverAthletes"

const DiscoverAthletes = () => {
  const dispatch = useDispatch()
  console.count("Athlete rendered")
  const athleteList = useSelector((state) => state.athlete.athletes.data)
  const currentTimeStamp = useSelector(
    (state) => state.athlete.athletes.lastUpdated
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(
      startListeningToAthleteCollection(
        "athlete",
        currentTimeStamp
      )
    )
  }, [])

  useEffect(() => {
    athleteList && setIsLoading(false)
  }, [athleteList])

  return (
    <>
      {isLoading && <SkeletonDiscoverAthletes />}
      <Flex gap={5} flexWrap={"wrap"}>
        {!isLoading &&
          athleteList.map((athlete) => {
            const { id, firstName, lastName } = athlete
            return (
              <Flex sx={disAthStyle.cardContainer} key={id}>
                <Flex
                  sx={disAthStyle.cardTopContainer}
                  bgImage={`url(${firstimage})`}
                >
                  <Flex sx={disAthStyle.cardTopContainerTwo}></Flex>
                  <Flex alignSelf={"flex-end"} pb={"10px"}>
                    <Text sx={disAthStyle.athleteName}>
                      {firstName} {lastName}
                    </Text>
                  </Flex>
                  <Flex sx={disAthStyle.heartIconContainer}>
                    <Flex>
                      <Icon as={BsHeartFill} sx={disAthStyle.heartIcon} />
                    </Flex>
                    <Flex position={"relative"}>
                      <Flex sx={disAthStyle.socialIconsContainer}>
                        <Flex flexDirection={"column"} gap={1}>
                          <Text sx={disAthStyle.socialLikes}>1.4k</Text>
                          <Flex
                            p={"4px"}
                            bgColor={"twitter.500"}
                            borderRadius={"50px"}
                          >
                            <Icon as={BsTwitter} sx={disAthStyle.socialIcons} />
                          </Flex>
                        </Flex>
                        <Flex flexDirection={"column"} gap={1}>
                          <Text sx={disAthStyle.socialLikes}>2.6k</Text>
                          <Flex
                            p={"4px"}
                            bgColor={"pink.500"}
                            borderRadius={"50px"}
                          >
                            <Icon
                              as={BsInstagram}
                              sx={disAthStyle.socialIcons}
                            />
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex sx={disAthStyle.cardBottomContainer}>
                  <Text sx={disAthStyle.athleteDetails}>
                    Football - Senior - Memphis Tigers African, English - Male
                  </Text>
                  <Text sx={disAthStyle.athleteDetails}>
                    Outdoors Food, Sports, Movies & TV
                  </Text>
                </Flex>
              </Flex>
            )
          })}
      </Flex>
    </>
  )
}

export default DiscoverAthletes
