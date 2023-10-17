import { Stack } from "@chakra-ui/react"
import OppMainMenu from "./Opportunities/OppMainMenu"
import { useLocation } from "react-router-dom"
import MedMainMenu from "./Media/MedMainMenu"
import ProfileAthleteMainMenu from "./ProfileAthlete/ProfileAthleteMainMenu"
import DiscoverMainMenu from "./Discover/DiscoverMainMenu/DiscoverMainMenu"

const DashboardMenu = () => {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <Stack pt={5} pb={3}>
      {pathname === '/network' && <DiscoverMainMenu />}
      {pathname === '/opportunities' && <OppMainMenu />}
      {pathname === '/media' && <MedMainMenu />}
      {pathname === '/profile' && <ProfileAthleteMainMenu />}
    </Stack>
  )
}

export default DashboardMenu
