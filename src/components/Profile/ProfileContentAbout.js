import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { BsFillPersonVcardFill } from "react-icons/bs"
import { RiFolderUserLine, RiMedalLine } from "react-icons/ri"
import { GiGreekTemple, GiHouse } from "react-icons/gi"
import { CiLocationOn } from "react-icons/ci"

const ProfileContentAbout = ({ query }) => {
  console.log({ query })
  const {
    bio,
    current_team,
    leagues_conferences,
    previous_teams,
    athletic_accolades,
    current_location,
    which_best_describes_you,
    gender_identity,
    ethnicity,
    language,
    hometown,
  } = query.data[0]

  const accolades = athletic_accolades.map((val) => val).join(", ")
  const ethnicities = ethnicity.map((val) => val).join(", ")
  const languages = language.map((val) => val).join(", ")
  const leagues = leagues_conferences.map(val => val).join(', ')
  const prevTeams = previous_teams.map(val => val).join(', ')
  const currTeams = current_team.map(val => val).join(', ')
  return (
    <>
      <Flex borderTop={"1px solid #DCE1E6"} pt={5}>
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          About
        </Text>
      </Flex>

      <Flex gap={4}>
        <Icon
          as={BsFillPersonVcardFill}
          boxSize={"24px"}
          color={"gray.400"}
          mt={"4px"}
        />
        <Box>
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            Biography
          </Text>
          <Text fontSize={"sm"}>{bio}</Text>
        </Box>
      </Flex>

      <Flex gap={4}>
        <Icon
          as={GiGreekTemple}
          boxSize={"24px"}
          color={"gray.400"}
          mt={"4px"}
        />
        <Box>
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            Affiliations
          </Text>
          <Text fontSize={"sm"}>
            {currTeams}{leagues && ' • '}{leagues}{prevTeams && ' • '}{prevTeams}
          </Text>
        </Box>
      </Flex>

      <Flex gap={4}>
        <Icon as={RiMedalLine} boxSize={"24px"} color={"gray.400"} mt={"4px"} />
        <Box>
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            Accolades
          </Text>
          <Text fontSize={"sm"}>
            {accolades}
          </Text>
        </Box>
      </Flex>

      <Flex gap={4}>
        <Icon
          as={CiLocationOn}
          boxSize={"24px"}
          color={"gray.400"}
          mt={"4px"}
        />
        <Box>
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            Location
          </Text>
          <Text fontSize={"sm"}>{current_location}</Text>
        </Box>
      </Flex>

      <Flex gap={4}>
        <Icon
          as={RiFolderUserLine}
          boxSize={"24px"}
          color={"gray.400"}
          mt={"4px"}
        />
        <Box>
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            Background
          </Text>
          <Text fontSize={"sm"}>
            {which_best_describes_you}{gender_identity && ' • '}{gender_identity}{ethnicities && ' • '}{ethnicities}{languages && ' • '}{languages}
          </Text>
        </Box>
      </Flex>

      <Flex gap={4}>
        <Icon as={GiHouse} boxSize={"24px"} color={"gray.400"} mt={"4px"} />
        <Box>
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            Hometown
          </Text>
          <Text fontSize={"sm"}>{hometown}</Text>
        </Box>
      </Flex>
    </>
  )
}

export default ProfileContentAbout
