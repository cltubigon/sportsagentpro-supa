import { Button, Flex, Input, InputGroup, InputLeftElement, useColorModeValue } from "@chakra-ui/react"
import {GiSettingsKnobs} from 'react-icons/gi'
import {BsSearch, BsSortDownAlt} from 'react-icons/bs'
import React from "react"

const SubNavigation = () => {
  console.log("--------------------------Subnavigation")

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
        <InputGroup >
          <InputLeftElement pointerEvents="none" children={<BsSearch color="gray.300" />} />
          <Input type="text" placeholder="Search" />
        </InputGroup>
      </Flex>
      <Flex gap={2}>
        <Button leftIcon={<GiSettingsKnobs />} border={`1px solid #ccc`}>Email</Button>
        <Button leftIcon={<BsSortDownAlt />}  border={`1px solid #ccc`} >Sort: Recommended</Button>
      </Flex>
    </Flex>
  )
}

export default SubNavigation