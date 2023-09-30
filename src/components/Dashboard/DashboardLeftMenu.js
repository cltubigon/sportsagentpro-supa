import React from "react"
import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react"
import { BiCamera, BiGlobe, BiMessageDetail } from "react-icons/bi"
import { CgMenuGridO } from "react-icons/cg"
import { TbFileDollar } from "react-icons/tb"
// import { Link } from 'react-router-dom'
import { Link, useLocation } from "react-router-dom"
import { BsHouse } from "react-icons/bs"
import { TfiPencilAlt } from "react-icons/tfi"
import { useSelector } from "react-redux"

const DashboardLeftMenu = () => {
  const location = useLocation()
  const pathname = location.pathname

  const profile = useSelector((state) => state.auth.profile)

  const stickyLeftMenu = {
    w: "100%",
    mb: "560px",
    top: "88px",
    py: 4,
    boxSizing: "border-box",
  }
  const leftNavStyle = {
    alignItems: "center",
    gap: 2,
    px: 2,
    py: 3,
    borderLeftWidth: "3px",
    borderStyle: "solid",
  }
  return (
    <>
      <Box>
        <Flex sx={stickyLeftMenu} flexDirection={"column"}>
          {profile && profile.userType === "athlete" && (
            <Link to="/athlete-home">
              <Flex
                sx={leftNavStyle}
                borderColor={
                  pathname === "/athlete-home" ? "blue.400" : "transparent"
                }
              >
                <Icon as={BsHouse} />
                <Text>Home</Text>
              </Flex>
            </Link>
          )}
          <Link to="/network">
            <Flex
              sx={leftNavStyle}
              borderColor={pathname === "/network" ? "blue.400" : "transparent"}
            >
              <Icon as={BiGlobe} />
              <Text>Discover</Text>
            </Flex>
          </Link>
          <Link to="/media">
            <Flex
              sx={leftNavStyle}
              borderColor={pathname === "/media" ? "blue.400" : "transparent"}
            >
              <Icon as={BiCamera} />
              <Text>Media</Text>
            </Flex>
          </Link>
          <Divider borderTop={"1px solid #CBD5E0"} px={2} width={"auto"} />
          <Link to="/opportunities">
            <Flex
              sx={leftNavStyle}
              borderColor={
                pathname === "/opportunities" ? "blue.400" : "transparent"
              }
            >
              <Icon as={CgMenuGridO} />
              <Text>Opportunities</Text>
            </Flex>
          </Link>
          <Link to="/deals">
            <Flex
              sx={leftNavStyle}
              borderColor={pathname === "/deals" ? "blue.400" : "transparent"}
            >
              <Icon as={TbFileDollar} />
              <Text>Deals</Text>
            </Flex>
          </Link>
          {profile && profile.userType === "athlete" && (
            <Link to="/content">
              <Flex
                sx={leftNavStyle}
                borderColor={
                  pathname === "/content" ? "blue.400" : "transparent"
                }
              >
                <Icon as={BiMessageDetail} />
                <Text>Content</Text>
              </Flex>
            </Link>
          )}
          {profile && profile.userType === "athlete" && (
            <Link to="/content">
              <Flex
                sx={leftNavStyle}
                borderColor={
                  pathname === "/content" ? "blue.400" : "transparent"
                }
              >
                <Icon as={TfiPencilAlt} />
                <Text>Disclosures</Text>
              </Flex>
            </Link>
          )}
        </Flex>
      </Box>
    </>
  )
}

export default DashboardLeftMenu
