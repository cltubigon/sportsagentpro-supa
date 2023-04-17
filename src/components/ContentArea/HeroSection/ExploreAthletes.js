import { Box, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { CiBaseball, CiBasketball, CiFootball } from "react-icons/ci"
import {
  GiHockey,
  GiMuscleUp,
  GiRunningShoe,
  GiSoccerBall,
} from "react-icons/gi"

const ExploreAtheletes = () => {
  console.log("ExploreAtheletes rendered")
  const iconStyle = {
    justifyContent: "center",
    alignItems: "center",
    boxSize: "6",
    ml: "3px",
  }
  const sportsTypeStyle = {
    alignItems: "center",
    ml: "10px",
    flexGrow: "1",
    fontSize: "sm",
    lineHeight: "1.4em",
  }
  const sportsContainerStyle = {
    px: "2px",
    py: "5px",
    justifyContent: "center",
    border: "1px solid #cdcdcd",
    borderRadius: "100px",
    minHeight: "31px",
    alignItems: "flex-center",
  }
  const flexContainer = {
    px: "var(--chakra-space-4)",
    py: "1em",
  }
  return (
    <Box sx={flexContainer}>
      <Heading as={"h3"} size={"md"} letterSpacing={"1px"} mb={"12px"}>
        EXPLORE ATHLETES
      </Heading>
      <SimpleGrid minChildWidth={"160px"} spacing="var(--chakra-space-2)">
        <Flex sx={sportsContainerStyle}>
          <Flex justifyContent={"center"}>
            <Flex alignItems={"center"}>
              <Icon as={CiFootball} sx={iconStyle} />
            </Flex>
            <Flex sx={sportsTypeStyle}>Football</Flex>
          </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
          <Flex justifyContent={"center"}>
            <Flex alignItems={"center"}>
              <Icon as={CiBaseball} sx={iconStyle} />
            </Flex>
            <Flex sx={sportsTypeStyle}>Baseball</Flex>
          </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
          <Flex justifyContent={"center"}>
            <Flex alignItems={"center"}>
              <Icon as={CiBaseball} sx={iconStyle} />
            </Flex>
            <Flex sx={sportsTypeStyle}>Softball</Flex>
          </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
          <Flex justifyContent={"center"}>
            <Flex alignItems={"center"}>
              <Icon as={CiBasketball} sx={iconStyle} />
            </Flex>
            <Flex sx={sportsTypeStyle}>Basketball</Flex>
          </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
          <Flex justifyContent={"center"}>
            <Flex alignItems={"center"}>
              <Icon as={GiRunningShoe} sx={iconStyle} />
            </Flex>
            <Flex sx={sportsTypeStyle}>Track & Field</Flex>
          </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
          <Flex justifyContent={"center"}>
            <Flex alignItems={"center"}>
              <Icon as={GiSoccerBall} sx={iconStyle} />
            </Flex>
            <Flex sx={sportsTypeStyle}>Soccer</Flex>
          </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
          <Flex justifyContent={"center"}>
            <Flex alignItems={"center"}>
              <Icon as={GiMuscleUp} sx={iconStyle} />
            </Flex>
            <Flex sx={sportsTypeStyle}>Wresling</Flex>
          </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
          <Flex justifyContent={"center"}>
            <Flex alignItems={"center"}>
              <Icon as={GiHockey} sx={iconStyle} />
            </Flex>
            <Flex sx={sportsTypeStyle}>Ice Hockey</Flex>
          </Flex>
        </Flex>
        {/* <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Cross Country</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Volleyball</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Golf</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Cheerleading</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Swimming</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Tennis</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Rowing</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Lacrosse</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Water Polo</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Gymnastics</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Bowling</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Skiing</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Field Hockey</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Diving</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Beach Volleyball</Flex>
            </Flex>
        </Flex>

        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Flag Football</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Fencing</Flex>
            </Flex>
        </Flex>
        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Marathon</Flex>
            </Flex>
        </Flex>

        <Flex sx={sportsContainerStyle}>
            <Flex justifyContent={"center"}>
                <Flex alignItems={"center"}>
                    <Icon as={""} sx={iconStyle} />
                </Flex>
                <Flex sx={sportsTypeStyle} >Rifle</Flex>
            </Flex>
        </Flex> */}
      </SimpleGrid>
    </Box>
  )
}

export default ExploreAtheletes
