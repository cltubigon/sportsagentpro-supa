/* eslint-disable react-hooks/exhaustive-deps */
import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Waypoint } from "react-waypoint"

export const SkeletonLoaderAthlete = ({ fetchNextPage, clientWidth }) => {
  const [arrayOfItems, setarrayOfItems] = useState([])
  useEffect(() => {
    if (clientWidth >= 1319) {
      console.log("entered 1319")
      setarrayOfItems(new Array(4).fill(0))
    } else if (clientWidth < 1319 && clientWidth >= 977) {
      console.log("entered 977")
      setarrayOfItems(new Array(3).fill(0))
    } else if (clientWidth < 977 && clientWidth >= 569) {
      console.log("entered 569")
      setarrayOfItems(new Array(2).fill(0))
    } else if (clientWidth < 569) {
      console.log("entered 568")
      setarrayOfItems(new Array(1).fill(0))
    }
  }, [clientWidth])

  const handleWaypointEnter = () => {
    fetchNextPage()
  }
  return (
    <>
      {arrayOfItems?.map((id, index) => {
        return (
          <Waypoint onEnter={handleWaypointEnter} key={index}>
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
        )
      })}
    </>
  )
}
