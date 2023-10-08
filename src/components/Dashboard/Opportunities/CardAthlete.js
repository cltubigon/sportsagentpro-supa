/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react"
import imageHolderRemovable from "../../../assets/images/imageHolderRemovable.png"
import { FaCircle } from "react-icons/fa"
import { BsHeart, BsLink45Deg } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import React from "react"
import { comStyle } from "./styleAthleteOpportunities"
import DisplayQuillContent from "../../RichTextEditor/ReactQuill/DisplayQuillContent"
import { SET_SHOW_DRAWER } from "../../../store/actions/utilsActions"
import useUpdatePostApplicantsMutateData from "../../../hooks/SpecificQueries/useUpdatePostApplicantsMutateData"

const CardAthlete = ({ post, pageNumber }) => {
  const dispatch = useDispatch()
  const userID = useSelector((state) => state.auth.user.userID)
  const {
    totalAmount,
    postApplicants,
    postTitle,
    postContent,
    postOwnerFirstName,
    postOwnerLastName,
    selectedActivities,
    postExpirationDate,
    id,
  } = post

  const formatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const formattedAmount = formatter.format(parseFloat(totalAmount))

  const { mutate } = useUpdatePostApplicantsMutateData({
    mainKey: ['posts', pageNumber],
    from: "posts",
    updateColumn: "postApplicants",
    eqColumn: "id",
    eqValue: id,
  })

  const hasApplied = postApplicants?.some((applicantID) => {
    return userID === applicantID
  })

  const handleApply = (e) => {
    console.log({ e })
    e.stopPropagation()
    if (hasApplied) {
      const updateValue = postApplicants?.filter(
        (applicantID) => applicantID !== userID
      )
      console.log({ updateValue })
      mutate(updateValue)
    }
    if (!hasApplied) {
      const updateValue = [...postApplicants, userID]
      console.log({ updateValue })
      mutate(updateValue)
    }
  }

  const handleDrawer = (id) => {
    console.log("handleDrawer is triggered")
    dispatch(SET_SHOW_DRAWER(id, pageNumber, postApplicants))
  }

  const { postContainer } = comStyle

  const btnStyle = {
    colorScheme: "gray",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "sm",
  }

  const btnVariant = {
    applied: {
      borderColor: "blue.400",
      color: "blue.400",
    },
    notApplied: {
      borderColor: "gray.400",
    },
  }
  return (
    <Flex
      flexDirection={"column"}
      borderColor={"gray.200"}
      borderWidth={"1px"}
      borderStyle={"solid"}
      borderRadius={"md"}
      w={"320px"}
      h={"428px"}
      position={"relative"}
    >
      <Flex onClick={() => handleDrawer(id)} sx={postContainer}>
        <Flex gap={2} bgColor={"gray.100"} p={4} borderRadius={"md"}>
          <Image
            src={imageHolderRemovable}
            maxW={"46px"}
            bgColor={"red"}
            alt="Dan Abramov"
            borderColor={"gray.300"}
            borderWidth={"1px"}
            borderStyle={"solid"}
            borderRadius={"sm"}
          />
          <Flex flexDirection={"column"}>
            <Text fontSize={"lg"} fontWeight={"semibold"}>
              {postOwnerFirstName} {postOwnerLastName}
            </Text>
            <Flex alignItems={"center"} gap={3}>
              <Text fontSize={"sm"}>Open</Text>
              <Icon as={FaCircle} color={"green.400"} boxSize={2} />
            </Flex>
          </Flex>
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            gap={2}
            ml={"auto"}
          >
            <Icon as={BsHeart} boxSize={4} />
            <Icon as={BsLink45Deg} boxSize={6} />
          </Flex>
        </Flex>
        <Flex flexDirection={"column"} p={4} gap={1}>
          <Text noOfLines={[1]} fontWeight={"semibold"} maxW={"190px"}>
            {postTitle}
          </Text>
          <Box noOfLines={[1, 2]} mb={4} color={"gray.500"}>
            <DisplayQuillContent
              quillContent={postContent}
              displayTo={"Cards"}
            />
          </Box>
          <Flex gap={2} flexWrap={"nowrap"}>
            <Text color={"gray.500"}>Activities:</Text>
            <Text noOfLines={[1]} fontWeight={"semibold"} maxW={"190px"}>
              {selectedActivities[0].activityTitle}
            </Text>
            <Text fontWeight={"semibold"} maxW={"190px"}>
              +{selectedActivities.length}
            </Text>
          </Flex>
          <Flex gap={2}>
            <Text color={"gray.500"}>Total:</Text>
            <Text fontWeight={"semibold"}>${formattedAmount}</Text>
          </Flex>
          <Flex gap={2}>
            <Text color={"gray.500"}>Expires:</Text>
            <Text fontWeight={"semibold"}>
              {(postExpirationDate.utcFormat !== "Invalid Date" &&
                postExpirationDate.utcFormat) ||
                "-"}
            </Text>
          </Flex>
          <Flex gap={2}>
            <Text color={"gray.500"}>Tags:</Text>
            <Text fontWeight={"semibold"}>-</Text>
          </Flex>
        </Flex>
        <Flex
          justifyContent={"center"}
          gap={2}
          px={4}
          position={"absolute"}
          bottom={4}
          w={"100%"}
          flexDirection={"column"}
        >
          <Button
            sx={hasApplied ? btnVariant.applied : btnVariant.notApplied}
            w={"100%"}
            borderWidth="1px"
            borderStyle="solid"
            borderRadius="sm"
            onClick={handleApply}
          >
            {hasApplied ? "Withdraw" : "Apply"}
          </Button>
          <Button sx={btnStyle} w={"100%"}>
            Details
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CardAthlete
