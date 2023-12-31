/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, GridItem } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import DashboardLeftMenu from "../../components/Dashboard/DashboardLeftMenu"
import DashboardMenu from "../../components/Dashboard/DashboardMenu"
import OpportunitiesContent from "../../components/Dashboard/Opportunities/OpportunitiesContent"
import { useEffect } from "react"
import { RESET_BUILD_STATE } from "../../store/actions/buildPostActions"
import { useRef } from "react"

const Opportunities = () => {
  const dispatch = useDispatch()
  const containerRef = useRef()
  const isProcessedSuccesfully = useSelector(
    (state) => state.build.isProcessedSuccesfully
  )

  useEffect(() => {
    if (isProcessedSuccesfully) {
      dispatch(RESET_BUILD_STATE())
    }
  }, [])

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }

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
        <GridItem
          area={"f"}
          overflow={"auto"}
          mx={4}
          mb={2}
          ref={containerRef}
          scrollBehavior={"smooth"}
        >
          <OpportunitiesContent scrollToTop={scrollToTop} />
        </GridItem>
      </Grid>
    </>
  )
}

export default Opportunities
