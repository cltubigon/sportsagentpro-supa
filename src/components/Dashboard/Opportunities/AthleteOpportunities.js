import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import imageHolderRemovable from "../../../assets/images/imageHolderRemovable.png"
import { FaCircle } from "react-icons/fa"
import { BsHeart, BsLink45Deg } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  SET_IS_LOADING,
  applyToPost,
  withdrawToPost,
} from "../../../store/actions/postActions"
import { Editor, EditorState, convertFromRaw } from "draft-js"
import { useState } from "react"
import { comStyle } from "./styleAthleteOpportunities"
import UtilDrawer from "./DrawerOpp"
import { SkeletonOpportunities } from "../../Skeleton/SkeletonOpportunities"
import { fetchPostsOfCurrentPage } from "../../../store/actions/Fetch/fetchPostsAction"
import SkeletonAthleteOppLoader from "../../Skeleton/SkeletonAthleteOppLoader"

const AthleteOpportunities = () => {
  const dispatch = useDispatch()

  const profile = useSelector((state) => state.auth.profile)
  const { currentPage, lastItemReached } = useSelector(
    (state) => state.utils.pagination.athletePosts
  )
  console.log('lastItemReached: ', lastItemReached)
  const state = useSelector(state => state)
  console.log('state: ', state)
  const myOpportunitiesPosts = useSelector(
    (state) => state.post.myOpportunitiesPosts
  )
  // const state = useSelector((state) => state)
  // console.log('state: ', state)
  console.log('myOpportunitiesPosts: ', myOpportunitiesPosts)
  const isLoading = useSelector((state) => state.post.isLoading)
  const email = useSelector((state) => state.auth.email)
  const { postContainer } = comStyle

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [drawerViewMore, setDrawerViewMore] = useState(true)
  const [drawerData, setDrawerData] = useState(null)
  
  console.log('athletessssss: ')
  useEffect(() => {
    console.log('fetch post is triggered')
    // dispatch(fetchPostsOfCurrentPage())
  }, [currentPage])

  const handleApply = (id, event, hasApplied) => {
    event.stopPropagation()
    dispatch(SET_IS_LOADING(true))
    hasApplied && dispatch(withdrawToPost(id, email))
    !hasApplied && dispatch(applyToPost(id, email))
  }

  const handleDrawer = (post, editorState) => {
    setDrawerData({ ...post, editorState: editorState })
    setDrawerViewMore(true)
    onOpen()
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
      {myOpportunitiesPosts.length < 1 && <SkeletonOpportunities />}
      <Flex gap={5} flexWrap={"wrap"} w={"100%"}>
        {isLoading && myOpportunitiesPosts.length >= 1 && (
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
        {myOpportunitiesPosts &&
          myOpportunitiesPosts.map((post, index) => {
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
              postApplicants.length > 0 &&
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
                  key={id}
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
                      onClick={(event) => handleApply(id, event, hasApplied)}
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
        {myOpportunitiesPosts.length > 0 && !lastItemReached  && (
          <SkeletonAthleteOppLoader />
        )}

        {drawerViewMore && (
          <UtilDrawer
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            drawerViewMore={drawerViewMore}
            handleApply={handleApply}
            setDrawerViewMore={setDrawerViewMore}
            drawerData={drawerData}
            isLoading={isLoading}
          />
        )}
      </Flex>
    </>
  )
}

export default AthleteOpportunities
