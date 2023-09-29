import { SimpleGrid, Skeleton, SkeletonText, Stack } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
// import { useDispatch, useSelector } from "react-redux"
import { Waypoint } from "react-waypoint"
import { SET_ATHLETE_CURRENT_PAGE } from "../../store/actions/utilsActions"
// import { startListeningToAthleteCollection } from "../../store/actions/Fetch/fetchAthletesAction"

export const SkeletonLoaderAthlete = () => {
  const dispatch = useDispatch()
  const { lastItemReached } = useSelector(
    (state) => state.utils.pagination.athletes
  )
  const number = [1, 2, 3, 4, 5, 6]

  const handleWaypointEnter = () => {
    console.log("entered waypoint")
    dispatch(SET_ATHLETE_CURRENT_PAGE())
  }
  return (
    <>
      {!lastItemReached && (
        <Waypoint onEnter={handleWaypointEnter}>
          <Stack mb={4}>
            <Skeleton
              startColor="#d9d9d9"
              endColor="#ededed"
              height="240px"
              mb="4"
              borderRadius={"5px"}
            />
            <SkeletonText
              startColor="#d9d9d9"
              endColor="#ededed"
              skeletonHeight={"3"}
              noOfLines={3}
              spacing="3"
            />
          </Stack>
        </Waypoint>
      )}
      {!lastItemReached &&
        number.map((id) => {
          return (
            <Stack key={id}>
              <Skeleton
                startColor="#d9d9d9"
                endColor="#ededed"
                height="240px"
                mb="4"
                borderRadius={"5px"}
              />
              <SkeletonText
                startColor="#d9d9d9"
                endColor="#ededed"
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
