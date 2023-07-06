import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react"

export const SkeletonDiscoverAthletes = () => {
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  return (
    <>
      <Flex gap={5} wrap={'wrap'} flexDirection={'row'}>
        {number.map((id) => {
          return (
            <Flex gap={4} key={id} flexDirection={'column'}>
              <Flex>
                <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#DDE0E4' key={id} w={"196px"} h={"143px"} />
              </Flex>
              <Flex flexGrow={1}>
                <SkeletonText startColor='#DDE0E4' endColor='#d9d9d9' noOfLines={3} spacing='4' skeletonHeight='3' w={"196px"} h={"112px"} />
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </>
  )
}