/* eslint-disable react-hooks/exhaustive-deps */
import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Waypoint } from "react-waypoint"
import { throttle } from "throttle-debounce"

export const SkeletonLoaderAthlete = ({ fetchNextPage, clientWidth }) => {
  const [arrayOfItems, setarrayOfItems] = useState([])
  console.count("triggered skeleton loader")
  useEffect(() => {
    if (clientWidth >= 1319) {
      setarrayOfItems(new Array(3).fill(0))
    } else if (clientWidth < 1319 && clientWidth >= 977) {
      setarrayOfItems(new Array(2).fill(0))
    } else if (clientWidth < 977 && clientWidth >= 569) {
      setarrayOfItems(new Array(1).fill(0))
    } else if (clientWidth < 569) {
      setarrayOfItems(new Array(0).fill(0))
    }
  }, [clientWidth])

  const myThrottle = throttle(500, () => {
    console.count("entered waypoint")
    fetchNextPage()
  })
  const handleWaypointEnter = () => {
    myThrottle()
  }
  return (
    <>
      <Waypoint onEnter={handleWaypointEnter}>
        <Stack>
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
      {arrayOfItems?.map((id, index) => {
        return (
          <Stack key={index}>
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
