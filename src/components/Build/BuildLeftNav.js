/* eslint-disable react-hooks/exhaustive-deps */
import { CheckIcon } from "@chakra-ui/icons"
import {
  Stack,
  Heading,
  Text,
  Box,
  Icon,
  Flex,
  Tooltip,
  useToast,
} from "@chakra-ui/react"
import { BsArrowBarLeft, BsArrowBarRight, BsCircleFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import {
  BUILD_POST,
  RESET_BUILD_STATE,
  SET_ERROR,
  SET_IS_SUBMITTING,
  GET_SELECTED_POST,
  SET_ACTIVE_STEP,
  SET_EDIT_MODE,
  SET_SUBMISSION_TYPE,
  SET_TOTAL_AMOUNT,
  SET_TOTAL_PAYMENT,
} from "../../store/actions/buildPostActions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MdSupport } from "react-icons/md"
import { blns } from "../../styles/buildStyles/buildLeftNavStyle"
import { SkeletonBuildLeftNav } from "../Skeleton/SkeletonBuildLeftNav"

const BuildLeftNav = ({ setSpinner, setCollapse, collapse }) => {
  console.log("BuildLeftNav is rendered")
  const dispatch = useDispatch()
  const location = useLocation()
  const toast = useToast()
  const navigate = useNavigate()

  const editMode = useSelector((state) => state.build.editMode)
  const isError = useSelector((state) => state.build.isError)
  const id = useSelector((state) => state.build.id)
  const isProcessedSuccesfully = useSelector(
    (state) => state.build.isProcessedSuccesfully
  )
  const submissionType = useSelector((state) => state.build.submissionType)
  const postType = useSelector((state) => state.build.postType)
  const selectedActivities = useSelector(
    (state) => state.build.selectedActivities
  )
  const activitiesTabReady = useSelector(
    (state) => state.build.activitiesTabReady
  )
  const activeStep = useSelector((state) => state.build.activeStep)
  const detailsTabReady = useSelector((state) => state.build.detailsTabReady)
  // const firebase = useSelector((state) => state.firebase)
  const selectedRecipients = useSelector(
    (state) => state.build.selectedRecipients
  )

  const [isLoading, setIsLoading] = useState(true)

  console.log("editMode: ", editMode)
  console.log("id: ", id)
  console.log("location.pathname: ", location.pathname)
  // -------------------- INITIALIZATION --------------------
  useEffect(() => {
    dispatch(SET_ACTIVE_STEP("deal_type"))

    if (location.pathname === "/build") {
      dispatch(SET_EDIT_MODE(false))
      setTimeout(() => {
        editMode && dispatch(RESET_BUILD_STATE("line 77"))
      }, 200)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    } else if (
      location.pathname !== "/build" &&
      !location.pathname.includes(id)
    ) {
      console.log("location.pathname: ", location.pathname)
      console.log('id: ', id)
      console.log(
        "!location.pathname.includes(id): ",
        !location.pathname.includes(id)
      )
      dispatch(GET_SELECTED_POST(location.pathname.replace(/\/build\//, "")))
    }
  }, [])

  useEffect(() => {
    if (location.pathname.includes(id)) {
      setIsLoading(false)
    }
  }, [id])
  // -------------------- END OF INITIALIZATION --------------------

  useEffect(() => {
    if (submissionType === "create") {
      console.log("submission block is triggered")
      // dispatch(createNewPost())
      dispatch(SET_IS_SUBMITTING(true))
      dispatch(BUILD_POST())
      dispatch(SET_SUBMISSION_TYPE(null, "sender is BuildLeftNav line 60"))
      // setSpinner(() => true)
    } else if (submissionType === "update") {
      dispatch(SET_IS_SUBMITTING(true))
      // firebase.auth && dispatch(updatePost(firebase.auth.uid))
      dispatch(SET_SUBMISSION_TYPE(null, "sender is BuildLeftNav line 65"))
      // setSpinner(() => true)
    }
    return
  }, [submissionType])
  console.log("submissionType: ", submissionType)

  useEffect(() => {
    if (isError) {
      toast({
        title: "Login error",
        description: isError,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
      dispatch(SET_IS_SUBMITTING(false))
      dispatch(SET_ERROR(null))
    }
  }, [isError])

  useEffect(() => {
    if (isProcessedSuccesfully) {
      // dispatch(setIsProcessedSuccesfully(true))
      setSpinner(() => false)
      toast({
        title: "Success",
        description: `Your post was successfully saved`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      })
      navigate("/opportunities")
    }
  }, [isProcessedSuccesfully])

  // -------------------- ACTIVITIES TAB --------------------
  const [totalAmountToPay, setTotalAmountToPay] = useState(0)
  useEffect(() => {
    const allActivityAmount =
      selectedActivities.length > 0 &&
      selectedActivities
        .filter((activity) => activity.activityAmount !== "")
        .map((activity) => parseFloat(activity.activityAmount))
    const recipientEarnings =
      allActivityAmount &&
      allActivityAmount.reduce(
        (accumulator, activity) => accumulator + activity,
        0
      )
    dispatch(SET_TOTAL_AMOUNT(recipientEarnings))
    const marketplaceFee = recipientEarnings * 0.1
    setTotalAmountToPay(recipientEarnings + marketplaceFee)
  }, [selectedActivities])

  useEffect(() => {
    dispatch(SET_TOTAL_PAYMENT(totalAmountToPay))
  }, [totalAmountToPay])
  // -------------------- END OF ACTIVITIES TAB --------------------

  // -------------------- REVIEW TAB --------------------
  const [reviewReady, setReviewReady] = useState(null)
  useEffect(() => {
    ;(postType === "offer" && selectedRecipients.length > 0) ||
    activitiesTabReady ||
    detailsTabReady ||
    (postType === "opportunity" && activitiesTabReady) ||
    detailsTabReady
      ? setReviewReady(true)
      : setReviewReady(false)
  }, [postType, selectedRecipients, activitiesTabReady, detailsTabReady])
  // -------------------- END OF REVIEW TAB --------------------

  // -------------------- PAYMENT TAB --------------------
  const [paymentReady, setPaymentReady] = useState(null)
  useEffect(() => {
    ;(postType === "offer" &&
      selectedRecipients.length > 0 &&
      activitiesTabReady &&
      detailsTabReady) ||
    (postType === "opportunity" && activitiesTabReady && detailsTabReady)
      ? setPaymentReady(true)
      : setPaymentReady(false)
  }, [postType, selectedRecipients, activitiesTabReady, detailsTabReady])
  // -------------------- END OF PAYMENT TAB --------------------

  const handleAnimateSidebarClick = () => {
    setCollapse((prev) => !prev)
  }

  const navContainer = {
    gap: collapse ? 8 : 5,
    py: 5,
    alignItems: collapse ? "center" : "flex-start",
  }
  const animationVariants = {
    fontSize: {
      fontSize: !collapse ? "36px" : "22px",
      transition: { duration: 0.3 },
    },
  }
  return (
    <>
      <Flex
        sx={blns.mainContainer}
        alignItems={collapse ? "center" : "flex-start"}
      >
        <Flex flexDirection={"column"} width={"100%"}>
          <Link to={"/opportunities"}>
            <Heading
              as={motion.h2}
              variants={animationVariants}
              fontSize={!collapse ? "3xl" : "xl"}
              pb={!collapse ? 5 : 2}
              animate={"fontSize"}
              pt={5}
            >
              SPA
            </Heading>
          </Link>
          {!collapse && (
            <Box sx={blns.secondRowContainer}>
              <Text fontWeight={"semibold"} fontSize={"sm"}>
                Current deal status
              </Text>
              <Flex alignItems={"center"} gap={3}>
                <Icon as={BsCircleFill} boxSize={2} color={"blue.500"} />
                <Text fontSize={"sm"}>Draft</Text>
              </Flex>
            </Box>
          )}

          {isLoading && <SkeletonBuildLeftNav />}
          {!isLoading && (
            <Stack sx={navContainer}>
              <Flex
                gap={5}
                onClick={() => dispatch(SET_ACTIVE_STEP("deal_type"))}
                sx={blns.menuContainer}
              >
                <Flex
                  sx={
                    activeStep === "deal_type"
                      ? blns.selectedcircleContainerStyle
                      : postType
                      ? blns.completedCircleStyle
                      : blns.circleContainerStyle
                  }
                  _before={{
                    position: "absolute !important",
                    height: !collapse ? "46px" : "40px",
                    width: "2px",
                    top: "24px",
                    backgroundColor: "#D0D4D9",
                    content: '""',
                    zIndex: 9,
                  }}
                >
                  {activeStep === "deal_type" ? (
                    <Icon as={CheckIcon} boxSize={3} />
                  ) : postType ? (
                    <Icon as={CheckIcon} boxSize={3} />
                  ) : (
                    <Text sx={blns.numberStyle}>1</Text>
                  )}
                </Flex>
                {!collapse && (
                  <Box>
                    <Text
                      sx={
                        activeStep === "deal_type"
                          ? blns.selectedMenuTitleStyle
                          : blns.menuTitleStyle
                      }
                    >
                      Deal Type
                    </Text>
                    <Text
                      sx={
                        activeStep === "deal_type"
                          ? blns.selectedMenuDescStyle
                          : blns.menuDescStyle
                      }
                    >
                      {postType ? "Completed" : "Incomplete"}
                    </Text>
                  </Box>
                )}
              </Flex>

              {postType !== "opportunity" && (
                <Flex
                  sx={blns.menuContainer}
                  gap={5}
                  onClick={() => dispatch(SET_ACTIVE_STEP("recipients"))}
                >
                  <Flex
                    sx={
                      activeStep === "recipients"
                        ? blns.selectedcircleContainerStyle
                        : selectedRecipients.length > 0
                        ? blns.completedCircleStyle
                        : blns.circleContainerStyle
                    }
                    _before={{
                      position: "absolute !important",
                      height: !collapse ? "46px" : "40px",
                      width: "2px",
                      top: "24px",
                      backgroundColor: "#D0D4D9",
                      content: '""',
                      zIndex: 9,
                    }}
                  >
                    {activeStep === "recipients" ? (
                      <Icon as={CheckIcon} boxSize={3} />
                    ) : selectedRecipients.length > 0 ? (
                      <Icon as={CheckIcon} boxSize={3} />
                    ) : (
                      <Text sx={blns.numberStyle}>2</Text>
                    )}
                  </Flex>
                  {!collapse && (
                    <Box>
                      <Text
                        sx={
                          activeStep === "recipients"
                            ? blns.selectedMenuTitleStyle
                            : blns.menuTitleStyle
                        }
                      >
                        Recipients{" "}
                        {/* {selectedRecipients.length > 0 &&
                        `(${selectedRecipients.length})`} */}
                      </Text>
                      <Text
                        sx={
                          activeStep === "recipients"
                            ? blns.selectedMenuDescStyle
                            : blns.menuDescStyle
                        }
                      >
                        {selectedRecipients.length > 0
                          ? "Completed"
                          : "Incomplete"}
                      </Text>
                    </Box>
                  )}
                </Flex>
              )}

              <Flex
                sx={blns.menuContainer}
                gap={5}
                onClick={() => dispatch(SET_ACTIVE_STEP("activities"))}
              >
                <Flex
                  sx={
                    activeStep === "activities"
                      ? blns.selectedcircleContainerStyle
                      : activitiesTabReady
                      ? blns.completedCircleStyle
                      : blns.circleContainerStyle
                  }
                  _before={{
                    position: "absolute !important",
                    height: !collapse ? "46px" : "40px",
                    width: "2px",
                    top: "24px",
                    backgroundColor: "#D0D4D9",
                    content: '""',
                    zIndex: 9,
                  }}
                >
                  {activeStep === "activities" ? (
                    <Icon as={CheckIcon} boxSize={3} />
                  ) : activitiesTabReady ? (
                    <Icon as={CheckIcon} boxSize={3} />
                  ) : (
                    <Text sx={blns.numberStyle}>
                      {postType !== "opportunity" ? "3" : "2"}
                    </Text>
                  )}
                </Flex>
                {!collapse && (
                  <Box>
                    <Text
                      sx={
                        activeStep === "activities"
                          ? blns.selectedMenuTitleStyle
                          : blns.menuTitleStyle
                      }
                    >
                      Activities
                      {/* {selectedActivities.length > 0 && `(${selectedActivities.length})`} */}
                    </Text>
                    <Text
                      sx={
                        activeStep === "activities"
                          ? blns.selectedMenuDescStyle
                          : blns.menuDescStyle
                      }
                    >
                      {activitiesTabReady ? "Completed" : "Incomplete"}
                    </Text>
                  </Box>
                )}
              </Flex>

              <Flex
                sx={blns.menuContainer}
                gap={5}
                onClick={() => dispatch(SET_ACTIVE_STEP("details"))}
              >
                <Flex
                  sx={
                    activeStep === "details"
                      ? blns.selectedcircleContainerStyle
                      : detailsTabReady
                      ? blns.completedCircleStyle
                      : blns.circleContainerStyle
                  }
                  _before={{
                    position: "absolute !important",
                    height: !collapse ? "46px" : "40px",
                    width: "2px",
                    top: "24px",
                    backgroundColor: "#D0D4D9",
                    content: '""',
                    zIndex: 9,
                  }}
                >
                  {activeStep === "details" ? (
                    <Icon as={CheckIcon} boxSize={3} />
                  ) : detailsTabReady ? (
                    <Icon as={CheckIcon} boxSize={3} />
                  ) : (
                    <Text sx={blns.numberStyle}>
                      {postType !== "opportunity" ? "4" : "3"}
                    </Text>
                  )}
                </Flex>
                {!collapse && (
                  <Box>
                    <Text
                      sx={
                        activeStep === "details"
                          ? blns.selectedMenuTitleStyle
                          : blns.menuTitleStyle
                      }
                    >
                      Details
                    </Text>
                    <Text
                      sx={
                        activeStep === "details"
                          ? blns.selectedMenuDescStyle
                          : blns.menuDescStyle
                      }
                    >
                      {detailsTabReady ? "Completed" : "Incomplete"}
                    </Text>
                  </Box>
                )}
              </Flex>

              <Flex
                sx={blns.menuContainer}
                gap={5}
                onClick={() => dispatch(SET_ACTIVE_STEP("review"))}
              >
                <Flex
                  sx={
                    activeStep === "review"
                      ? blns.selectedcircleContainerStyle
                      : reviewReady
                      ? blns.completedCircleStyle
                      : blns.circleContainerStyle
                  }
                  _before={{
                    position: "absolute !important",
                    height: !collapse ? "46px" : "40px",
                    width: "2px",
                    top: "24px",
                    backgroundColor: "#D0D4D9",
                    content: '""',
                    zIndex: 9,
                  }}
                >
                  {activeStep === "review" ? (
                    <Icon as={CheckIcon} boxSize={3} />
                  ) : reviewReady ? (
                    <Icon as={CheckIcon} boxSize={3} />
                  ) : (
                    <Text sx={blns.numberStyle}>
                      {postType !== "opportunity" ? "5" : "4"}
                    </Text>
                  )}
                </Flex>
                {!collapse && (
                  <Box>
                    <Text
                      sx={
                        activeStep === "review"
                          ? blns.selectedMenuTitleStyle
                          : blns.menuTitleStyle
                      }
                    >
                      Review
                    </Text>
                    <Text
                      sx={
                        activeStep === "review"
                          ? blns.selectedMenuDescStyle
                          : blns.menuDescStyle
                      }
                    >
                      {reviewReady ? "Completed" : "Incomplete"}
                    </Text>
                  </Box>
                )}
              </Flex>

              <Flex
                sx={blns.menuContainer}
                gap={5}
                onClick={() => dispatch(SET_ACTIVE_STEP("payment"))}
              >
                <Flex
                  sx={
                    activeStep === "payment"
                      ? blns.selectedcircleContainerStyle
                      : paymentReady
                      ? blns.completedCircleStyle
                      : blns.circleContainerStyle
                  }
                >
                  {activeStep === "payment" ? (
                    <Icon as={CheckIcon} boxSize={3} />
                  ) : paymentReady ? (
                    <Icon as={CheckIcon} boxSize={3} />
                  ) : (
                    <Text sx={blns.numberStyle}>
                      {postType !== "opportunity" ? "6" : "5"}
                    </Text>
                  )}
                </Flex>
                {!collapse && (
                  <Box>
                    <Text
                      sx={
                        activeStep === "payment"
                          ? blns.selectedMenuTitleStyle
                          : blns.menuTitleStyle
                      }
                    >
                      Payment
                    </Text>
                    <Text
                      sx={
                        activeStep === "payment"
                          ? blns.selectedMenuDescStyle
                          : blns.menuDescStyle
                      }
                    >
                      {paymentReady ? "Completed" : "Incomplete"}
                    </Text>
                  </Box>
                )}
              </Flex>
            </Stack>
          )}
        </Flex>
        <Flex
          gap={4}
          flexDirection={!collapse ? "row" : "column"}
          justifyContent={!collapse && "space-between"}
          width={!collapse && "100%"}
        >
          <Tooltip hasArrow label="Contact support team" color="gray.400">
            <Box>
              <Icon as={MdSupport} boxSize={6} />
            </Box>
          </Tooltip>
          <Tooltip hasArrow label="Expand" color="gray.400">
            <Box zIndex={999}>
              {collapse && (
                <Icon
                  as={BsArrowBarRight}
                  boxSize={6}
                  onClick={handleAnimateSidebarClick}
                />
              )}
            </Box>
          </Tooltip>
          <Tooltip hasArrow label="Collapse" color="gray.400">
            <Box zIndex={999}>
              {!collapse && (
                <Icon
                  as={BsArrowBarLeft}
                  boxSize={6}
                  onClick={handleAnimateSidebarClick}
                />
              )}
            </Box>
          </Tooltip>
        </Flex>
      </Flex>
    </>
  )
}

export default BuildLeftNav
