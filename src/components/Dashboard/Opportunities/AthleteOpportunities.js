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
  Heading,
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
import { BsHeart, BsInstagram, BsLink45Deg } from "react-icons/bs"
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
import { comStyle } from "./styleAthleteOpportunities"

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
  const [drawerViewMore, setDrawerViewMore] = useState(true)

  const { posts } = post
  const { postContent } = build
  const { profile, email } = auth
  const { postContainer, sectionContainer, drawer } = comStyle

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

  const handleViewMore = () => {
    setDrawerViewMore(prev => !prev)
  }

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
              <Flex key={id} onClick={handleDrawer} sx={postContainer}>
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
                                `}
                gridTemplateRows={"2fr 20fr 2fr"}
                gridTemplateColumns={"150px 1fr"}
                h="100vh"
                py={2}
              >
                <GridItem pl="2" area={"a"}>
                  <Flex>
                    <Flex alignItems={"center"} gap={4}>
                      <Image
                        sx={drawer.header.image}
                        src={imageHolderRemovable}
                        alt="Dan Abramov"
                      />
                      <Flex sx={drawer.header.textContainer}>
                        <Text sx={drawer.header.companyName}>MVPz</Text>
                        <Flex sx={drawer.header.statConainer}>
                          <Text sx={drawer.header.statConainer.text}>Open</Text>
                          <Icon
                            as={FaCircle}
                            sx={drawer.header.statConainer.icon}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </GridItem>
                <GridItem
                  display={"flex"}
                  overflowY={"auto"}
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                  area={"b"}
                >
                  <Flex sx={sectionContainer}>
                    <Flex sx={drawer.details.secContainer}>
                      <Heading sx={drawer.secTitle} as={"h5"}>
                        Details
                      </Heading>
                      <Flex sx={drawer.details.flexContainer}>
                        <Text sx={drawer.details.label}>Activities</Text>
                        <Text sx={drawer.details.data}>
                          Instagram Post • Instagram Story
                        </Text>
                      </Flex>
                      <Flex sx={drawer.details.flexContainer}>
                        <Text sx={drawer.details.label}>Expires</Text>
                        <Text sx={drawer.details.data}>
                          7/7/23 @ 2:00AM CST
                        </Text>
                      </Flex>
                      <Flex sx={drawer.details.flexContainer}>
                        <Text sx={drawer.details.label}>Compensation</Text>
                        <Text sx={drawer.details.data}>$70.00</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex sx={sectionContainer}>
                    <Flex sx={drawer.brief.secContainer} maxHeight={drawerViewMore && "220px"}>
                      <Heading sx={drawer.secTitle} as={"h5"}>
                        Brief
                      </Heading>
                      <Text sx={drawer.brief.postTitle}>
                        Hybrid MVPz Sports Cards
                      </Text>
                      <Text>
                        Hybrid MVPz Sports Cards. At MVPz we are building a
                        sports fan ecosystem centered around our Hybrid MVPz
                        Sports Cards. Our goal is to be the nations top NCAA
                        sports card brand. We will get there by providing the
                        easiest and most accessible NIL opportunity for D1
                        student athletes. The entire business is built around a
                        revenue sharing model. We make money when the athletes
                        make money. Our athletes recieve 40% of revenue from the
                        initial sale, and 7.5% from secondary sales. Plus a $100
                        sign up bonus. All we require in return is the image you
                        would prefer to have on your card. Each athlete will
                        have 200 cards made, including a super rare 1 of 1.
                      </Text>
                      <Text>
                        Hybrid MVPz Sports Cards. At MVPz we are building a
                        sports fan ecosystem centered around our Hybrid MVPz
                        Sports Cards. Our goal is to be the nations top NCAA
                        sports card brand. We will get there by providing the
                        easiest and most accessible NIL opportunity for D1
                        student athletes. The entire business is built around a
                        revenue sharing model. We make money when the athletes
                        make money. Our athletes recieve 40% of revenue from the
                        initial sale, and 7.5% from secondary sales. Plus a $100
                        sign up bonus. All we require in return is the image you
                        would prefer to have on your card. Each athlete will
                        have 200 cards made, including a super rare 1 of 1.
                      </Text>
                      <Text>
                        Hybrid MVPz Sports Cards. At MVPz we are building a
                        sports fan ecosystem centered around our Hybrid MVPz
                        Sports Cards. Our goal is to be the nations top NCAA
                        sports card brand. We will get there by providing the
                        easiest and most accessible NIL opportunity for D1
                        student athletes. The entire business is built around a
                        revenue sharing model. We make money when the athletes
                        make money. Our athletes recieve 40% of revenue from the
                        initial sale, and 7.5% from secondary sales. Plus a $100
                        sign up bonus. All we require in return is the image you
                        would prefer to have on your card. Each athlete will
                        have 200 cards made, including a super rare 1 of 1.
                      </Text>
                      <Text>
                        Hybrid MVPz Sports Cards. At MVPz we are building a
                        sports fan ecosystem centered around our Hybrid MVPz
                        Sports Cards. Our goal is to be the nations top NCAA
                        sports card brand. We will get there by providing the
                        easiest and most accessible NIL opportunity for D1
                        student athletes. The entire business is built around a
                        revenue sharing model. We make money when the athletes
                        make money. Our athletes recieve 40% of revenue from the
                        initial sale, and 7.5% from secondary sales. Plus a $100
                        sign up bonus. All we require in return is the image you
                        would prefer to have on your card. Each athlete will
                        have 200 cards made, including a super rare 1 of 1.
                      </Text>
                    </Flex>
                      <Text sx={drawer.brief.viewMore} onClick={handleViewMore}>{drawerViewMore ? 'View more' : 'View less'}</Text>
                  </Flex>
                  <Flex sx={sectionContainer}>
                    <Flex sx={drawer.activities.secContainer}>
                      <Heading sx={drawer.secTitle} as={"h5"}>
                        Activities
                      </Heading>
                      <Flex sx={drawer.activities.tableContainer} maxH={drawerViewMore && "200px"}>
                        <Flex
                          sx={drawer.activities.rowContainer}
                          flexGrow={1}
                        >
                          <Text>Activity</Text>
                          <Flex sx={drawer.activities.tableData}>
                            <Icon as={BsInstagram} />
                            <Text>Instagram Post</Text>
                          </Flex>
                          <Flex sx={drawer.activities.tableData}>
                            <Icon as={BsInstagram} />
                            <Text>Instagram Post</Text>
                          </Flex>
                          <Flex sx={drawer.activities.tableData}>
                            <Icon as={BsInstagram} />
                            <Text>Instagram Post</Text>
                          </Flex>
                          <Flex sx={drawer.activities.tableData}>
                            <Icon as={BsInstagram} />
                            <Text>Instagram Post</Text>
                          </Flex>
                          <Flex sx={drawer.activities.tableData}>
                            <Icon as={BsInstagram} />
                            <Text>Instagram Post</Text>
                          </Flex>
                          <Flex sx={drawer.activities.tableData}>
                            <Icon as={BsInstagram} />
                            <Text>Instagram Post</Text>
                          </Flex>
                        </Flex>
                        <Flex
                          sx={drawer.activities.rowContainer}
                          flexBasis={"200px"}
                        >
                          <Text>Fulfillment date</Text>
                          <Text sx={drawer.activities.tableData}>
                            7/7/23 @ 2:00AM CST
                          </Text>
                          <Text sx={drawer.activities.tableData}>
                            7/7/23 @ 2:00AM CST
                          </Text>
                          <Text sx={drawer.activities.tableData}>
                            7/7/23 @ 2:00AM CST
                          </Text>
                          <Text sx={drawer.activities.tableData}>
                            7/7/23 @ 2:00AM CST
                          </Text>
                          <Text sx={drawer.activities.tableData}>
                            7/7/23 @ 2:00AM CST
                          </Text>
                          <Text sx={drawer.activities.tableData}>
                            7/7/23 @ 2:00AM CST
                          </Text>
                        </Flex>
                        <Flex
                          sx={drawer.activities.rowContainer}
                          flexBasis={"150px"}
                        >
                          <Text>Value</Text>
                          <Text sx={drawer.activities.tableData}>$50.00</Text>
                          <Text sx={drawer.activities.tableData}>$50.00</Text>
                          <Text sx={drawer.activities.tableData}>$50.00</Text>
                          <Text sx={drawer.activities.tableData}>$50.00</Text>
                          <Text sx={drawer.activities.tableData}>$50.00</Text>
                          <Text sx={drawer.activities.tableData}>$50.00</Text>
                        </Flex>
                        <Flex
                          sx={drawer.activities.rowContainer}
                          flexBasis={"150px"}
                        >
                          <Text>Status</Text>
                          <Flex
                            sx={drawer.activities.tableData}
                            flexGrow={"100%"}
                            gap={2}
                            alignItems={"center"}
                          >
                            <Text>Draft</Text>
                            <Icon
                              as={FaCircle}
                              boxSize={2}
                              color={"green.400"}
                            />
                          </Flex>
                          <Flex
                            sx={drawer.activities.tableData}
                            flexGrow={"100%"}
                            gap={2}
                            alignItems={"center"}
                          >
                            <Text>Draft</Text>
                            <Icon
                              as={FaCircle}
                              boxSize={2}
                              color={"green.400"}
                            />
                          </Flex>
                          <Flex
                            sx={drawer.activities.tableData}
                            flexGrow={"100%"}
                            gap={2}
                            alignItems={"center"}
                          >
                            <Text>Draft</Text>
                            <Icon
                              as={FaCircle}
                              boxSize={2}
                              color={"green.400"}
                            />
                          </Flex>
                          <Flex
                            sx={drawer.activities.tableData}
                            flexGrow={"100%"}
                            gap={2}
                            alignItems={"center"}
                          >
                            <Text>Draft</Text>
                            <Icon
                              as={FaCircle}
                              boxSize={2}
                              color={"green.400"}
                            />
                          </Flex>
                          <Flex
                            sx={drawer.activities.tableData}
                            flexGrow={"100%"}
                            gap={2}
                            alignItems={"center"}
                          >
                            <Text>Draft</Text>
                            <Icon
                              as={FaCircle}
                              boxSize={2}
                              color={"green.400"}
                            />
                          </Flex>
                          <Flex
                            sx={drawer.activities.tableData}
                            flexGrow={"100%"}
                            gap={2}
                            alignItems={"center"}
                          >
                            <Text>Draft</Text>
                            <Icon
                              as={FaCircle}
                              boxSize={2}
                              color={"green.400"}
                            />
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex>
                    <Flex>
                      <Heading sx={drawer.secTitle} as={"h5"}>
                        Tags
                      </Heading>
                    </Flex>
                  </Flex>
                </GridItem>
                <GridItem area={"c"} sx={drawer.applyGrid}>
                  <Button colorScheme="twitter" w={"100%"}>
                    Apply Now
                  </Button>
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
