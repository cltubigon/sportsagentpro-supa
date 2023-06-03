import { Avatar, Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react"
import imageHolderRemovable from "../../../assets/images/imageHolderRemovable.png"
import { FaCircle } from "react-icons/fa"
import { BsHeart, BsLink45Deg } from "react-icons/bs"
import { firestoreConnect } from "react-redux-firebase"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { savePostsToStorage } from "../../../store/actions/postActions"

const AthleteOpportunities = () => {
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const { profile } = auth
  const userType = profile && profile.userType

  const firestore = useSelector((state) => state.firestore)
  const post = useSelector((state) => state.post)

  const { posts } = post
  const firestorePost = firestore.ordered.posts
  console.log("posts: ", posts)

  useEffect(() => {
    if (firestorePost && posts && firestorePost.length !== posts.length) {
      dispatch(savePostsToStorage(firestorePost))
    }
  }, [firestorePost])

  const btnStyle = {
    colorScheme: "gray",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "sm",
  }
  return (
    <>
      <Flex gap={5} flexWrap={"wrap"}>
        {posts.map((post, index) => {
          const { postType, postOwnerFirstName, postOwnerLastName } = post
          return (
            postType === "opportunity" && (
              <Flex
                key={index}
                flexDirection={"column"}
                border={"1px solid #EDF0F2"}
                borderRadius={"md"}
              >
                <Flex
                  gap={2}
                  w={"310px"}
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
                  <Text>Coach - KM Elite Basketball Camp</Text>
                  <Text>Job Title: -</Text>
                  <Text fontSize={"sm"}>
                    {"Duration: 2 weeks (6/19/23 - 6/30/23)..."}
                  </Text>
                  <Flex gap={2}>
                    <Text color={"gray.400"}>Activities:</Text>
                    <Text fontWeight={"semibold"}>Sport Demonstration +1</Text>
                  </Flex>
                  <Flex gap={2}>
                    <Text color={"gray.400"}>Compensation:</Text>
                    <Text fontWeight={"semibold"}>$1,715.00</Text>
                  </Flex>
                  <Flex gap={2}>
                    <Text color={"gray.400"}>Expires:</Text>
                    <Text fontWeight={"semibold"}>-</Text>
                  </Flex>
                  <Flex gap={2}>
                    <Text color={"gray.400"}>Tags:</Text>
                    <Text fontWeight={"semibold"}>Basketball +2</Text>
                  </Flex>
                </Flex>
                <Flex flexDirection={"column"} gap={2} px={4} pb={4}>
                  <Button sx={btnStyle} borderColor="blue.400" color="blue.400">
                    Apply Now
                  </Button>
                  <Button sx={btnStyle} borderColor="gray.400">
                    Details
                  </Button>
                </Flex>
              </Flex>
            )
          )
        })}
      </Flex>
    </>
  )
}

export default firestoreConnect([{ collection: "posts" }])(AthleteOpportunities)
