import { Box, Flex, Skeleton, Text } from "@chakra-ui/react"

export const SkeletonOpportunities = () => {
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  return (
    <>
      <Flex gap={5} wrap={'wrap'}>
        {number.map((id) => {
          return <Skeleton key={id} w={"320px"} h={"429px"} />
        })}
      </Flex>
    </>
  )
}
