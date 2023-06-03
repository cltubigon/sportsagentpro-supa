import React from "react"
import { Box, Divider, Flex, Icon, Stack, Text } from "@chakra-ui/react"
import { BiCamera, BiGlobe, BiMenu, BiMessageDetail } from "react-icons/bi"
import { CgMenuGridO } from "react-icons/cg"
import { TbFileDollar } from "react-icons/tb"
// import { Link } from 'react-router-dom'
import { Link, useLocation } from "react-router-dom"
import { BsHouse } from "react-icons/bs"
import { TfiPencilAlt } from "react-icons/tfi"

const DashboardLeftMenu = () => {
    const location = useLocation()
    const pathname = location.pathname
    console.log('pathname: ', pathname)

  const stickyLeftMenu = {
    w: "100%",
    mb: "560px",
    top: "88px",
    py: 4,
    boxSizing: 'border-box',
  }
  const leftNavStyle = {
    alignItems: "center",
    gap: 2,
    px: 2,
    py: 3,
  }
  return (
    <>
      <Box>
        <Flex sx={stickyLeftMenu} flexDirection={'column'}>
            <Link to="/athlete-home">
              <Flex sx={leftNavStyle} borderColor={pathname == '/athlete-home' ? 'blue.400' : 'transparent'} borderLeftWidth={'3px'} borderStyle={'solid'} >
                <Icon as={BsHouse} />
                <Text>Home</Text>
              </Flex>
            </Link>
            <Link to="/network">
              <Flex sx={leftNavStyle} borderColor={pathname == '/network' ? 'blue.400' : 'transparent'} borderLeftWidth={'3px'} borderStyle={'solid'} >
                <Icon as={BiGlobe} />
                <Text>Discover</Text>
              </Flex>
            </Link>
            <Link to="/media">
              <Flex sx={leftNavStyle} borderColor={pathname === '/media' ? 'blue.400' : 'transparent'} borderLeftWidth={'3px'} borderStyle={'solid'}>
                <Icon as={BiCamera} />
                <Text>Media</Text>
              </Flex>
            </Link>
          <Divider borderTop={"1px solid #CBD5E0"} px={2} width={'auto'} />
          <Link to="/opportunities">
            <Flex sx={leftNavStyle} borderColor={pathname === '/opportunities' ? 'blue.400' : 'transparent'} borderLeftWidth={'3px'} borderStyle={'solid'}>
              <Icon as={CgMenuGridO} />
              <Text>Opportunities</Text>
            </Flex>
          </Link>
          <Link to='/deals'>
          <Flex sx={leftNavStyle} borderColor={pathname === '/deals' ? 'blue.400' : 'transparent'} borderLeftWidth={'3px'} borderStyle={'solid'}>
            <Icon as={TbFileDollar} />
            <Text>Deals</Text>
          </Flex>
          </Link>
          <Link to="/content">
            <Flex sx={leftNavStyle} borderColor={pathname === '/content' ? 'blue.400' : 'transparent'} borderLeftWidth={'3px'} borderStyle={'solid'}>
              <Icon as={BiMessageDetail} />
              <Text>Content</Text>
            </Flex>
          </Link>
          <Link to="/content">
            <Flex sx={leftNavStyle} borderColor={pathname === '/content' ? 'blue.400' : 'transparent'} borderLeftWidth={'3px'} borderStyle={'solid'}>
              <Icon as={TfiPencilAlt} />
              <Text>Disclosures</Text>
            </Flex>
          </Link>
        </Flex>
      </Box>
    </>
  )
}

export default DashboardLeftMenu
