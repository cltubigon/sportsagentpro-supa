import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react"
import {BiDonateHeart} from 'react-icons/bi'
import {FiUsers} from 'react-icons/fi'
import DiscoverMainMenu from "./Discover/DiscoverMainMenu"

const DashboardMenu = () => {
  
  return (
    <Stack pt={5} pb={3}>
        <DiscoverMainMenu />
    </Stack>
  )
}

export default DashboardMenu
