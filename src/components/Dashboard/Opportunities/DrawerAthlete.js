/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react"
import { BsFillPersonFill } from "react-icons/bs"
import { FaCircle } from "react-icons/fa"
import { comStyle } from "./styleAthleteOpportunities"
import { useEffect, useState } from "react"
import DisplayQuillContent from "../../RichTextEditor/ReactQuill/DisplayQuillContent"
import { activityList } from "../../Build/activityList"
import { useDispatch, useSelector } from "react-redux"
import { SET_SHOW_DRAWER } from "../../../store/actions/utilsActions"
import { motion } from "framer-motion"
import useItemQueryPaginatedData from "../../../hooks/useItemQueryPaginatedData"
import useUpdateIndividualPostApplicantsMutateData from "../../../hooks/SpecificQueries/useUpdateIndividualPostApplicantsMutateData"

const DrawerAthlete = () => {
  console.log("drawer athlete rendered")
  const dispatch = useDispatch()
  const toast = useToast()
  const { postID, pageNumber } = useSelector((state) => state.utils.postDrawer)
  const userID = useSelector((state) => state.auth.user.userID)
  const [drawerExit, setDrawerExit] = useState(false)
  const { sectionContainer, drawer } = comStyle
  const [minimizeBrief, setMinimizeBrief] = useState(true)

  const { data, isLoading, isError, error } = useItemQueryPaginatedData({
    key: ["post", postID],
    mainKey: ["posts", pageNumber],
    from: "posts",
    eqColumn: "id",
    eqValue: postID,
    pageNumber: pageNumber,
  })

  const { mutate } = useUpdateIndividualPostApplicantsMutateData({
    mainKey: ["post", postID],
    from: "posts",
    updateColumn: "postApplicants",
    eqColumn: "id",
    eqValue: postID,
    pageNumber: pageNumber,
    userID: userID,
  })

  const post = data?.[0]
  const hasApplied = post?.postApplicants?.includes(userID)

  useEffect(() => {
    if (drawerExit) {
      const timeout = setTimeout(() => {
        dispatch(SET_SHOW_DRAWER(null))
      }, 400)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [drawerExit])

  if (isError) {
    toast({
      title: "Something went wrong",
      description: error.message,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    })
  }

  const handleViewMoreBrief = () => {
    setMinimizeBrief((prev) => !prev)
  }

  const handleHideDrawer = () => {
    setDrawerExit((prev) => !prev)
  }

  const handleApplyWithdraw = () => {
    if (hasApplied) {
      const updateValue = post?.postApplicants?.filter(
        (applicantID) => applicantID !== userID
      )
      mutate(updateValue)
    }
    if (!hasApplied) {
      const updateValue = [...post?.postApplicants, userID]
      mutate(updateValue)
    }
  }

  const mergedCategories = [
    ...activityList.onlineOptionalCategory,
    ...activityList.onlineCategory,
    ...activityList.offlineCategory,
  ]

  const slideAnimation = {
    initial: {
      opacity: 20,
      x: "100%",
    },
    slide: {
      opacity: 100,
      x: "0%",
      transition: {
        duration: 0.7,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    slideOut: {
      opacity: 20,
      x: "100%",
      transition: {
        duration: 0.4,
        ease: "circIn",
      },
    },
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

  // document.body.style.overflow = "hidden"
  return (
    <Flex
      w={"100%"}
      h={"100vh"}
      justifyContent={"flex-end"}
      position={"absolute"}
      zIndex={999}
      bgColor={"rgba(0, 0, 0, 0.3)"}
      boxSizing="borderBox"
    >
      <Flex w={"50%"} boxSizing="border-box" onClick={handleHideDrawer} />
      <Flex
        w={"50%"}
        bgColor={"white"}
        position={"relative"}
        boxSizing="border-box"
        pl={"25px"}
        py={"10px"}
        as={motion.div}
        variants={slideAnimation}
        initial={"initial"}
        animate={!drawerExit ? "slide" : "slideOut"}
      >
        <Flex
          overflowY={"scroll"}
          flexDirection={"column"}
          h={"100%"}
          px={"15px"}
        >
          {isLoading && (
            <Flex sx={drawer.drawerSpinner}>
              <Spinner
                thickness="5px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
              />
            </Flex>
          )}
          <Flex position={"relative"} gap={4}>
            <Flex border={"1px solid #CBD5E0"} p={"12px"} borderRadius={"md"}>
              <Icon as={BsFillPersonFill} boxSize={10} color={"gray.400"} />
            </Flex>
            <Flex flexDirection={"column"} justifyContent={"center"}>
              <Text fontSize={"xl"} fontWeight={"medium"}>
                {post?.postOwnerFirstName} {post?.postOwnerLastName}
              </Text>
              <Flex alignItems={"center"} gap={2} mt={"-5px"}>
                <Text fontSize={"sm"}>Open</Text>
                <Icon as={FaCircle} color="green.400" boxSize="2" />
              </Flex>
            </Flex>
          </Flex>

          <Flex sx={sectionContainer}>
            <Flex sx={drawer.details.secContainer}>
              <Heading sx={drawer.secTitle} as={"h5"}>
                Details
              </Heading>
              <Flex sx={drawer.details.flexContainer}>
                <Text sx={drawer.details.label}>Activities</Text>
                <Text sx={drawer.details.data} noOfLines={[1]}>
                  {post?.selectedActivities
                    .map((activity) => activity.activityTitle)
                    .join(" • ") || "-"}
                </Text>
              </Flex>
              <Flex sx={drawer.details.flexContainer}>
                <Text sx={drawer.details.label}>Expires</Text>
                <Text sx={drawer.details.data}>
                  {(post?.postExpirationDate.utcFormat !== "Invalid Date" &&
                    post?.postExpirationDate.utcFormat) ||
                    "-"}
                </Text>
              </Flex>
              <Flex sx={drawer.details.flexContainer}>
                <Text sx={drawer.details.label}>Compensation</Text>
                <Text sx={drawer.details.data}>
                  {post
                    ? `$${new Intl.NumberFormat(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(parseFloat(post?.totalAmount))}`
                    : "-"}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex sx={sectionContainer}>
            <Flex
              sx={drawer.brief.secContainer}
              maxHeight={minimizeBrief && "220px"}
            >
              <Heading sx={drawer.secTitle} as={"h5"}>
                Brief
              </Heading>
              <Text sx={drawer.brief.postTitle}>{post?.postTitle}</Text>
              <Flex noOfLines={minimizeBrief && [3]}>
                <DisplayQuillContent quillContent={post?.postContent} />
              </Flex>
            </Flex>
            <Text sx={drawer.brief.viewMore} onClick={handleViewMoreBrief}>
              {minimizeBrief ? "View more" : "View less"}
            </Text>
          </Flex>

          <Flex sx={sectionContainer}>
            <Flex sx={drawer.activities.secContainer}>
              <Heading sx={drawer.secTitle} as={"h5"}>
                Activities
              </Heading>
              <Flex
                sx={drawer.activities.tableContainer}
                maxH={minimizeBrief && "200px"}
              >
                <Flex sx={drawer.activities.rowContainer} flexGrow={1}>
                  <Text>Activity</Text>
                  {post?.selectedActivities.map((activity, index) => {
                    const currentIcon = mergedCategories
                      .filter((data) => data.id === activity.id)
                      .map((mapped) => {
                        const { icon, color } = mapped
                        const newObject = { icon, color }
                        return newObject
                      })
                    return (
                      <Flex key={index} sx={drawer.activities.tableData}>
                        <Icon
                          as={currentIcon[0].icon}
                          color={currentIcon[0].color}
                          boxSize={5}
                        />
                        <Text>{activity.activityTitle}</Text>
                      </Flex>
                    )
                  })}
                </Flex>
                <Flex sx={drawer.activities.rowContainer} flexBasis={"230px"}>
                  <Text>Fulfillment date</Text>
                  {post?.selectedActivities.map((activity, index) => {
                    return (
                      <Text key={index} sx={drawer.activities.tableData}>
                        {(activity.activityDate.utcFormat !== "Invalid Date" &&
                          activity.activityDate.utcFormat) ||
                          "-"}
                      </Text>
                    )
                  })}
                </Flex>
                <Flex sx={drawer.activities.rowContainer} flexBasis={"135px"}>
                  <Text>Value</Text>
                  {post?.selectedActivities.map((activity, index) => {
                    const formatter = new Intl.NumberFormat(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                    const formattedAmount = formatter.format(
                      parseFloat(activity.activityAmount)
                    )
                    return (
                      <Text key={index} sx={drawer.activities.tableData}>
                        ${formattedAmount}
                      </Text>
                    )
                  })}
                </Flex>
                <Flex sx={drawer.activities.rowContainer} flexBasis={"135px"}>
                  <Text>Status</Text>
                  {post?.selectedActivities.map((activity, index) => {
                    return (
                      <Flex
                        key={index}
                        sx={drawer.activities.tableData}
                        flexGrow={"100%"}
                        gap={2}
                        alignItems={"center"}
                      >
                        <Text>Draft</Text>
                        <Icon as={FaCircle} boxSize={2} color={"green.400"} />
                      </Flex>
                    )
                  })}
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex mb={!minimizeBrief && "150px"}>
            <Flex>
              <Heading sx={drawer.secTitle} as={"h5"}>
                Tags
              </Heading>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          bottom={"0"}
          py={"20px"}
          w={"100%"}
          position={"absolute"}
          px={"20px"}
          right={"0"}
          left={"0"}
          justifyContent={"center"}
        >
          {/* <Flex> */}
          <Button
            sx={hasApplied ? btnVariant.applied : btnVariant.notApplied}
            w={"100%"}
            colorScheme={!hasApplied ? "twitter" : "gray"}
            borderWidth="1px"
            borderStyle="solid"
            borderRadius="sm"
            onClick={handleApplyWithdraw}
          >
            {hasApplied ? "Withdraw" : "Apply"}
          </Button>
          {/* </Flex> */}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DrawerAthlete
