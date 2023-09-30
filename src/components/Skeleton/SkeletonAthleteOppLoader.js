import { Flex, Skeleton, SkeletonText } from "@chakra-ui/react"
import React from "react"
import { comStyle } from "../Dashboard/Opportunities/styleAthleteOpportunities"
import { Waypoint } from "react-waypoint"
import { useDispatch, useSelector } from "react-redux"
import { SET_ALL_POSTS_CURRENT_PAGE } from "../../store/actions/utilsActions"

const SkeletonAthleteOppLoader = () => {
  const dispatch = useDispatch()
  const number = [1, 2, 3, 4]
  const { postContainer } = comStyle
  const { lastItemReached } = useSelector(
    (state) => state.utils.pagination.allPosts
  )

  const handleWaypointEnter = () => {
    console.log("entered waypoint")
    dispatch(SET_ALL_POSTS_CURRENT_PAGE())
  }
  return (
    <>
      {!lastItemReached && (
        <Waypoint onEnter={handleWaypointEnter}>
          <Flex sx={postContainer} p={4} gap={2}>
            <Skeleton
              borderRadius={"md"}
              startColor="#d9d9d9"
              endColor="#ededed"
              w={"272px"}
              h={"24px"}
            />
            <Skeleton
              borderRadius={"md"}
              startColor="#d9d9d9"
              endColor="#ededed"
              w={"200px"}
              h={"16px"}
            />
            <Flex mt={"25px"} flexDirection={"column"} gap={3}>
              <Skeleton
                borderRadius={"md"}
                startColor="#d9d9d9"
                endColor="#ededed"
                w={"220px"}
                h={"20px"}
              />
              <SkeletonText
                startColor="#d9d9d9"
                endColor="#ededed"
                noOfLines={3}
                spacing="2"
                skeletonHeight="3"
              />
            </Flex>
            <Flex mt={"25px"} flexDirection={"column"} gap={3}>
              <Skeleton
                borderRadius={"md"}
                startColor="#d9d9d9"
                endColor="#ededed"
                w={"220px"}
                h={"20px"}
              />
              <SkeletonText
                startColor="#d9d9d9"
                endColor="#ededed"
                noOfLines={3}
                spacing="2"
                skeletonHeight="3"
              />
            </Flex>
            <Flex mt={"15px"} flexDirection={"column"} gap={2}>
              <Skeleton
                borderRadius={"md"}
                startColor="#d9d9d9"
                endColor="#ededed"
                w={"272px"}
                h={"38px"}
              />
              <Skeleton
                borderRadius={"md"}
                startColor="#d9d9d9"
                endColor="#ededed"
                w={"272px"}
                h={"38px"}
              />
            </Flex>
          </Flex>
        </Waypoint>
      )}

      {!lastItemReached &&
        number.map((id) => {
          return (
            <Flex sx={postContainer} p={4} gap={2} key={id}>
              <Skeleton
                borderRadius={"md"}
                startColor="#d9d9d9"
                endColor="#ededed"
                w={"272px"}
                h={"24px"}
              />
              <Skeleton
                borderRadius={"md"}
                startColor="#d9d9d9"
                endColor="#ededed"
                w={"200px"}
                h={"16px"}
              />
              <Flex mt={"25px"} flexDirection={"column"} gap={3}>
                <Skeleton
                  borderRadius={"md"}
                  startColor="#d9d9d9"
                  endColor="#ededed"
                  w={"220px"}
                  h={"20px"}
                />
                <SkeletonText
                  startColor="#d9d9d9"
                  endColor="#ededed"
                  noOfLines={3}
                  spacing="2"
                  skeletonHeight="3"
                />
              </Flex>
              <Flex mt={"25px"} flexDirection={"column"} gap={3}>
                <Skeleton
                  borderRadius={"md"}
                  startColor="#d9d9d9"
                  endColor="#ededed"
                  w={"220px"}
                  h={"20px"}
                />
                <SkeletonText
                  startColor="#d9d9d9"
                  endColor="#ededed"
                  noOfLines={3}
                  spacing="2"
                  skeletonHeight="3"
                />
              </Flex>
              <Flex mt={"15px"} flexDirection={"column"} gap={2}>
                <Skeleton
                  borderRadius={"md"}
                  startColor="#d9d9d9"
                  endColor="#ededed"
                  w={"272px"}
                  h={"38px"}
                />
                <Skeleton
                  borderRadius={"md"}
                  startColor="#d9d9d9"
                  endColor="#ededed"
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

export default SkeletonAthleteOppLoader
