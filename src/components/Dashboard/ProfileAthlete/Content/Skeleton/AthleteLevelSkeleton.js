import { Flex, Skeleton, SkeletonText } from "@chakra-ui/react"
import React from "react"

const AthleteLevelSkeleton = () => {
  const myIterator = new Array(3).fill("hi")
  return (
    <Flex w={"100%"} h={"100%"} flexDirection={"column"} gap={4} py={4} px={2}>
      {myIterator?.map((item, index) => {
        return (
          <Flex
            w={"100%"}
            h={"100%"}
            flexDirection={"column"}
            
            gap={4}
            key={index}
          >
            <Skeleton
              borderRadius={"md"}
              startColor="#BCC6D3"
              endColor="#d9d9d9"
              w={"272px"}
              h={"10px"}
            />
            <SkeletonText
              startColor="#BCC6D3"
              endColor="#d9d9d9"
              noOfLines={2}
              spacing="2"
              skeletonHeight="3"
              w={"70%"}
            />
          </Flex>
        )
      })}
    </Flex>
  )
}

export default AthleteLevelSkeleton
