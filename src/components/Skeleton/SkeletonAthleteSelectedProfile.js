import { Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react"

export const SkeletonAthleteSelectedProfile = () => {
  return (
    <Flex flexGrow={1}>
    <Flex flexDirection={'column'} gap={10} flexGrow={1}>
      <Flex flexDirection={'row'} justifyContent={'space-between'}>
        <Flex gap={5} wrap={'wrap'} flexDirection={'column'}>
          <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"272px"} h={"28px"} />
          <SkeletonText startColor='#d9d9d9' endColor='#ededed' noOfLines={3} spacing='4' skeletonHeight='4' />
        </Flex>
        <Flex>
          <SkeletonCircle size={14} startColor='#d9d9d9' endColor='#ededed' fadeDuration={8} />
        </Flex>
      </Flex>
      <Flex gap={5} wrap={'wrap'} flexDirection={'column'}>
        <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"100px"} h={"18px"} />
        <SkeletonText startColor='#d9d9d9' endColor='#ededed' noOfLines={2} spacing='3' skeletonHeight='3' />
      </Flex>
      <Flex gap={5} wrap={'wrap'} flexDirection={'column'}>
        <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"100px"} h={"18px"} />
        <SkeletonText startColor='#d9d9d9' endColor='#ededed' noOfLines={2} spacing='3' skeletonHeight='3' />
      </Flex>
      <Flex gap={5} wrap={'wrap'} flexDirection={'column'}>
        <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' w={"100px"} h={"18px"} />
        <SkeletonText startColor='#d9d9d9' endColor='#ededed' noOfLines={2} spacing='3' skeletonHeight='3' />
      </Flex>
    </Flex>
    </Flex>
  )
}