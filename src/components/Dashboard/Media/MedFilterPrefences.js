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

const MedFilterPreferences = () => {
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
            Preferences
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
                    Identifier
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} maxH={"330px"} overflowY={"scroll"}>
                  <FormControl>
                    <InputGroup display={"flex"} flexDirection={"column"}>
                      <Checkbox
                        value="professional-athlete"
                        {...register("identifier")}
                      >
                        Professional athlete
                      </Checkbox>
                      <Checkbox
                        value="student-athlete"
                        {...register("identifier")}
                      >
                        Student athlete
                      </Checkbox>
                      <Checkbox
                        value="retired-athlete"
                        {...register("identifier")}
                      >
                        Retired athlete
                      </Checkbox>
                      <Checkbox value="coach" {...register("identifier")}>
                        Coach
                      </Checkbox>
                      <Checkbox value="staff" {...register("identifier")}>
                        Staff
                      </Checkbox>
                      <Checkbox value="trainer" {...register("identifier")}>
                        Trainer
                      </Checkbox>
                      <Checkbox value="broadcaster" {...register("identifier")}>
                        Broadcaster
                      </Checkbox>
                      <Checkbox value="sports-exec" {...register("identifier")}>
                        Sports-exec
                      </Checkbox>
                      <Checkbox value="agent" {...register("identifier")}>
                        Agent
                      </Checkbox>
                      <Checkbox
                        value="talent agency"
                        {...register("identifier")}
                      >
                        Talent agency
                      </Checkbox>
                      <Checkbox
                        value="professional-athlete"
                        {...register("identifier")}
                      >
                        Professional athlete
                      </Checkbox>
                      <Checkbox
                        value="student-athlete"
                        {...register("identifier")}
                      >
                        Student athlete
                      </Checkbox>
                      <Checkbox
                        value="retired-athlete"
                        {...register("identifier")}
                      >
                        Retired athlete
                      </Checkbox>
                      <Checkbox value="coach" {...register("identifier")}>
                        Coach
                      </Checkbox>
                      <Checkbox value="staff" {...register("identifier")}>
                        Staff
                      </Checkbox>
                      <Checkbox value="trainer" {...register("identifier")}>
                        Trainer
                      </Checkbox>
                      <Checkbox value="broadcaster" {...register("identifier")}>
                        Broadcaster
                      </Checkbox>
                      <Checkbox value="sports-exec" {...register("identifier")}>
                        Sports-exec
                      </Checkbox>
                      <Checkbox value="agent" {...register("identifier")}>
                        Agent
                      </Checkbox>
                      <Checkbox
                        value="talent agency"
                        {...register("identifier")}
                      >
                        Talent agency
                      </Checkbox>
                    </InputGroup>
                  </FormControl>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Sport
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} maxH={"330px"} overflowY={"auto"}>
                  <FormControl>
                    <InputGroup display={"flex"} flexDirection={"column"}>
                      <Checkbox
                        value="professional-athlete"
                        {...register("sport")}
                      >
                        Professional athlete
                      </Checkbox>
                      <Checkbox value="student-athlete" {...register("sport")}>
                        Student athlete
                      </Checkbox>
                      <Checkbox value="retired-athlete" {...register("sport")}>
                        Retired athlete
                      </Checkbox>
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

export default MedFilterPreferences
