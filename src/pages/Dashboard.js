import React from "react"
import { Container, Stack } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DashboardMenu from "../components/Dashboard/BrandDashboard/DashboardMenu"
import DashboardContent from "../components/Dashboard/DashboardContent"
import DashboardLeftMenu from "../components/Dashboard/DashboardLeftMenu"
import Footer from "../components/layouts/Footer"

const Dashboard = () => {
  console.log("Network rendered")
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.profile)
  console.log("isLoggedIn: ", isLoggedIn)
  const containerStyle = {
    maxW: "100%",
    pt: "88px",
    px: 0,
    display: "flex",
    height: "100vh",
  }
  
  useEffect(()=> {
    if (!isLoggedIn) {
      navigate('/login')
    }
  },[])
  return (
    <>
      <Container sx={containerStyle}>
        <DashboardLeftMenu />
        <Stack flexGrow={1} pt={6} pb={2} px={5}>
          <DashboardMenu />
          <DashboardContent />
        </Stack>
      </Container>
    </>
  )
}

export default Dashboard
