import ExploreTeams from './HeroSection/ExploreTeams'
import FeaturedServices from './HeroSection/FeaturedServices'
import ExploreAtheletes from './HeroSection/ExploreAthletes'

const QuickAccess = () => {
  console.log("QuickAccess rendered")
  return (
    <>
      <FeaturedServices/>
      <ExploreTeams/>
      <ExploreAtheletes/>
    </>
  )
}

export default QuickAccess