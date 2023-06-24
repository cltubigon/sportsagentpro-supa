import {
  Grid,
  GridItem,
  Button,
  Flex,
  Icon,
  Text,
  Box,
  Checkbox,
  useToast,
  Spinner,
  Heading,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { BsCheck, BsChevronLeft, BsPlus } from "react-icons/bs"
import { TfiClose } from "react-icons/tfi"
import {
  // createPost,
  // resetBuildState,
  setActiveStep,
  setFirstNameAndLastName,
  // setIsSubmittedSuccessfully,
  setPaymentTabStatus,
  setSelectedRecipients,
  setSubmissionType,
  // setTotalPayment,
  updatePost,
} from "../../store/actions/buildPostActions"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"
import BuildMenu from "./BuildMenu"
// import { firestoreConnect } from "react-redux-firebase"

const PaymentV1 = ({ setSpinner }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const divRef = useRef()

  const auth = useSelector((state) => state.auth)
  const reduxPosts = useSelector((state) => state.build)

  const {
    // postOwner,
    recipients,
    postType,
    editMode,
    // activeStep,
    // selectedRecipients,
    selectedActivities,
    activitiesTabReady,
    // postContent,
    // postTitle,
    // postExpirationDate,
    detailsTabReady,
    // reviewTabReady,
    // paymentTabReady,
    // recipientsListLayout,
    // activitiesListLayout,
    // isSubmittedSuccessfully,
  } = reduxPosts

  console.log('editMode: ', editMode)

  const allActivityAmount = selectedActivities && selectedActivities
    .filter((activity) => activity.activityAmount !== "")
    .map((activity) => parseFloat(activity.activityAmount))
  const recipientEarnings = allActivityAmount && allActivityAmount.reduce(
    (accumulator, activity) => accumulator + activity,
    0
  )
  console.log("allActivityAmount: ", allActivityAmount)
  console.log('recipientEarnings: ', recipientEarnings)
  const [totalAmount, setTotalAmount] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    auth.profile &&
      dispatch(
        setFirstNameAndLastName({
          firstName: auth.profile.firstName,
          lastName: auth.profile.lastName,
        })
      )
  }, [auth])

  const marketplaceFee = recipientEarnings * 0.1
  useEffect(() => {
    setTotalAmount(recipientEarnings + marketplaceFee)
  }, [recipientEarnings])

  // useEffect(()=> {
  //   dispatch(setTotalPayment(totalAmount))
  // }, [totalAmount])

  console.log("totalAmount: ", totalAmount)

  useEffect(() => {
    const getSelectedRecpients =
      recipients && recipients.filter((data) => data.isChecked)
    setCount(getSelectedRecpients && getSelectedRecpients.length)

    dispatch(setSelectedRecipients(getSelectedRecpients))
  }, [])

  const [agree, setAgree] = useState(true)
  const [isReadyToPost, setIsReadyToPost] = useState(true)

  useEffect(() => {
    if (
      (postType === "offer" &&
        count > 0 &&
        activitiesTabReady &&
        detailsTabReady &&
        agree) ||
      (postType === "opportunity" &&
        activitiesTabReady &&
        detailsTabReady &&
        agree)
    ) {
      // console.log("activitiesTabReady: ", activitiesTabReady)
      setIsReadyToPost(() => true)
      dispatch(setPaymentTabStatus(true))
    } else {
      // console.log("activitiesTabReady: ", activitiesTabReady)
      setIsReadyToPost(() => false)
      dispatch(setPaymentTabStatus(false))
    }

    return
  }, [count, activitiesTabReady, detailsTabReady, agree])

  // const { recipients, isSubmittedSuccessfully, ...filteredReduxPosts } = reduxPosts
  // console.log('filteredReduxPosts: ', filteredReduxPosts)

  const handleCreatePost = () => {
    dispatch(setSubmissionType('create', 'sender is Payment line138'))
  }
  const handleUpdatePost = () => {
    dispatch(setSubmissionType('update', 'sender is Payment line142'))
  }
  console.log("reduxPosts: ", reduxPosts)

  return (
    <>
      <Grid
        templateAreas={`"header"
                              "main"
                              "footer"`}
        gridTemplateRows={"auto 9fr auto"}
        gridTemplateColumns={"1fr"}
        h="100vh"
      >
        {/* -------------------------------------- Menu section -------------------------------------- */}
        <GridItem area={"header"} pb={4}>
          <BuildMenu />
        </GridItem>

        {/* -------------------------------------- Content section -------------------------------------- */}

        <GridItem
          px={"80px"}
          py={2}
          area={"main"}
          overflowY={"auto"}
          overflowX={"hidden"}
          position={"relative"}
          // bgColor={"blue"}
        >
          <Flex flexDirection={"column"} gap={4}>
            <Box
              borderColor={"gray.200"}
              borderStyle={"solid"}
              borderWidth={"1px"}
              borderRadius={"6px"}
              p={5}
            >
              <Flex
                justifyContent={"space-between"}
                borderColor={"gray.200"}
                borderStyle={"solid"}
                borderBottomWidth={"1px"}
                pb={4}
              >
                {/* ------ Label ------ */}
                <Text
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  color={"gray.500"}
                >
                  Payment details
                </Text>
              </Flex>
              <Box pt={4}>
                {/* ------ Content ------ */}
                <Flex py={2} borderRadius={4} gap={3} flexDirection={"column"}>
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Text>Recipient earnings</Text>
                    <Text>${recipientEarnings && recipientEarnings.toFixed(2)}</Text>
                  </Flex>
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Box>
                      <Text>Marketplace fee</Text>
                      <Text fontSize={"xs"}>
                        This fee helps us keep Opendorse free for athletes and
                        provide support on your deal.
                      </Text>
                    </Box>
                    <Text>${marketplaceFee && marketplaceFee.toFixed(2)}</Text>
                  </Flex>
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Text>Taxes</Text>
                    <Text>$0.00</Text>
                  </Flex>
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    pt={3}
                    borderColor={"gray.200"}
                    borderStyle={"solid"}
                    borderTopWidth={"1px"}
                  >
                    <Text
                      fontSize={"xl"}
                      color={"blue.400"}
                      fontWeight={"semibold"}
                    >
                      Total
                    </Text>
                    <Text
                      color={"blue.400"}
                      fontSize={"xl"}
                      fontWeight={"semibold"}
                    >
                      ${totalAmount.toFixed(2)}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Box>

            <Box
              borderColor={"gray.200"}
              borderStyle={"solid"}
              borderWidth={"1px"}
              borderRadius={"6px"}
              p={5}
            >
              <Flex
                justifyContent={"space-between"}
                borderColor={"gray.200"}
                borderStyle={"solid"}
                borderBottomWidth={"1px"}
                pb={4}
              >
                {/* ------ Label ------ */}
                <Text
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  color={"gray.500"}
                >
                  Payment method
                </Text>
              </Flex>
              <Box pt={4}>
                {/* ------ Content ------ */}
                <Flex py={2} borderRadius={4} gap={3} flexDirection={"column"}>
                  <Text fontSize={"xs"}>
                    {
                      "If paying by credit card, your card will be charged when the offer is sent to accepted applicant(s). If the deal isn't completed, you may use the amount paid on a different offer or request a refund."
                    }
                  </Text>
                  <Button
                    mt={2}
                    width={"fit-content"}
                    leftIcon={<BsPlus fontSize={"24px"} />}
                    colorScheme="gray"
                    color={"blue.600"}
                  >
                    Add credit card
                  </Button>
                </Flex>
              </Box>
            </Box>

            <Box
              borderColor={"gray.200"}
              borderStyle={"solid"}
              borderWidth={"1px"}
              borderRadius={"6px"}
              p={5}
            >
              <Flex
                justifyContent={"space-between"}
                borderColor={"gray.200"}
                borderStyle={"solid"}
                borderBottomWidth={"1px"}
                pb={4}
              >
                {/* ------ Label ------ */}
                <Text
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  color={"gray.500"}
                >
                  Terms and conditions
                </Text>
              </Flex>
              <Box pt={4}>
                {/* ------ Content ------ */}
                <Flex
                  my={2}
                  borderRadius={4}
                  gap={3}
                  flexDirection={"column"}
                  position={"relative"}
                >
                  {!agree && (
                    <Box
                      position={"absolute"}
                      bg={"red.200"}
                      top={"-36px"}
                      left={"25px"}
                      px={6}
                      py={"4px"}
                      borderRadius={"3px"}
                      boxShadow={"lg"}
                      border={"1px solid red"}
                      _after={{
                        content: '""',
                        bg: "red.200",
                        bottom: "-5px",
                        left: "25px",
                        position: "absolute",
                        width: "10px",
                        height: "10px",
                        transform: "rotate(45deg)",
                        borderBottom: "1px solid red",
                        borderRight: "1px solid red",
                      }}
                    >
                      <Text>
                        You must agree to our terms and conditions to create
                        this post.
                      </Text>
                    </Box>
                  )}
                  <Checkbox
                    name="termsAndConditions"
                    onChange={() => setAgree(() => !agree)}
                    defaultChecked
                  >
                    By submitting this Deal, I acknowledge and agree that this
                    Deal will be governed by the SPA Deals Terms and Conditions
                    unless I choose to utilize my own Deal form in which case
                    the terms contained in that form will govern this Deal.
                  </Checkbox>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </GridItem>

        {/* -------------------------------------- Footer Section -------------------------------------- */}
        <GridItem px={20} pt={4} pb={6} area={"footer"}>
          <Flex justifyContent={"space-between"} bottom={"0"}>
            <Button
              leftIcon={<BsChevronLeft />}
              onClick={() => dispatch(setActiveStep("review"))}
            >
              Previous Step
            </Button>
            <Button
              type="submit"
              leftIcon={<BsCheck size={"22px"} />}
              opacity={!isReadyToPost && 0.5}
              pointerEvents={!isReadyToPost && "none"}
              colorScheme={"twitter"}
              onClick={editMode ? handleUpdatePost : handleCreatePost}
            >
              {postType === "offer" ? "Send Offer" : (postType && `${editMode ? 'Update' : 'List'} Opportunity`)}
              {!postType && "Select deal type"}
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default PaymentV1
// export default firestoreConnect([
//   {
//     collection: "post",
//   },
// ])(PaymentV1)
