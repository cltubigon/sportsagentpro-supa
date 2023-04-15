import { Box, Button, Flex, IconButton, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { Icon, ReactIcon, Search2Icon } from '@chakra-ui/icons'
import {GiSettingsKnobs} from 'react-icons/gi'
import {BsSearch, BsSortDownAlt} from 'react-icons/bs'
import React from "react"

const SubNavigation = () => {
  return (
    <Flex w={"full"} py={"20px"} gap={2} justifyContent={"space-between"}>
      <Flex w={"350px"}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<BsSearch color="gray.300" />} />
          <Input type="text" placeholder="Search"  border={"1px solid gray"} />
        </InputGroup>
      </Flex>
      <Flex gap={2}>
        <Button leftIcon={<GiSettingsKnobs />} variant='solid' border={"1px solid gray"}>Email</Button>
        <Button leftIcon={<BsSortDownAlt />} variant='solid' border={"1px solid gray"} >Sort: Recommended</Button>
      </Flex>
    </Flex>
  )
}

export default SubNavigation