import { Box, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import ExploreTeams from './HeroSection/ExploreTeams'
import FeaturedServices from './HeroSection/FeaturedServices'
import ExploreAtheletes from './HeroSection/ExploreAthletes'

const QuickAccess = () => {
  console.log("QuickAccess rendered")
  return (
    <Stack gap={10}>
    <FeaturedServices/>
    <ExploreTeams/>
    <ExploreAtheletes/>
    </Stack>
  )
}

export default QuickAccess