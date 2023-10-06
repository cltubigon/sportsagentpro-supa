/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { SkeletonOpportunities } from "../../Skeleton/SkeletonOpportunities"
import CardBrand from "./CardBrand"
import { usePaginatedQuery } from "../../../hooks/usePaginatedQuery"
import { useState } from "react"
import UsePageNumbers from "../../../utils/UsePageNumbers"
import { useRef } from "react"

const BrandOpportunities = () => {
  const containerRef = useRef(null)
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
    order: "created_at",
    pageNumber: pageNumber,
    limit: limit,
  })

  useEffect(() => {
    if (containerRef.current) {
      console.log('containerRef.current', containerRef.current)
      containerRef.current.scrollTop = 0
    }
  }, [pageNumber])

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

  console.log({ posts, error, pageNumber })

  return (
    <Flex w={"100%"} flexDirection={'column'} ref={containerRef} bgColor={'red.200'}>
      {isLoading && <SkeletonOpportunities />}
      <Flex gap={5} flexWrap={"wrap"}>
        {posts?.data?.map((post, index) => {
          return <CardBrand post={post} key={index} />
        })}
      </Flex>
      <UsePageNumbers props={{ setpageNumber, pageNumber, count }} />
    </Flex>
  )
}

export default BrandOpportunities
