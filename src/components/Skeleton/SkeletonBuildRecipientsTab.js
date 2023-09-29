import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { Waypoint } from "react-waypoint"
import { startListeningToAthleteCollection } from "../../store/actions/Fetch/fetchAthletesAction"
import { SET_ATHLETE_CURRENT_PAGE } from "../../store/actions/utilsActions"

export const SkeletonBuildRecipientsTab = () => {
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  return (
    <>
      <Flex gap={5} wrap={'wrap'} flexDirection={'column'}>
        {number.map((id) => {
          return (
            <Flex gap={4} key={id}>
                <SkeletonCircle startColor='#d9d9d9' endColor='#ededed' size={14} fadeDuration={8} />
                <Flex flexGrow={1} gap={2} flexDirection={'column'} justifyContent={'center'} >
                    <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"130px"} h={"15px"} />
                    <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"50%"} h={"8px"} />
                </Flex>
            </Flex>
          )
        })}
      </Flex>
    </>
  )
}
export const SkeletonLoaderBuildRecipientsTab = () => {
  const dispatch = useDispatch()

  const handleWaypointEnter = () => {
    console.log("entered waypoint")
    dispatch(SET_ATHLETE_CURRENT_PAGE())
  }
  const number = [1, 2, 3]
  return (
    <>
      <Flex gap={5} wrap={'wrap'} flexDirection={'column'}>
        <Waypoint onEnter={handleWaypointEnter}></Waypoint>
            <Flex gap={4}>
                <SkeletonCircle startColor='#d9d9d9' endColor='#ededed' size={14} fadeDuration={8} />
                <Flex flexGrow={1} gap={2} flexDirection={'column'} justifyContent={'center'} >
                    <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"130px"} h={"15px"} />
                    <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"50%"} h={"8px"} />
                </Flex>
            </Flex>
        {number.map((id) => {
          return (
            <Flex gap={4} key={id}>
                <SkeletonCircle startColor='#d9d9d9' endColor='#ededed' size={14} fadeDuration={8} />
                <Flex flexGrow={1} gap={2} flexDirection={'column'} justifyContent={'center'} >
                    <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"130px"} h={"15px"} />
                    <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"50%"} h={"8px"} />
                </Flex>
            </Flex>
          )
        })}
      </Flex>
    </>
  )
}
export const SkeletonBuildRecipientsTabColumn = () => {
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  return (
    <>
      <Flex gap={4} wrap={'wrap'}>
        {number.map((id) => {
          return (
            <Flex gap={4} borderRadius={'md'} borderWidth={'1px'} borderColor={'gray.200'} borderStyle={'solid'} key={id} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} w={'234px'} h={'174px'}>
                <Flex>
                  <SkeletonCircle startColor='#d9d9d9' endColor='#ededed' size={14} fadeDuration={8} />
                </Flex>
                <Flex flexDirection={'column'} alignItems={'center'} gap={2} justifyContent={'center'} >
                    <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"130px"} h={"15px"} />
                    <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"50%"} h={"8px"} />
                </Flex>
            </Flex>
          )
        })}
      </Flex>
    </>
  )
}
export const SkeletonLoaderBuildRecipientsTabColumn = () => {
  const dispatch = useDispatch()

  const handleWaypointEnter = () => {
    console.log("entered waypoint")
    dispatch(SET_ATHLETE_CURRENT_PAGE())
  }
  const number = [1, 2, 3]
  return (
    <>
        <Waypoint onEnter={handleWaypointEnter}>
            <Flex gap={4} borderRadius={'md'} borderWidth={'1px'} borderColor={'gray.200'} borderStyle={'solid'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} w={'234px'} h={'174px'}>
                <Flex>
                  <SkeletonCircle startColor='#d9d9d9' endColor='#ededed' size={14} fadeDuration={8} />
                </Flex>
                <Flex flexDirection={'column'} alignItems={'center'} gap={2} justifyContent={'center'} >
                    <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"130px"} h={"15px"} />
                    <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"50%"} h={"8px"} />
                </Flex>
            </Flex>
        </Waypoint>
        {number.map((id) => {
          return (
            <Flex gap={4} borderRadius={'md'} borderWidth={'1px'} borderColor={'gray.200'} borderStyle={'solid'} key={id} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} w={'234px'} h={'174px'}>
                <Flex>
                  <SkeletonCircle startColor='#d9d9d9' endColor='#ededed' size={14} fadeDuration={8} />
                </Flex>
                <Flex flexDirection={'column'} alignItems={'center'} gap={2} justifyContent={'center'} >
                    <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"130px"} h={"15px"} />
                    <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"50%"} h={"8px"} />
                </Flex>
            </Flex>
          )
        })}
    </>
  )
}