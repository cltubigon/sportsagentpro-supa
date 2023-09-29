import { Button, Flex, GridItem, Icon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from "@chakra-ui/react"
import React, { useRef } from "react"
import { BsTrash } from "react-icons/bs"
import { FiSave } from "react-icons/fi"
import { TfiClose } from "react-icons/tfi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  // deletePost,
  setSubmissionType,
} from "../../store/actions/buildPostActions"

const BuildMenu = () => {
  const initRef = useRef()
  const dispatch = useDispatch()

  const build = useSelector((state) => state.build)

  const { id, activeStep, editMode } = build


  const handleUpdate = () => {
    dispatch(setSubmissionType("update", "sender is BuildMenu line19"))
  }
  const handleDelete = () => {
    // dispatch(deletePost(build, "sender is BuildMenu line 28"))
  }

  const stepDetails = [
    {
      title: "Deal Type",
      description: "Select what type of deal you will be building out",
    },
    {
      title: "Recipients",
      description: "Select which sender you will be sending this for",
    },
    {
      title: "Activities",
      description:
        "Select which activities recipients will be required to complete",
    },
    {
      title: "Details",
      description:
        "Add information about your deal that will be shared with recipients",
    },
    {
      title: "Review",
      description: "Look over all the information you have provided",
    },
    {
      title: "Payment",
      description: "Select your payment method and agree to Opendorse terms",
    },
  ]
  const iconHolder = {
    alignItems: "center",
    gap: 2,
    mt: "-4px",
    cursor: "pointer",
  }
  return (
    <>
      <Flex
        px={20}
        flexGrow={1}
        alignItems={"center"}
        borderBottom={"2px solid #EBEFF2"}
      >
        {stepDetails
          .filter(
            (data) => data.title.toLowerCase().replace(" ", "_") === activeStep
          )
          .map((data, index) => {
            const { title, description } = data
            return (
              <Flex key={index} flexGrow={1} flexDirection={"column"} py={4}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  {title}
                </Text>
                <Text color={"gray.500"} fontSize={"sm"}>
                  {description}
                </Text>
              </Flex>
            )
          })}
        <Flex alignItems={"center"} gap={6}>
          {editMode && (
            <>
              <Popover initialFocusRef={initRef}>
                {({ isOpen, onClose }) => (
                  <>
                    <PopoverTrigger>
                      <Flex sx={iconHolder}>
                        <Icon as={BsTrash} boxSize={4} />
                        <Text fontWeight={"semibold"}>Delete</Text>
                      </Flex>
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
                        // arrowSize={10}
                        bgColor={"gray.200"}
                        borderColor={"gray.400"}
                        borderWidth={"1px"}
                        borderStyle={"solid"}
                      />
                      {/* <PopoverCloseButton /> */}
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
                              onClick={handleDelete}
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
              <Flex sx={iconHolder} onClick={handleUpdate}>
                <Icon as={FiSave} boxSize={4} />
                <Text fontWeight={"semibold"}>Update</Text>
              </Flex>
            </>
          )}
          <Link to={"/opportunities"}>
            <Icon as={TfiClose} boxSize={4} />
          </Link>
        </Flex>
      </Flex>
    </>
  )
}

export default BuildMenu
