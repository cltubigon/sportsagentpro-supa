/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { SkeletonOpportunities } from "../../Skeleton/SkeletonOpportunities"
import CardBrand from "./CardBrand"
import { usePaginatedQuery } from "../../../hooks/usePaginatedQuery"
import { useState } from "react"
import UsePageNumbers from "../../../utils/UsePageNumbers"
import { useSelector } from "react-redux"

const BrandOpportunities = ({ scrollToTop }) => {
  const user = useSelector(state => state.auth.user)
  const [pageNumber, setpageNumber] = useState(1)
  const [count, setcount] = useState(0)
  const limit = 30
  const {
    data: posts,
    isError,
    error,
    isLoading,
  } = usePaginatedQuery({
    key: "posts",
    from: "posts",
    select:
      "id, postOwnerFirstName, postOwnerLastName, postTitle,postType, postContent, selectedActivities, postExpirationDate, totalAmount",
    eqColumn: "postType",
    eqValue: "opportunity",
    eqId: user && user.userID,
    order: "created_at",
    pageNumber: pageNumber,
    limit: limit,
  })

  useEffect(() => {
    console.log("useEffect triggered")
    posts?.count && setcount(Math.ceil(posts.count / limit))
  }, [posts?.count])

  if (isError) {
    return (
      <Text fontSize={"4xl"} fontWeight={"bold"}>
        {error.message}
      </Text>
    )
  }

  return (
    <Flex w={"100%"} flexDirection={"column"}>
      {isLoading && <SkeletonOpportunities />}
      <Flex gap={5} flexWrap={"wrap"}>
        {posts?.data?.map((post, index) => {
          return <CardBrand post={post} key={index} />
        })}
      </Flex>
      <UsePageNumbers
        props={{ setpageNumber, pageNumber, count, scrollToTop }}
      />
    </Flex>
  )
}

export default BrandOpportunities
