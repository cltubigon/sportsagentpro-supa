/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react"
import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react"
import { useRef } from "react"
import { useEffect } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosClose } from "react-icons/io"
import { SearchIcon } from "@chakra-ui/icons"

const MultiSelectInputHook = ({ defaultValues, dropList, ...dynamicProps }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selections, setselections] = useState(defaultValues)
  const [filterValues, setfilterValues] = useState("")
  const dropdownRef = useRef(null)

  const handleFilterValueOnChange = (e) => {
    setfilterValues(e.target.value)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    const searchInput = document.querySelector("#searchInput")
    console.log({ searchInput })
    searchInput.select()
  }

  useEffect(() => {
    if (dynamicProps.onClick) {
      dynamicProps.onClick(selections)
    }
  }, [selections])
  const handleOptionClick = (option) => {
    setselections([...selections, option])
    setIsOpen(false)
  }

  const handleRemoveItem = (e, item) => {
    e.stopPropagation()
    const reducedSelections = selections.filter((values) => values !== item)
    setselections(reducedSelections)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])
  console.log({ filterValues })

  return (
    <Flex
      ref={dropdownRef}
      flexDirection={"column"}
      flexGrow={1}
      position={"relative"}
    >
      {selections?.length === 0 && (
        <Flex
          onClick={toggleDropdown}
          position={"absolute"}
          left={4}
          top={"8px"}
          alignItems={"center"}
          gap={2}
          cursor={"text"}
        >
          <SearchIcon color={'#7182A0'} />
          <Text color={'#7182A0'}>Search...</Text>
        </Flex>
      )}
      <Flex
        onClick={toggleDropdown}
        border={"1px solid #ccc"}
        px={4}
        borderRadius={"md"}
        alignItems={"center"}
        w={"100%"}
        justifyContent={"space-between"}
        minH={"41px"}
        cursor={"text"}
      >
        <Flex gap={1} flexWrap={'wrap'} py={'4px'} >
          {dynamicProps.selectedValues?.map((item, index) => {
            return (
              <Flex
              cursor={"pointer"}
                key={index}
                bgColor={"#2A4365"}
                px={"15px"}
                borderRadius={"100px"}
                color={"white"}
                onClick={(e) => handleRemoveItem(e, item)}
                position={"relative"}
                fontSize={"sm"}
                userSelect={'none'}                
              >
                <Text>{item}</Text>
                <Icon
                  as={IoIosClose}
                  
                  boxSize={5}
                  color={"red"}
                  bgColor={"white"}
                  boxShadow={"lg"}
                  borderRadius={"20px"}
                  position={"absolute"}
                  top={"-5px"}
                  right={"-5px"}
                />
              </Flex>
            )
          })}
        </Flex>
        <Flex>
          <Icon as={BsChevronDown} cursor={"pointer"} />
        </Flex>
      </Flex>
      <Flex
        flexDirection={"column"}
        position={"absolute"}
        top={0}
        left={0}
        zIndex={99}
        bgColor={"white"}
        w={"100%"}
        userSelect={"none"}
        boxShadow={"lg"}
      >
        <InputGroup display={!isOpen && "none"}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color={'#7182A0'} ml={2} />
          </InputLeftElement>
          <Input
            id="searchInput"
            type="text"
            onChange={handleFilterValueOnChange}
            w="100%"
            minH={"42px"}
            borderBottom={"2px solid #ccc"}
          />
        </InputGroup>
        {isOpen && (
          <Flex
            flexDirection={"column"}
            maxH={"200px"}
            overflowY={"scroll"}
            w="100%"
          >
            {dropList
              .filter(
                (item) =>
                  !dynamicProps.selectedValues.some((val) => val === item) &&
                  item.toLowerCase().startsWith(filterValues)
              )
              .map((option, index) => {
                return (
                  <Flex
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    py={3}
                    px={4}
                    borderBottomColor={"gray.100"}
                    borderStyle={"solid"}
                    borderWidth={"1px"}
                    borderLeft="3px solid transparent"
                    _hover={{
                      bgColor: "gray.300",
                      borderLeft: "3px solid #1DA1F2",
                    }}
                    userSelect={"none"}
                    cursor={"pointer"}
                  >
                    {option}
                  </Flex>
                )
              })}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default MultiSelectInputHook
