import ExploreTeams from './ExploreTeams'
import FeaturedServices from './FeaturedServices'
import ExploreAtheletes from './ExploreAthletes'
import { Stack } from '@chakra-ui/react'

const QuickAccess = () => {
  return (
    <Stack gap={5} px={4} py={8}>
      <FeaturedServices/>
      <ExploreTeams/>
      <ExploreAtheletes/>
    </Stack>
  )
}

export default QuickAccess