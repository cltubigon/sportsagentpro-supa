import { Text, SimpleGrid } from "@chakra-ui/layout"
import { SkeletonLoaderAthlete } from "../Skeleton/SkeletonLoaderAthlete"
import { HomeSkeleton } from "../Skeleton/Skeletons"
import useInfiniteQueryData from "../../hooks/useInfiniteQueryData"
import AthleteLists from "./AthleteLists"
import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"

const Athletes = () => {
  const { data, isError, error, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQueryData({
      key: "athletes",
      from: "users",
      eqColumn: "userType",
      eqValue: "athlete",
      order: "created_at",
      limit: 16,
    })

  const gridRef = useRef()
  const [clientWidth, setclientWidth] = useState(null)
  useEffect(()=> {
    if (gridRef.current) {
      // console.log('gridRef.current.clientWidth', gridRef.current.clientWidth)
      setclientWidth(gridRef.current.clientWidth)
    }
  }, [gridRef])

  console.log({ data })

  if (isError) {
    return (
      <Text fontSize={"4xl"} fontWeight={"bold"}>
        {error.message}
      </Text>
    )
  }
  return (
    <>
      {isLoading && <HomeSkeleton />}
      <SimpleGrid
      ref={gridRef}
        minChildWidth={{
          base: "100%",
          sm: "290px",
          md: "300px",
        }}
        gap={{ base: 3, md: 6 }}
        tabIndex={0}
      >
        <AthleteLists data={data} />
        {hasNextPage && <SkeletonLoaderAthlete fetchNextPage={fetchNextPage} clientWidth={clientWidth} />}
      </SimpleGrid>
    </>
  )
}

export default Athletes
