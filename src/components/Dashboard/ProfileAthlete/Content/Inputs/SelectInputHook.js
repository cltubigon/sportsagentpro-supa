import React, { useState } from "react"
// import "./CustomDropdown.css" // Import your CSS file
import { Flex, Icon } from "@chakra-ui/react"
import { useRef } from "react"
import { useEffect } from "react"
import { BsChevronDown } from "react-icons/bs"

const SelectInputHook = ({ dropList, ...dynamicProps }) => {
  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    if (dynamicProps.onClick) {
      dynamicProps.onClick(option)
    }
    setIsOpen(false)
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

  console.log({ isOpen, dynamicProps, dropList })

  return (
    <Flex
      ref={dropdownRef}
      flexDirection={"column"}
      flexGrow={1}
      position={"relative"}
    >
      <Flex
        onClick={toggleDropdown}
        border={"1px solid #ccc"}
        py={2}
        px={4}
        borderRadius={"md"}
        cursor={"pointer"}
        alignItems={"center"}
        w={"calc(100% - 16px)"}
        justifyContent={"space-between"}
      >
        {dynamicProps.selectedValue || "Select an option"}
        <Flex>
          <Icon as={BsChevronDown} />
        </Flex>
      </Flex>
      <Flex
        flexDirection={"column"}
        position={"absolute"}
        top={'42px'}
        left={0}
        zIndex={99}
        bgColor={"white"}
        w={"calc(100% - 16px)"}
        userSelect={"none"}
        boxShadow={'0px 3px 6px 1px rgba(0, 0, 0, 0.2)'}
      >
        {isOpen && (
          <Flex
            flexDirection={"column"}
            maxH={"200px"}
            overflowY={"scroll"}
            w={"calc(100% - 16px)"}
          >
            {dropList.map((option, index) => {
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

export default SelectInputHook
