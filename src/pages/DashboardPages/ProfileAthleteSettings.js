import {
    Grid,
    GridItem,
  } from "@chakra-ui/react"
  import DashboardLeftMenu from "../../components/Dashboard/DashboardLeftMenu"
  import DashboardMenu from "../../components/Dashboard/DashboardMenu"
import ProfileAthleteContent from "../../components/Dashboard/ProfileAthlete/ProfileAthleteContent"
  
  const ProfileAthleteSettings = () => {
  
    return (
      <>
        <Grid
          templateAreas={`"n f"
                          "n f"`}
          gridTemplateColumns={"155px calc(100% - 155px)"}
          gridTemplateRows={"1fr 11fr"}
          h="100vh"
          pt={'88px'}
        >
          <GridItem area={"n"} bg="gray.200" >
              <DashboardLeftMenu />
          </GridItem>
          <GridItem area={"f"} overflow={'auto'} mx={4} mb={2}>
              <DashboardMenu />
            <ProfileAthleteContent />
          </GridItem>
        </Grid>
      </>
    )
  }
  
  export default ProfileAthleteSettings  