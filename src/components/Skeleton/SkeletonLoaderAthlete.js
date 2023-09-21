import { SimpleGrid, Skeleton, SkeletonText, Stack } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { Waypoint } from "react-waypoint"
import { startListeningToAthleteCollection } from "../../store/actions/Fetch/fetchAthletesAction"

export const SkeletonLoaderAthlete = () => {
    const dispatch = useDispatch()
    const currentTimeStamp = useSelector(state => state.athlete.athletes.lastUpdated)

    const handleWaypointEnter = () => {
        console.log('entered waypoint')
        dispatch(startListeningToAthleteCollection(currentTimeStamp))
    }
    return (
      <>
        {/* <SimpleGrid minChildWidth={{base: "100%", sm:"290px", md: "300px" }} gap={{base: 3, md: 6}} tabIndex={0}> */}
            <Waypoint onEnter={handleWaypointEnter}>
                <Stack mb={4}>
                    <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" mb="4" borderRadius={"5px"} />
                    <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
                </Stack>
            </Waypoint>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" mb="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" mb="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" mb="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" mb="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" mb="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" mb="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" mb="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
        {/* </SimpleGrid> */}
      </>
    )
}