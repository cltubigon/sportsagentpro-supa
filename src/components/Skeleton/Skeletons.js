import { Stack, Grid, SimpleGrid, Flex } from '@chakra-ui/layout'
import { Icon, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'

export const HomeSkeleton = () => {
    return (
      <>
        <SimpleGrid minChildWidth={{base: "100%", sm:"290px", md: "300px" }} gap={{base: 3, md: 6}} tabIndex={0}>
            <Stack mb={4}>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
            <Stack>
                <Skeleton startColor='#d9d9d9' endColor='#ededed' height="240px" my="4" borderRadius={"5px"} />
                <SkeletonText startColor='#d9d9d9' endColor='#ededed' skeletonHeight={'3'} noOfLines={3} spacing='3' />
            </Stack>
        </SimpleGrid>
      </>
    )
}
export const ProfileGallerySekeleton = () => {
    return (
      <>
        <Grid templateColumns="repeat(5, 1fr)" gridGap={2} px={4} minH={'280px'}>
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

export const RecipientListSkeleton = () => {
    const iterate = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <>
        {iterate.map((item)=> {
            return (
                <Flex key={item} gap={4} alignItems={"center"} py={2} px={4}>
                    <Icon as={MdCheckBoxOutlineBlank} boxSize={5} color={'gray.400'} />
                    <SkeletonCircle width={"52px"} h={"52px"} />
                    <Flex flexGrow={1} >
                        <SkeletonText skeletonHeight={'3'} noOfLines={2} spacing='3' flex={0.7} />
                    </Flex>
                </Flex>
            )
        })
        }
      </>
    )
}