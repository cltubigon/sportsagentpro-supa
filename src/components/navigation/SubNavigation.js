import { Button, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import {GiSettingsKnobs} from 'react-icons/gi'
import {BsSearch, BsSortDownAlt} from 'react-icons/bs'
import React from "react"

const SubNavigation = () => {
  const flexContainer = {
    w: "full",
    py: "20px",
    gap: 2,
    justifyContent: "space-between",
    px: "var(--chakra-space-4)",
  }
  return (
    <Flex sx={flexContainer}>
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