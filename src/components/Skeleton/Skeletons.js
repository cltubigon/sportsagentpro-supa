import { Stack, Grid } from '@chakra-ui/layout'
import { Skeleton, SkeletonText } from '@chakra-ui/react'

export const HomeSkeleton = () => {
    return (
      <>
        <Grid templateColumns="repeat(3, 1fr)" gridGap={6} mt={"-15px"}>
            <Stack mb={4}>
                <Skeleton height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
        </Grid>
      </>
    )
}
export const ProfileGallerySekeleton = () => {
    return (
      <>
        <Grid templateColumns="repeat(5, 1fr)" gridGap={2} px={4}>
            <Stack mb={4}>
                <Skeleton height="240px" />
            </Stack>
            <Stack>
                <Skeleton height="240px" />
            </Stack>
            <Stack>
                <Skeleton height="240px" />
            </Stack>
            <Stack>
                <Skeleton height="240px" />
            </Stack>
            <Stack>
                <Skeleton height="240px" />
            </Stack>
        </Grid>
      </>
    )
}