/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react"
import React from "react"
import { useRef } from "react"

const DeletePopup = ({ handleDelete, post }) => {
  const initRef = useRef()
  const btnStyle = {
    colorScheme: "gray",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "sm",
  }
  return (
    <Popover initialFocusRef={initRef}>
      {/* <Popover initialFocusRef={initRef}> */}
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button sx={btnStyle} borderColor="gray.400">
              Delete
            </Button>
          </PopoverTrigger>
          <PopoverContent
            bgColor={"gray.100"}
            p={2}
            boxShadow={"lg"}
            borderColor={"gray.400"}
            borderWidth={"1px"}
            borderStyle={"solid"}
            borderRadius={"md"}
          >
            <PopoverArrow
              boxShadow={"lg"}
              bgColor={"gray.200"}
              borderColor={"gray.400"}
              borderWidth={"1px"}
              borderStyle={"solid"}
            />
            <PopoverCloseButton />
            <PopoverHeader fontWeight={"semibold"} fontSize={"lg"}>
              Confirm deletion
            </PopoverHeader>
            <PopoverBody>
              <Flex flexDirection={"column"} gap={2}>
                <Flex>Are you sure you want to delete this?</Flex>
                <Flex gap={2} justifyContent={"flex-start"}>
                  <Button w={"90px"} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    w={"90px"}
                    onClick={() => {
                      onClose()
                      handleDelete(post)
                    }}
                    colorScheme="twitter"
                  >
                    Yes
                  </Button>
                </Flex>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}

export default DeletePopup
