import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import imageHolderRemovable from "../../../assets/images/imageHolderRemovable.png"
import { FaCircle } from "react-icons/fa"
import { BsHeart, BsLink45Deg } from "react-icons/bs"
import { firestoreConnect } from "react-redux-firebase"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import {
  applyToPost,
  savePostsToStorage,
} from "../../../store/actions/postActions"
import { Link } from "react-router-dom"
import { Editor, EditorState, convertFromRaw } from "draft-js"
import { useState } from "react"
import { comStyle } from "./styleAthleteOpportunities"
import UtilDrawer from "./DrawerOpp"
import { SkeletonOpportunities } from "../../Skeleton/SkeletonOpportunities"
import {
  fetchAllOpportunityPosts,
  fetchPostsOfCurrentPage,
} from "../../../store/actions/Fetch/fetchPostsAction"
import Pagination from "../../../utils/Pagination"
import {
  SET_CURRENT_PAGE,
  SET_IS_LOADING,
} from "../../../store/actions/utilsActions"

const AthleteOpportunities = () => {
  const dispatch = useDispatch()
  const flexRef = useRef(null)
  const { currentPage, lastItemReached } = useSelector(
    (state) => state.utils.pagination
  )

  const [items, setItems] = useState([])
  const observerRef = useRef(null)
  const [isLoaddddd, setIsLoaddddd] = useState(false)

  useEffect(() => {
    // Simulated API call for fetching more items
    const fetchMoreItems = () => {
      if (!lastItemReached) {
        setIsLoaddddd(true)
        setTimeout(() => {
          console.log("fetching more data")
          dispatch(SET_CURRENT_PAGE(currentPage + 1)) &&
            dispatch(fetchPostsOfCurrentPage())
          setIsLoaddddd(false)
        }, 1000)
      }
    }

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.3, // Trigger when 10% of the element is visible
    }

    // Initialize the Intersection Observer
    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && !isLoaddddd) {
        fetchMoreItems()
      }
    }, options)

    // Start observing the sentinel element
    if (observerRef.current) {
      observerRef.current.observe(document.querySelector(".sentinel"))
    }

    return () => {
      // Clean up the observer when the component unmounts
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [items, isLoaddddd])

  // const firestore = useSelector((state) => state.firestore)
  // const firebase = useSelector((state) => state.firebase)
  const profile = useSelector((state) => state.auth.profile)
  const isLoading = useSelector((state) => state.utils.isLoading)
  const state = useSelector((state) => state)
  console.log("state: ", state)
  // const post = useSelector((state) => state.post)
  const allOpportunityPosts = useSelector(
    (state) => state.post.myOpportunitiesPosts
  )
  console.log("allOpportunityPosts: ", allOpportunityPosts)
  const auth = useSelector((state) => state.auth)
  const { email } = auth
  const { postContainer } = comStyle

  const { isOpen, onOpen, onClose } = useDisclosure()
  // const [isloading, setIsloading] = useState(false)
  const [drawerViewMore, setDrawerViewMore] = useState(true)
  const [drawerData, setDrawerData] = useState(null)

  const handleApply = (id, event) => {
    event.stopPropagation()
    profile && dispatch(applyToPost(id, email))
    // setIsloading(true)
    dispatch(SET_IS_LOADING(true))
  }

  const handleDrawer = (post, editorState) => {
    setDrawerData({ ...post, editorState: editorState })
    setDrawerViewMore(true)
    onOpen()
  }

  useEffect(() => {
    // dispatch(SET_IS_LOADING(true))
    dispatch(fetchPostsOfCurrentPage())
  }, [currentPage])

  const handleScroll = () => {
    console.log("scrolled")
  }

  useEffect(() => {
    const element = flexRef.current
    if (element) {
      element.addEventListener("scroll", handleScroll)
      console.log("Scroll event listener attached")
    }
  }, [])

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
    <>
      {!allOpportunityPosts && <SkeletonOpportunities />}
      <Flex gap={5} flexWrap={"wrap"} ref={flexRef} w={"100%"}>
        {isLoading && (
          <Flex
            justifyContent={"center"}
            zIndex={801}
            bgColor={"rgba(255, 255, 255, 0.5)"}
            // w={flexWidth + 15}
            w={"calc(100% - 200px)"}
            height={"100vh"}
            alignItems={"center"}
            position={"absolute"}
            top={0}
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            />
          </Flex>
        )}
        {allOpportunityPosts &&
          allOpportunityPosts.map((post, index) => {
            const {
              totalAmount,
              postApplicants,
              postType,
              postTitle,
              postContent,
              postOwnerFirstName,
              postOwnerLastName,
              selectedActivities,
              totalPayment,
              postExpirationDate,
              id,
            } = post

            const hasApplied =
              postApplicants &&
              postApplicants.some((applicantEmail) => {
                return profile && email === applicantEmail
              })
            const activityTitles = selectedActivities.map(
              (activity) => activity.activityTitle
            )
            const firstActivity = activityTitles[0]
            const activityCount = activityTitles.length

            const formatter = new Intl.NumberFormat(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            const formattedAmount = formatter.format(parseFloat(totalAmount))

            const rawDataParsed = postContent && postContent
            const contentState = convertFromRaw(rawDataParsed)
            const editorState = EditorState.createWithContent(contentState)

            return (
              postType === "opportunity" && (
                <Flex
                  key={index}
                  onClick={() => handleDrawer(post, editorState)}
                  sx={postContainer}
                >
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
                    <Text
                      noOfLines={[1]}
                      fontWeight={"semibold"}
                      maxW={"190px"}
                    >
                      {postTitle}
                    </Text>
                    <Box noOfLines={[1, 2]} mb={4} color={"gray.500"}>
                      <Editor editorState={editorState} readOnly />
                    </Box>
                    <Flex gap={2} flexWrap={"nowrap"}>
                      <Text color={"gray.500"}>Activities:</Text>
                      <Text
                        noOfLines={[1]}
                        fontWeight={"semibold"}
                        maxW={"190px"}
                      >
                        {firstActivity}
                      </Text>
                      <Text fontWeight={"semibold"} maxW={"190px"}>
                        +{activityCount}
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
                      sx={
                        hasApplied ? btnVariant.applied : btnVariant.notApplied
                      }
                      w={"100%"}
                      borderWidth="1px"
                      borderStyle="solid"
                      borderRadius="sm"
                      onClick={(event) => handleApply(id, event)}
                    >
                      {hasApplied ? "Withdraw" : "Apply"}
                    </Button>
                    <Button
                      sx={btnStyle}
                      w={"100%"}
                      onClick={() => handleDrawer(post, editorState)}
                    >
                      Details
                    </Button>
                  </Flex>
                </Flex>
              )
            )
          })}
        {/* <UtilDrawer
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          drawerViewMore={drawerViewMore}
          handleApply={handleApply}
          setDrawerViewMore={setDrawerViewMore}
          drawerData={drawerData}
        /> */}
        <div className="sentinel" style={{ height: "10px" }}></div>
        <Pagination />
      </Flex>
    </>
  )
}

export default AthleteOpportunities
