/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react"
import imageHolderRemovable from "../../../assets/images/imageHolderRemovable.png"
import { FaCircle } from "react-icons/fa"
import { BsHeart, BsLink45Deg } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { SET_USER_OPPORTUNITY_POSTS } from "../../../store/actions/postActions"
import { Link } from "react-router-dom"
// import { deletePost } from "../../../store/actions/buildPostActions"
import { Editor, EditorState, convertFromRaw } from "draft-js"
import { useState } from "react"
import {
  SkeletonLoaderOpportunities,
  SkeletonOpportunities,
} from "../../Skeleton/SkeletonOpportunities"
import { DELETE_POST } from "../../../store/actions/buildPostActions"
// import { fetchUserOpportunityPosts } from "../../../store/actions/Fetch/fetchPostsAction"

const BrandOpportunities = () => {
  console.count("BrandOpportunities is rendered")
  const initRef = useRef()
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const userOpportunityPosts = useSelector(
    (state) => state.post.userOpportunityPosts
  )
  const { currentPage } = useSelector(
    (state) => state.utils.pagination.postsOfOwners
  )

  const [show, setShow] = useState(false)
  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShow(true)
    }, 2000)

    return () => clearTimeout(showTimeout)
  }, [])

  useEffect(() => {
    userOpportunityPosts && setIsLoading(false)
    setDeleting(null)
  }, [userOpportunityPosts])

  useEffect(() => {
    dispatch(SET_USER_OPPORTUNITY_POSTS())
  }, [currentPage])

  const handleDelete = (post) => {
    setDeleting(post.id)
    dispatch(DELETE_POST(post.id))
  }

  const btnStyle = {
    colorScheme: "gray",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "sm",
  }
  return (
    <>
      {isLoading && <SkeletonOpportunities />}
      <Flex gap={5} flexWrap={"wrap"}>
        {!isLoading &&
          userOpportunityPosts.map((post, index) => {
            const {
              totalAmount,
              postTitle,
              postContent,
              postOwnerFirstName,
              postOwnerLastName,
              selectedActivities,
              postExpirationDate,
              id,
            } = post
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
              deleting !== id && (
                <Flex
                  key={index}
                  flexDirection={"column"}
                  borderColor={"gray.200"}
                  borderWidth={"1px"}
                  borderStyle={"solid"}
                  borderRadius={"md"}
                  w={"320px"}
                  h={"428px"}
                  position={"relative"}
                >
                  <Flex
                    gap={2}
                    // w={"310px"}
                    bgColor={"gray.100"}
                    p={4}
                    borderRadius={"md"}
                  >
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
                        <Text fontSize={"sm"}>Draft</Text>
                        <Icon as={FaCircle} color={"blue.400"} boxSize={2} />
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
                    <Text fontWeight={"semibold"} maxW={"190px"}>
                      {postTitle}
                    </Text>
                    <Box noOfLines={[1, 2]} mb={4} color={"gray.500"}>
                      <Editor editorState={editorState} readOnly />
                    </Box>
                    <Flex gap={2} flexWrap={"wrap"}>
                      <Text color={"gray.500"}>Activities:</Text>
                      <Text fontWeight={"semibold"} maxW={"190px"}>
                        {firstActivity} +{activityCount}
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
                  >
                    <Link to={`/build/${id}`} style={{ width: "100%" }}>
                      <Button sx={btnStyle} borderColor="gray.400" w={"100%"}>
                        Edit
                      </Button>
                    </Link>
                    <Popover initialFocusRef={initRef}>
                      {({ isOpen, onClose }) => (
                        <>
                          <PopoverTrigger>
                            <Button sx={btnStyle} borderColor="gray.400">
                              Delete
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            bgColor={"gray.100"}
                            p={2}
                            boxShadow={"lg"}
                            borderColor={"gray.400"}
                            borderWidth={"1px"}
                            borderStyle={"solid"}
                            borderRadius={"md"}
                          >
                            <PopoverArrow
                              boxShadow={"lg"}
                              bgColor={"gray.200"}
                              borderColor={"gray.400"}
                              borderWidth={"1px"}
                              borderStyle={"solid"}
                            />
                            <PopoverCloseButton />
                            <PopoverHeader
                              fontWeight={"semibold"}
                              fontSize={"lg"}
                            >
                              Confirm deletion
                            </PopoverHeader>
                            <PopoverBody>
                              <Flex flexDirection={"column"} gap={2}>
                                <Flex>
                                  Are you sure you want to delete this?
                                </Flex>
                                <Flex gap={2} justifyContent={"flex-start"}>
                                  <Button w={"90px"} onClick={onClose}>
                                    Cancel
                                  </Button>
                                  <Button
                                    w={"90px"}
                                    onClick={() => {
                                      onClose()
                                      handleDelete(post)
                                    }}
                                    colorScheme="twitter"
                                  >
                                    Yes
                                  </Button>
                                </Flex>
                              </Flex>
                            </PopoverBody>
                          </PopoverContent>
                        </>
                      )}
                    </Popover>
                  </Flex>
                </Flex>
              )
            )
          })}
        {show && <SkeletonLoaderOpportunities />}
      </Flex>
    </>
  )
}

export default BrandOpportunities
