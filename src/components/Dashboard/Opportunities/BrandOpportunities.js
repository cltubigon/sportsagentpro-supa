import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react"
import imageHolderRemovable from "../../../assets/images/imageHolderRemovable.png"
import { FaCircle } from "react-icons/fa"
import { BsHeart, BsLink45Deg } from "react-icons/bs"
import { firestoreConnect } from "react-redux-firebase"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { savePostsToStorage } from "../../../store/actions/postActions"
import { Link } from "react-router-dom"

const BrandOpportunities = () => {
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const { profile } = auth
  const userType = profile && profile.userType

  const firestore = useSelector((state) => state.firestore)
  const firebase = useSelector((state) => state.firebase)
  const post = useSelector((state) => state.post)

  const { posts } = post
  console.log('posts: ', posts)
  const firestorePost = firestore.ordered.posts

  useEffect(() => {
    if (firestorePost && posts && firestorePost.length !== posts.length) {
      const filterToOwnerPosts = firestorePost && firebase.auth.uid && firestorePost.filter(post => post.ownerUID === firebase.auth.uid)
      dispatch(savePostsToStorage(filterToOwnerPosts))
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
      {!firebase.auth.uid && (
        <Flex justifyContent={"center"} height={"250px"} alignItems={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
          />
        </Flex>
      )}
      <Flex gap={5} flexWrap={"wrap"}>
        {posts.map((post, index) => {
          const {
            postType,
            postOwnerFirstName,
            postOwnerLastName,
            selectedActivities,
            totalPayment,
            postExpirationDate,
            ownerUID,
            id,
          } = post
          const isOwner = firebase.auth && firebase.auth.uid === ownerUID
          const activityTitles = selectedActivities.map(
            (activity) => activity.activityTitle
          )
          const firstActivity = activityTitles[0]
          const activityCount = activityTitles.length
          // console.log('index: ', index)

          return (
            postType === "opportunity" &&
            isOwner && (
              <Flex
                key={id}
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
                  <Flex gap={2}>
                    <Text color={"gray.400"}>Activities:</Text>
                    <Text fontWeight={"semibold"}>
                      {firstActivity} +{activityCount}
                    </Text>
                  </Flex>
                  <Flex gap={2}>
                    <Text color={"gray.400"}>Total:</Text>
                    <Text fontWeight={"semibold"}>{`$${parseFloat(
                      totalPayment.toFixed(2)
                    ).toLocaleString()}`}</Text>
                  </Flex>
                  <Flex gap={2}>
                    <Text color={"gray.400"}>Expires:</Text>
                    <Text fontWeight={"semibold"}>
                      {postExpirationDate.utcFormat || "-"}
                    </Text>
                  </Flex>
                  <Flex gap={2}>
                    <Text color={"gray.400"}>Tags:</Text>
                    <Text fontWeight={"semibold"}>-</Text>
                  </Flex>
                </Flex>
                <Flex flexDirection={"column"} gap={2} px={4} pb={4} mt={10}>
                  <Link to={`/build/${id}`}>
                    <Button sx={btnStyle} borderColor="gray.400" w={'100%'} >
                      Edit
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            )
          )
        })}
      </Flex>
    </>
  )
}

export default firestoreConnect([{ collection: "posts" }])(BrandOpportunities)
