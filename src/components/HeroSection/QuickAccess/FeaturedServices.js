import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'

const FeatServices = () => {
  console.log("FeaturedServices rendered")
  const stackStyle = {
    p: "30px",
    bg: 'blue.800',
    borderRadius: "8px",
    minHeight: "160px",
    maxWidth: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end"
  }
  return (
    <Box>
      <Heading as={"h3"} size={"md"} letterSpacing={"1px"} mb={"12px"}>FEATURED SERVICES</Heading>
      <SimpleGrid columns={{ base: 2 }} color={"white"} minChildWidth={"290px"} spacing='var(--chakra-space-4)'>
        <Stack sx={stackStyle}>
          <Text fontSize={"xl"} lineHeight={"1.2em"}>Birthday shoutouts</Text>
          <Text fontSize={"sm"}>Unique and memorable girts</Text>
        </Stack>
        <Stack sx={stackStyle}>
          <Text fontSize={"xl"} lineHeight={"1.2em"}>Birthday shoutouts</Text>
          <Text fontSize={"sm"}>Unique and memorable girts</Text>
        </Stack>
        <Stack sx={stackStyle}>
          <Text fontSize={"xl"} lineHeight={"1.2em"}>Birthday shoutouts</Text>
          <Text fontSize={"sm"}>Unique and memorable girts</Text>
        </Stack>
        <Stack sx={stackStyle}>
          <Text fontSize={"xl"} lineHeight={"1.2em"}>Birthday shoutouts</Text>
          <Text fontSize={"sm"}>Unique and memorable girts</Text>
        </Stack>
      </SimpleGrid>
    </Box>
  )
}

export default FeatServices
