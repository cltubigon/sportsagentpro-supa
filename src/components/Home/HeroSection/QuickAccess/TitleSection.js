import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const TitleSection = () => {
  const containerStyle = {
    pt: '166px'
  }
  return (
    <Box sx={containerStyle}>
      <Flex bg={"blue.800"} bgImage={"url(images/banner.jpg)"} bgSize={'cover'} bgPosition={'right'} >
        <Flex px={4} w={'100%'} bgColor={{ sph: 'rgba(0, 0, 0, 0.3)', lph: 'unset' }}>

        <Stack color={"whiteAlpha.900"} py={"130px"} width={"100%"} pl={{base: 0, lg: "50px"}}   >
            <Heading as={"h1"} size={"2xl"} lineHeight={"1.2em"}>SUPPORT YOUR <br/>FAVORITE ATHLETES</Heading>
            <Text fontSize={"lg"}>Request social posts, shoutouts, autographs, appearances, and more</Text>
        </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}

export default TitleSection