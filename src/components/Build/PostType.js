import {
  Box,
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useEditable,
} from "@chakra-ui/react"
import React from "react"
import { useState } from "react"
import {
  FaRunning,
  FaUsers,
  FaCommentDollar,
  FaRegGrinHearts,
  FaUserTie,
} from "react-icons/fa"
import { TfiPencilAlt } from "react-icons/tfi"
import { CgMenuGridO } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { savePostType } from "../../store/actions/PostActions"
import { useEffect } from "react"
import { BsChevronRight } from "react-icons/bs"

const PostType = () => {
  const dispatch = useDispatch()
  const statePostType = useSelector((state) => state.post.postType)
  const typeOfUsers = [
    {
      icon: TfiPencilAlt,
      type: "Offer",
      value: "offer",
      desc: "Offers are deals that are sent directly to one or more recipients, allowing you to target exactly who you want.",
      id: 1,
    },
    {
      icon: CgMenuGridO,
      type: "Opportunity",
      value: "opportunity",
      desc: "Opportunities are posted for all users in the marketplace to review and apply to, giving you the flexibility to select from a pool of applicants.",
      id: 2,
    },
  ]

  const selected = {
    bg: "blue.100",
    boxShadow: "md",
    color: "gray.800",
  }
  const contentContainer = {
    minHeight: '47vh',
    my: 4,
  }
  return (
    <>
      <Flex
        flexDirection={"column"}
        py={10}
        px={20}
        position={"relative"}
        flexGrow={1}
        justifyContent={"space-between"}
      >
        <Flex flexGrow={1} flexDirection={"column"}>
          <Flex sx={contentContainer} flexGrow={1}>
            <Flex width={'100%'} gap={6} flexDirection={'column'}>
              {typeOfUsers.map((type) => {
                return (
                  <Flex sx={statePostType === type.value && selected} cursor={"pointer"} border={"1px solid #B8BFC5"} pr={6} py={5} key={type.id} borderRadius={4} onClick={() => dispatch(savePostType(type.value))}>
                    <Flex alignItems={"center"} justifyContent={"center"} w={"64px"}>
                      <Icon color={"gray.500"} boxSize={6} as={type.icon} />
                    </Flex>
                    <Box>
                      <Text fontWeight={"semibold"}>{type.type}</Text>
                      <Text fontSize={"sm"}>{type.desc}</Text>
                    </Box>
                  </Flex>
                )
              })}
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent={"flex-end"}>
          <Button rightIcon={<BsChevronRight />} colorScheme="twitter" >
            Next Step
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default PostType
