import { Flex, Text } from "@chakra-ui/react"
import React from "react"

const ProfileAthleteLeftNav = () => {
  return (
    <Flex flexDirection={"column"} minW={'120px'} userSelect={'none'} gap={1} py={2} fontSize={'sm'} fontWeight={'semibold'} >
      <Text py={1} px={2} bgColor={'gray.200'}>Profile details</Text>
      <Text py={1} px={2} color={'gray.500'}>Social channels</Text>
      <Text py={1} px={2} color={'gray.500'}>Deals</Text>
      <Text py={1} px={2} color={'gray.500'}>Disclosure</Text>
    </Flex>
  )
}

export default ProfileAthleteLeftNav
