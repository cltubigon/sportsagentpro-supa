/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text } from "@chakra-ui/react"
import React from "react"
import {
  SkeletonLoaderOpportunities,
  SkeletonOpportunities,
} from "../../Skeleton/SkeletonOpportunities"
import CardBrand from "./CardBrand"
import useInfiniteMultiColumnQueryData from "../../../hooks/useInfiniteMultiColumnQueryData"

const BrandOpportunities = () => {
  // console.count("BrandOpportunities is rendered")

  const { data, isError, error, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteMultiColumnQueryData({
      key: "posts",
      from: "posts",
      select:
        "id, postOwnerFirstName, postOwnerLastName, postTitle,postType, postContent, selectedActivities, postExpirationDate, totalAmount",
      eqColumn: "postType",
      eqValue: "opportunity",
      order: "created_at",
    })

  if (isError) {
    return (
      <Text fontSize={"4xl"} fontWeight={"bold"}>
        {error.message}
      </Text>
    )
  }

  console.log({ data })

  return (
    <>
      {isLoading && <SkeletonOpportunities />}
      {isLoading && <SkeletonOpportunities />}
      <Flex gap={5} flexWrap={"wrap"}>
        {
          // !isLoading &&
          data?.pages.map(({ data }) => {
            return data?.map((post, index) => {
              return <CardBrand post={post} key={index} />
            })
          })
        }
        {hasNextPage && (
          <SkeletonLoaderOpportunities fetchNextPage={fetchNextPage} />
        )}
      </Flex>
    </>
  )
}

export default BrandOpportunities
