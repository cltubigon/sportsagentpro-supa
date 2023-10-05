/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Grid, GridItem } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import DashboardLeftMenu from "../../components/Dashboard/DashboardLeftMenu"
import DashboardMenu from "../../components/Dashboard/DashboardMenu"
import OpportunitiesContent from "../../components/Dashboard/Opportunities/OpportunitiesContent"
import { useEffect } from "react"
import { RESET_BUILD_STATE } from "../../store/actions/buildPostActions"
import { useRef } from "react"
import { useState } from "react"

const Opportunities = () => {
  const dispatch = useDispatch()
  const contentRef = useRef(null)
  const [clientHeight, setclientHeight] = useState(0)
  const [clientWidth, setclientWidth] = useState(0)
  const isProcessedSuccesfully = useSelector(
    (state) => state.build.isProcessedSuccesfully
  )

  useEffect(() => {
    if (isProcessedSuccesfully) {
      dispatch(RESET_BUILD_STATE())
    }
  }, [])

  useEffect(() => {
    if (contentRef.current) {
      // You can access the DOM element using contentRef.current here
      console.log('contentRef.current', contentRef.current.clientHeight);
      setclientHeight(contentRef.current.clientHeight)
      setclientWidth(contentRef.current.clientWidth)
    }
  }, [contentRef.current]);
  

  return (
    <>
      <Grid
        templateAreas={`"n m"
                        "n f"`}
        gridTemplateColumns={"155px calc(100% - 155px)"}
        gridTemplateRows={"1fr 11fr"}
        h="100vh"
        pt={"88px"}
      >
        <GridItem area={"n"} bg="gray.200">
          <DashboardLeftMenu />
        </GridItem>
        <GridItem area={"m"} mx={4}>
          <DashboardMenu />
        </GridItem>
        <GridItem area={"f"} overflow={"auto"} mx={4} mb={2} ref={contentRef}>
          <Flex w={"100%"} h={'100%'} bgColor={"red.300"}>
            <OpportunitiesContent clientHeight={clientHeight} clientWidth={clientWidth} />
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default Opportunities
