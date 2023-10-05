/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text } from "@chakra-ui/react"
import React from "react"
import {
  SkeletonLoaderOpportunities,
  SkeletonOpportunities,
} from "../../Skeleton/SkeletonOpportunities"
import CardBrand from "./CardBrand"
import useInfiniteMultiColumnQueryData from "../../../hooks/useInfiniteMultiColumnQueryData"
import { FixedSizeGrid } from "react-window"

const BrandOpportunities = ({ clientHeight, clientWidth }) => {
  console.count("BrandOpportunities is rendered")

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

  const rowCount = 20
  const columnCount = 5
  const rowHeight = 428
  const columnWidth = 320
  console.log({ clientHeight })

  return (
    <>
      {isLoading && <SkeletonOpportunities />}
      {isLoading && <SkeletonOpportunities />}
      <Flex gap={2} flexWrap={"wrap"}>
        {
          // !isLoading &&
          data?.pages.map(({ data }) => {
            return data?.map((post, index) => {
              return (
                // <CardBrand post={post} />
                <FixedSizeGrid
                  columnCount={columnCount}
                  rowCount={rowCount}
                  rowHeight={rowHeight}
                  columnWidth={columnWidth}
                  height={clientHeight}
                  width={clientWidth}
                  key={index}
                >
                  {/* Render the Cell component */}
                  {({ columnIndex, rowIndex, style }) => (
                    <CardBrand
                      columnIndex={columnIndex}
                      rowIndex={rowIndex}
                      style={style}
                      post={post}
                      key={index}
                    />
                  )}
                </FixedSizeGrid>
              )
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
