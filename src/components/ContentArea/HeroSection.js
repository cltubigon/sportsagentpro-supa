import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const HeroSection = () => {
  return (
    <Flex px={"var(--chakra-space-4)"} bg={"blue.800"}>
      <Stack color={"whiteAlpha.900"} py={"130px"} width={"100%"} pl={{base: 0, lg: "50px"}}>
          <Heading as={"h1"} size={"2xl"} lineHeight={"1.2em"}>SUPPORT YOUR <br/>FAVORITE ATHLETES</Heading>
          <Text fontSize={"lg"}>Request social posts, shoutouts, autographs, appearances, and more</Text>
      </Stack>
    </Flex>
  )
}

export default HeroSection