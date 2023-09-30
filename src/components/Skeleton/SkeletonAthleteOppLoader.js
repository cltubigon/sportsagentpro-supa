import { Flex, Skeleton, SkeletonText } from "@chakra-ui/react"
import React from "react"
import { comStyle } from "../Dashboard/Opportunities/styleAthleteOpportunities"
import { Waypoint } from "react-waypoint"
import { useDispatch } from "react-redux"
import { fetchPostsOfCurrentPage } from "../../store/actions/Fetch/fetchPostsAction"

const SkeletonAthleteOppLoader = () => {
  const dispatch = useDispatch()
  const { postContainer } = comStyle

  const handleWaypointEnter = () => {
    dispatch(fetchPostsOfCurrentPage())
  }
  return (
    <>
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
    </>
  )
}

export default SkeletonAthleteOppLoader
