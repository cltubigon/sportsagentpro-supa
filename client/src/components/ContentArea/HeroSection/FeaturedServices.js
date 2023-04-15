import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const FeaturedServices = () => {
  return (
    <Box>
      <Heading as={"h3"} size={"md"} letterSpacing={"1px"} mb={"12px"}>FEATURED SERVICES</Heading>
      <SimpleGrid color={"white"} minChildWidth={"290px"} spacing='var(--chakra-space-4)'>
        <Stack p={"30px"} bg='blue.800' borderRadius={"8px"} minHeight={"160px"} alignItems={"flex-start"} justifyContent={"flex-end"}>
          <Text fontSize={"xl"} lineHeight={"1.2em"}>Birthday shoutouts</Text>
          <Text fontSize={"sm"}>Unique and memorable girts</Text>
        </Stack>
        <Stack p={"30px"} bg='blue.800' borderRadius={"8px"} minHeight={"160px"} alignItems={"flex-start"} justifyContent={"flex-end"}>
          <Text fontSize={"xl"} lineHeight={"1.2em"}>Birthday shoutouts</Text>
          <Text fontSize={"sm"}>Unique and memorable girts</Text>
        </Stack>
        <Stack p={"30px"} bg='blue.800' borderRadius={"8px"} minHeight={"160px"} alignItems={"flex-start"} justifyContent={"flex-end"}>
          <Text fontSize={"xl"} lineHeight={"1.2em"}>Birthday shoutouts</Text>
          <Text fontSize={"sm"}>Unique and memorable girts</Text>
        </Stack>
        <Stack p={"30px"} bg='blue.800' borderRadius={"8px"} minHeight={"160px"} alignItems={"flex-start"} justifyContent={"flex-end"}>
          <Text fontSize={"xl"} lineHeight={"1.2em"}>Birthday shoutouts</Text>
          <Text fontSize={"sm"}>Unique and memorable girts</Text>
        </Stack>
      </SimpleGrid>
    </Box>
  )
}

export default FeaturedServices
