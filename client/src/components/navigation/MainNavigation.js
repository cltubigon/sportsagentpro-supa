import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react"

const MainNavigation = () => {
    const flexContainer = {
        px: "var(--chakra-space-4)",
        color: "white",
        justifyContent: "space-between",
        bg: "blue.800",
        py: "20px",
    }
  return (
    <Flex sx={flexContainer}>
        <Box>
        <Heading as={"h3"} fontSize={"3xl"}>
            Sports Agent Pro
        </Heading>
        </Box>
        <Flex gap={10} alignItems={"center"} >
        <Text>Deals</Text>
        <Text>Profile</Text>
        <Text>Help Center</Text>
        <Text>Logout</Text>
        <Avatar></Avatar>
        </Flex>
  </Flex>
  )
}

export default MainNavigation