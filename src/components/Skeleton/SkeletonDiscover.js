import { Box, Flex, Skeleton, Text } from "@chakra-ui/react"

export const SkeletonDiscover = () => {
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
  return (
    <>
      <Flex gap={5} wrap={'wrap'}>
        {number.map((id) => {
          return <Skeleton borderRadius={'md'} startColor='#d9d9d9' endColor='#ededed' key={id} w={"230px"} h={"140px"} />
        })}
      </Flex>
    </>
  )
}