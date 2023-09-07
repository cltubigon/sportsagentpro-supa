import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react"

export const SkeletonBuildLeftNav = () => {
    const number = [1, 2, 3, 4, 5, 6]
  return (
    <Flex flexGrow={1} w={'100%'} gap={6} flexDirection={'column'} py={6}>
        {number.map((num)=> {
            return (
                <Flex gap={3} flexDirection={'column'} key={num}>
                    <SkeletonText startColor='#d9d9d9' endColor='#ededed' w={'160px'} noOfLines={1} spacing='4' skeletonHeight='4' />
                    <SkeletonText startColor='#d9d9d9' endColor='#ededed' w={'130px'} noOfLines={1} spacing='4' skeletonHeight='2' />
                </Flex>
            )
        })}
    </Flex>
  )
}