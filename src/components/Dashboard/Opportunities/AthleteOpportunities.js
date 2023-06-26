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
import UtilDrawer from "../../../utils/UtilDrawer"
import { SkeletonOpportunities } from "../../Skeleton/SkeletonOpportunities"

const AthleteOpportunities = () => {
  const dispatch = useDispatch()
  const flexRef = useRef(null)

  const firestore = useSelector((state) => state.firestore)
  const firebase = useSelector((state) => state.firebase)
  const build = useSelector((state) => state.build)
  // const post = useSelector((state) => state.post)
  const reduxState = useSelector((state) => state)
  const auth = useSelector((state) => state.auth)

  // const { posts } = post
  const { email } = auth
  const { postContainer } = comStyle

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isloading, setIsloading] = useState(false)
  const [drawerViewMore, setDrawerViewMore] = useState(true)
  const [drawerData, setDrawerData] = useState(null)
  const [flexHeight, setFlexHeight] = useState(null)
  const [flexWidth, setFlexWidth] = useState(null)

  const firestorePost = firestore.ordered.posts

  console.log("firebase.auth.email: ", firebase.auth.email)
  console.log("email: ", email)
  // console.log("post: ", post)
  console.log("reduxState: ", reduxState)

  const handleApply = (id, event) => {
    console.log("id: ", id)
    event.stopPropagation()
    firebase.auth && dispatch(applyToPost(id, email))
    setIsloading(true)
  }

  const handleDrawer = (post, editorState) => {
    setDrawerData({...post, editorState: editorState})
    setDrawerViewMore(true)
    onOpen()
  }

  const handleResize = () => {
    if (flexRef.current) {
      setFlexHeight(flexRef.current.offsetWidth)
      setFlexWidth(flexRef.current.offsetWidth)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const [newPost, setNewPost] = useState(null)

  useEffect(() => {
    console.log("firestorePost: ", firestorePost)

    // console.log("posts: ", posts)
    const filterToOwnerPosts =
      firestorePost &&
      firebase.auth.uid &&
      firestorePost.map((obj) => {
        const { ownerUID, ...newObject } = obj
        return newObject
      })
    setNewPost(filterToOwnerPosts)
    console.log("filterToOwnerPosts: ", filterToOwnerPosts)
    // filterToOwnerPosts && dispatch(savePostsToStorage(filterToOwnerPosts))
    setIsloading(false)
  }, [firestorePost])

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
      {!newPost && (
        <SkeletonOpportunities />
      )}
      {isloading && (
        <Flex
          justifyContent={"center"}
          zIndex={801}
          bgColor={"rgba(255, 255, 255, 0.5)"}
          w={flexWidth + 15}
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
      <Flex gap={5} flexWrap={"wrap"} ref={flexRef}>
        {newPost && newPost.map((post, index) => {
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
            postApplicants.some((applicantUid) => {
              return firebase.auth && email === applicantUid
            })
          const activityTitles = selectedActivities.map(
            (activity) => activity.activityTitle
          )
          const firstActivity = activityTitles[0]
          const activityCount = activityTitles.length
          
          const formatter = new Intl.NumberFormat(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          const formattedAmount = formatter.format(parseFloat(totalAmount))

          const rawDataParsed = postContent && postContent
          const contentState = convertFromRaw(rawDataParsed)
          const editorState = EditorState.createWithContent(contentState)

          return (
            postType === "opportunity" && (
              <Flex key={id} onClick={()=> handleDrawer(post, editorState)} sx={postContainer}>
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
                    sx={hasApplied ? btnVariant.applied : btnVariant.notApplied}
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
        <UtilDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} drawerViewMore={drawerViewMore} handleApply={handleApply} setDrawerViewMore={setDrawerViewMore} drawerData={drawerData} />
      </Flex>
    </>
  )
}

export default firestoreConnect([{ collection: "posts" }])(AthleteOpportunities)