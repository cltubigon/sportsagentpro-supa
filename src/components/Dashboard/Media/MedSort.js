import { SearchIcon } from "@chakra-ui/icons"
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { BsSortDown } from "react-icons/bs"

const MedSort = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log("data: ", data)
  }

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }
  const menuButton = {
    border: "1px solid #E4E7EB",
    bg: "transparent",
    textAlign: "left",
    color: "#ADCE6F",
    _hover: {
      bg: "transparent",
    },
    _active: {
      _hover: {
        bg: "transparent",
      },
    },
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Menu>
          <MenuButton
            as={Button}
            sx={menuButton}
            onClick={toggleAccordion}
            leftIcon={<BsSortDown />}
          >
            Sort
          </MenuButton>
          <MenuList w={"500px"} px={4} zIndex={99}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                placeholder="Search..."
                border={"none"}
                borderBottom={"1px solid #E4E7EB"}
              />
            </InputGroup>

            <FormControl py={4}>
              <InputGroup display={"flex"} flexDirection={"column"}>
                <RadioGroup name="sort">
                  <Stack direction="column">
                    <Radio value="1">First</Radio>
                    <Radio value="2">Second</Radio>
                    <Radio value="3">Third</Radio>
                  </Stack>
                </RadioGroup>
              </InputGroup>
            </FormControl>
          </MenuList>
        </Menu>
      </form>
    </>
  )
}

export default MedSort
