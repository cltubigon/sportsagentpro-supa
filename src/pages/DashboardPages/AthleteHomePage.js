import {
  Grid,
  GridItem,
} from "@chakra-ui/react"
import DashboardLeftMenu from "../../components/Dashboard/DashboardLeftMenu"
import DashboardMenu from "../../components/Dashboard/DashboardMenu"
import NetworkContent from "../../components/Dashboard/Discover/NetworkContent"

const AthleteHomepage = () => {

  return (
    <>
      <Grid
        templateAreas={`"n m"
                        "n f"`}
        gridTemplateColumns={"155px calc(100% - 155px)"}
        gridTemplateRows={"1fr 11fr"}
        h="100vh"
        pt={'88px'}
      >
        <GridItem area={"n"} bg="gray.200" >
            <DashboardLeftMenu />
        </GridItem>
        <GridItem area={"m"} mx={4}>
            <DashboardMenu />
        </GridItem>
        <GridItem area={"f"} overflow={'auto'} mx={4} mb={2}>
            <NetworkContent />
        </GridItem>
      </Grid>
    </>
  )
}

export default AthleteHomepage
