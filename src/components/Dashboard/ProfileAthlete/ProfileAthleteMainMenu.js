import { Flex, Stack, Text } from "@chakra-ui/react"
import ProfileAthleteSubMenu from "./ProfileAthleteSubMenu"

const ProfileAthleteMainMenu = () => {
  const container = {
    grow: 1,
    flexBasis: "100%",
    borderBottom: "1px solid",
    borderBottomColor: "gray.300",
    pb: 6,
  }
  return (
    <Flex flexDirection={"column"} gap={2}>
      <Flex sx={container}>
        <Stack>
          <Text fontSize={"20px"} fontWeight={"semibold"}>
            Account
          </Text>
        </Stack>
      </Flex>

      <ProfileAthleteSubMenu />
    </Flex>
  )
}

export default ProfileAthleteMainMenu
