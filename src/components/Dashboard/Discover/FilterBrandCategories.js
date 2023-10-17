import { ChevronRightIcon, SearchIcon } from "@chakra-ui/icons"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { listBrandCategories } from "../ProfileAthlete/Content/Inputs/profileListOfArrays"

const FilterBrandCategories = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { register, handleSubmit } = useForm()

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
    w: "168px",
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
        <Menu boxShadow={"lg"}>
          <MenuButton
            as={Button}
            sx={menuButton}
            onClick={toggleAccordion}
            rightIcon={<ChevronRightIcon />}
          >
            Category
          </MenuButton>
          <MenuList w={"500px"} px={4} zIndex={99}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input placeholder="Search..." border={"none"} />
            </InputGroup>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Brand categories
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} maxH={"330px"} overflowY={"auto"}>
                  <FormControl>
                    <InputGroup display={"flex"} flexDirection={"column"}>
                      {listBrandCategories.map((category) => {
                        return (
                          <Checkbox value={category} {...register(category)}>
                            {category}
                          </Checkbox>
                        )
                      })}
                    </InputGroup>
                  </FormControl>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Button mt={4} colorScheme="twitter" type="submit" w={"full"}>
              Apply
            </Button>
          </MenuList>
        </Menu>
      </form>
    </>
  )
}

export default FilterBrandCategories
