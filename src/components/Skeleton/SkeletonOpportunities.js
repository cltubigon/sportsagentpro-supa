import { Flex, Skeleton, SkeletonText } from "@chakra-ui/react"
import { comStyle } from "../Dashboard/Opportunities/styleAthleteOpportunities"
import { Waypoint } from "react-waypoint"

export const SkeletonOpportunities = () => {
  const number = new Array(30).fill(0)
  const { postContainer } = comStyle
  return (
    <>
      <Flex gap={5} wrap={"wrap"}>
        {number.map((id, index) => {
          return (
            <Flex sx={postContainer} p={4} gap={2} key={index}>
              <Skeleton
                borderRadius={"md"}
                startColor="#BCC6D3"
                endColor="#d9d9d9"
                w={"272px"}
                h={"24px"}
              />
              <Skeleton
                borderRadius={"md"}
                startColor="#BCC6D3"
                endColor="#d9d9d9"
                w={"200px"}
                h={"16px"}
              />
              <Flex mt={"25px"} flexDirection={"column"} gap={3}>
                <Skeleton
                  borderRadius={"md"}
                  startColor="#BCC6D3"
                  endColor="#d9d9d9"
                  w={"220px"}
                  h={"20px"}
                />
                <SkeletonText
                  startColor="#BCC6D3"
                  endColor="#d9d9d9"
                  noOfLines={3}
                  spacing="2"
                  skeletonHeight="3"
                />
              </Flex>
              <Flex mt={"25px"} flexDirection={"column"} gap={3}>
                <Skeleton
                  borderRadius={"md"}
                  startColor="#BCC6D3"
                  endColor="#d9d9d9"
                  w={"220px"}
                  h={"20px"}
                />
                <SkeletonText
                  startColor="#BCC6D3"
                  endColor="#d9d9d9"
                  noOfLines={3}
                  spacing="2"
                  skeletonHeight="3"
                />
              </Flex>
              <Flex mt={"15px"} flexDirection={"column"} gap={2}>
                <Skeleton
                  borderRadius={"md"}
                  startColor="#BCC6D3"
                  endColor="#d9d9d9"
                  w={"272px"}
                  h={"38px"}
                />
                <Skeleton
                  borderRadius={"md"}
                  startColor="#BCC6D3"
                  endColor="#d9d9d9"
                  w={"272px"}
                  h={"38px"}
                />
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </>
  )
}

export const SkeletonLoaderOpportunities = ({ fetchNextPage }) => {
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  const handleWaypointEnter = () => {
    console.log("trigerring fetchNextPage")
    fetchNextPage()
  }
  // const dispatch = useDispatch()
  // const { lastItemReached } = useSelector(
  //   (state) => state.utils.pagination.postsOfOwners
  // )
  const { postContainer } = comStyle

  // const handleWaypointEnter = () => {
  //   console.log("entered waypoint")
  //   dispatch(SET_POSTS_OF_OWNERS_CURRENT_PAGE())
  // }
  return (
    <>
      <Waypoint onEnter={handleWaypointEnter}>
        <Flex sx={postContainer} p={4} gap={2}>
          <Skeleton
            borderRadius={"md"}
            startColor="#BCC6D3"
            endColor="#d9d9d9"
            w={"272px"}
            h={"24px"}
          />
          <Skeleton
            borderRadius={"md"}
            startColor="#BCC6D3"
            endColor="#d9d9d9"
            w={"200px"}
            h={"16px"}
          />
          <Flex mt={"25px"} flexDirection={"column"} gap={3}>
            <Skeleton
              borderRadius={"md"}
              startColor="#BCC6D3"
              endColor="#d9d9d9"
              w={"220px"}
              h={"20px"}
            />
            <SkeletonText
              startColor="#BCC6D3"
              endColor="#d9d9d9"
              noOfLines={3}
              spacing="2"
              skeletonHeight="3"
            />
          </Flex>
          <Flex mt={"25px"} flexDirection={"column"} gap={3}>
            <Skeleton
              borderRadius={"md"}
              startColor="#BCC6D3"
              endColor="#d9d9d9"
              w={"220px"}
              h={"20px"}
            />
            <SkeletonText
              startColor="#BCC6D3"
              endColor="#d9d9d9"
              noOfLines={3}
              spacing="2"
              skeletonHeight="3"
            />
          </Flex>
          <Flex mt={"15px"} flexDirection={"column"} gap={2}>
            <Skeleton
              borderRadius={"md"}
              startColor="#BCC6D3"
              endColor="#d9d9d9"
              w={"272px"}
              h={"38px"}
            />
            <Skeleton
              borderRadius={"md"}
              startColor="#BCC6D3"
              endColor="#d9d9d9"
              w={"272px"}
              h={"38px"}
            />
          </Flex>
        </Flex>
      </Waypoint>
      {number.map((id) => {
        return (
          <Flex sx={postContainer} p={4} gap={2} key={id}>
            <Skeleton
              borderRadius={"md"}
              startColor="#BCC6D3"
              endColor="#d9d9d9"
              w={"272px"}
              h={"24px"}
            />
            <Skeleton
              borderRadius={"md"}
              startColor="#BCC6D3"
              endColor="#d9d9d9"
              w={"200px"}
              h={"16px"}
            />
            <Flex mt={"25px"} flexDirection={"column"} gap={3}>
              <Skeleton
                borderRadius={"md"}
                startColor="#BCC6D3"
                endColor="#d9d9d9"
                w={"220px"}
                h={"20px"}
              />
              <SkeletonText
                startColor="#BCC6D3"
                endColor="#d9d9d9"
                noOfLines={3}
                spacing="2"
                skeletonHeight="3"
              />
            </Flex>
            <Flex mt={"25px"} flexDirection={"column"} gap={3}>
              <Skeleton
                borderRadius={"md"}
                startColor="#BCC6D3"
                endColor="#d9d9d9"
                w={"220px"}
                h={"20px"}
              />
              <SkeletonText
                startColor="#BCC6D3"
                endColor="#d9d9d9"
                noOfLines={3}
                spacing="2"
                skeletonHeight="3"
              />
            </Flex>
            <Flex mt={"15px"} flexDirection={"column"} gap={2}>
              <Skeleton
                borderRadius={"md"}
                startColor="#BCC6D3"
                endColor="#d9d9d9"
                w={"272px"}
                h={"38px"}
              />
              <Skeleton
                borderRadius={"md"}
                startColor="#BCC6D3"
                endColor="#d9d9d9"
                w={"272px"}
                h={"38px"}
              />
            </Flex>
          </Flex>
        )
      })}
    </>
  )
}
