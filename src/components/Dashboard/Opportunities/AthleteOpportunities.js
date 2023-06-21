import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
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
import { deletePost } from "../../../store/actions/buildPostActions"
import { Editor, EditorState, convertFromRaw } from "draft-js"
import { useState } from "react"

const AthleteOpportunities = () => {
  const initRef = useRef()
  const dispatch = useDispatch()
  const flexRef = useRef(null)
  const drawerRef = useRef(null)

  const firestore = useSelector((state) => state.firestore)
  const firebase = useSelector((state) => state.firebase)
  const build = useSelector((state) => state.build)
  const post = useSelector((state) => state.post)
  const reduxState = useSelector((state) => state)
  const auth = useSelector((state) => state.auth)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = useState("")
  const [isloading, setIsloading] = useState(false)

  const { posts } = post
  const { postContent } = build
  const { profile, email } = auth

  const firestorePost = firestore.ordered.posts
  const userType = profile && profile.userType

  console.log("firebase.auth.email: ", firebase.auth.email)
  console.log("email: ", email)
  console.log("post: ", post)
  console.log("reduxState: ", reduxState)

  const handleDrawer = (post) => {
    console.log("post in drawer: ", post)
    setSize("xl")
    onOpen()
  }

  const handleApply = (id, event) => {
    console.log("id: ", id)
    event.stopPropagation()
    firebase.auth && dispatch(applyToPost(id, email))
    setIsloading(true)
  }

  useEffect(() => {
    console.log("firestorePost: ", firestorePost)

    console.log("posts: ", posts)
    const filterToOwnerPosts =
      firestorePost &&
      firebase.auth.uid &&
      firestorePost.map((obj) => {
        const { ownerUID, ...newObject } = obj
        return newObject
      })
    console.log("filterToOwnerPosts: ", filterToOwnerPosts)
    filterToOwnerPosts && dispatch(savePostsToStorage(filterToOwnerPosts))
    setIsloading(false)
  }, [firestorePost])

  const [flexHeight, setFlexHeight] = useState(null)
  const [flexWidth, setFlexWidth] = useState(null)
  const [gridheight, setGridheight] = useState(null)
  const [gridWidth, setGridWidth] = useState(null)

  const handleResize = () => {
    if (flexRef.current) {
      setFlexHeight(flexRef.current.offsetWidth)
      setFlexWidth(flexRef.current.offsetWidth)
    }
  }

  useEffect(() => {
    if (drawerRef.current) {
      setGridheight(drawerRef.current.offsetWidth)
      setGridWidth(drawerRef.current.offsetWidth)
    }
  }, [])

  console.log("gridheight: ", gridheight)
  console.log("gridWidth: ", gridWidth)

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
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
  console.log("posts line95: ", posts)
  return (
    <>
      {posts.length < 1 && (
        <Flex
          justifyContent={"center"}
          height={"429px"}
          alignItems={"center"}
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
        {posts.map((post, index) => {
          const {
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
          // console.log('index: ', index)

          const rawDataParsed = postContent && postContent
          const contentState = convertFromRaw(rawDataParsed)
          const editorState = EditorState.createWithContent(contentState)

          return (
            postType === "opportunity" && (
              <Flex
                key={id}
                flexDirection={"column"}
                borderColor={"gray.200"}
                borderWidth={"1px"}
                borderStyle={"solid"}
                borderRadius={"md"}
                w={"320px"}
                h={"428px"}
                position={"relative"}
                onClick={handleDrawer}
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
                    <Text fontWeight={"semibold"}>{`$${parseFloat(
                      totalPayment.toFixed(2)
                    ).toLocaleString()}`}</Text>
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
                    onClick={() => handleDrawer(post)}
                  >
                    Details
                  </Button>
                </Flex>
              </Flex>
            )
          )
        })}
        <Drawer onClose={onClose} isOpen={isOpen} size={size}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            {/* <DrawerHeader>{`${size} drawer contents`}</DrawerHeader> */}
            <DrawerBody py={0} ref={drawerRef}>
              <Grid
                templateAreas={`"a a"
                                "b b"
                                "c c"
                                "d d"
                                "e e"
                                `}
                gridTemplateRows={"1fr 3fr 4fr 2fr 2fr"}
                // gridTemplateRows={"120px auto auto auto auto"}
                gridTemplateColumns={"150px 1fr"}
                h="100vh"
                gap="1"
              >
                <GridItem display={'flex'} alignItems={'center'} area={"a"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Image
                      src={imageHolderRemovable}
                      maxW={"60px"}
                      bgColor={"red"}
                      alt="Dan Abramov"
                      borderColor={"gray.300"}
                      borderWidth={"1px"}
                      borderStyle={"solid"}
                      borderRadius={"md"}
                    />
                    <Flex flexDirection={"column"} gap={0}>
                        <Text fontSize={"xl"} fontWeight={"semibold"}>
                          MVPz
                        </Text>
                      <Flex alignItems={"center"} mt={-1} gap={3}>
                        <Text fontSize={"sm"}>
                          Open
                        </Text>
                        <Icon as={FaCircle} color={"green.400"} boxSize={2} />
                      </Flex>
                    </Flex>
                  </Flex>
                </GridItem>
                <GridItem pl="2" bg="pink.300" area={"b"}>
                  Details
                </GridItem>
                <GridItem pl="2" bg="green.300" area={"c"}>
                  Brief
                </GridItem>
                <GridItem pl="2" bg="blue.300" area={"d"}>
                  Activities
                </GridItem>
                <GridItem pl="2" bg="blue.300" area={"e"}>
                  Tags
                </GridItem>
              </Grid>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  )
}

export default firestoreConnect([{ collection: "posts" }])(AthleteOpportunities)
