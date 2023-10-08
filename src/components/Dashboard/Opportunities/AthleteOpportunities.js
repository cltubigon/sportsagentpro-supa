/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Spinner, useToast } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { SkeletonOpportunities } from "../../Skeleton/SkeletonOpportunities"
import { usePaginatedQuerySingleEq } from "../../../hooks/usePaginatedQuerySingleEq"
import { useState } from "react"
import CardAthlete from "./CardAthlete"
import UsePageNumbers from "../../../utils/UsePageNumbers"
import { useEffect } from "react"

const AthleteOpportunities = ({ scrollToTop }) => {
  const toast = useToast()
  const user = useSelector((state) => state.auth.user)
  const [pageNumber, setpageNumber] = useState(1)
  const [count, setcount] = useState(0)
  const limit = 30

  const {
    data: posts,
    isError,
    error,
    isLoading,
  } = usePaginatedQuerySingleEq({
    key: "posts",
    from: "posts",
    select:
      "id, postOwnerFirstName, postApplicants, postOwnerLastName, postTitle,postType, postContent, selectedActivities, postExpirationDate, totalAmount",
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
    if (isError) {
      toast({
        title: "Something went wrong",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    }
  }

  return (
    <>
      {isLoading && <SkeletonOpportunities />}
      {isLoading && (
        <Flex
          justifyContent={"center"}
          zIndex={801}
          bgColor={"rgba(255, 255, 255, 0.3)"}
          // w={flexWidth + 15}
          w={"calc(100% - 200px)"}
          height={"100vh"}
          alignItems={"center"}
          position={"absolute"}
          top={0}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
          />
        </Flex>
      )}
      <Flex gap={5} flexWrap={"wrap"} w={"100%"}>
        {posts?.data?.map((post, index) => {
          return <CardAthlete post={post} key={index} pageNumber={pageNumber} />
        })}
        <UsePageNumbers
          props={{ setpageNumber, pageNumber, count, scrollToTop }}
        />
      </Flex>
    </>
  )
}

export default AthleteOpportunities
