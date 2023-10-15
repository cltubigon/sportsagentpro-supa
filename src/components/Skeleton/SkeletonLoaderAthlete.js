import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react"
import { Waypoint } from "react-waypoint"

export const SkeletonLoaderAthlete = ({ fetchNextPage }) => {
  const number = [1, 2, 3, 4, 5, 6, 7]
  const handleWaypointEnter = () => {
    console.log("trigerring fetchNextPage")
    fetchNextPage()
  }
  return (
    <>
      <Waypoint onEnter={handleWaypointEnter}>
        <Stack mb={4}>
          <Skeleton
            startColor="#BCC6D3"
            endColor="#d9d9d9"
            height="240px"
            mb="4"
            borderRadius={"5px"}
          />
          <SkeletonText
            startColor="#BCC6D3"
            endColor="#d9d9d9"
            skeletonHeight={"3"}
            noOfLines={3}
            spacing="3"
          />
        </Stack>
      </Waypoint>
      {number.map((id) => {
        return (
          <Stack key={id}>
            <Skeleton
              startColor="#BCC6D3"
              endColor="#d9d9d9"
              height="240px"
              mb="4"
              borderRadius={"5px"}
            />
            <SkeletonText
              startColor="#BCC6D3"
              endColor="#d9d9d9"
              skeletonHeight={"3"}
              noOfLines={3}
              spacing="3"
            />
          </Stack>
        )
      })}
    </>
  )
}
