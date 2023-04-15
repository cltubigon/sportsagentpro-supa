import { Box, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import ExploreTeams from './HeroSection/ExploreTeams'
import FeaturedServices from './HeroSection/FeaturedServices'

const QuickAccess = () => {
  return (
    <Stack gap={10}>
    <FeaturedServices/>
    <ExploreTeams/>
    </Stack>
  )
}

export default QuickAccess