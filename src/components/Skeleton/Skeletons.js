import { Stack, Grid, SimpleGrid, Flex } from '@chakra-ui/layout'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export const HomeSkeleton = () => {
    return (
      <>
        <SimpleGrid minChildWidth={{base: "100%", sm:"290px", md: "300px" }} gap={{base: 3, md: 6}} tabIndex={0}>
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
            <Stack>
                <Skeleton height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
        </SimpleGrid>
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
export const NavigationSkeleton = () => {
    return (
      <>
        <Flex gap={4} flexBasis={"423px"} alignItems={"center"}>
                <Skeleton height="12px" flex={1} />
                <Skeleton height="12px" flex={1} />
                <Skeleton height="12px" flex={1} />
                <Skeleton height="12px" flex={1} />
                <SkeletonCircle width={"48px"} h={"48px"} />
        </Flex>
      </>
    )
}