/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Icon, Text } from "@chakra-ui/react"
import { BsHeartFill, BsInstagram, BsTwitter } from "react-icons/bs"
import { disAthStyle } from "../../../../styles/DiscoverAthletesStyle"

const DiscoverBrandType = () => {
  console.count("Brand network rendered")

  return (
    <>
      {/* {isLoading && <SkeletonDiscoverAthletes />} */}
      <Flex gap={5} flexWrap={"wrap"}>
        <Flex sx={disAthStyle.cardContainer} key={"id"}>
          <Flex
            sx={disAthStyle.cardTopContainer}
            bgImage={`url('images/firstimage.jpg')`}
          >
            <Flex sx={disAthStyle.cardTopContainerTwo}></Flex>
            <Flex alignSelf={"flex-end"} pb={"10px"}>
              <Text sx={disAthStyle.athleteName}>
                {/* {firstName} {lastName} */}
                Carlo Tubigon
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
                    <Flex p={"4px"} bgColor={"pink.500"} borderRadius={"50px"}>
                      <Icon as={BsInstagram} sx={disAthStyle.socialIcons} />
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
      </Flex>
    </>
  )
}

export default DiscoverBrandType
