import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import React from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import RegisterTeam from "./pages/RegisterTeam"
import CreateDeal from "./pages/CreateDeal"
import Profile from "./pages/Profile"
import ScrollToTop from "./utils/ScrollToTop"
import MainNavigation from "./components/layouts/MainNavigation"
import ColorMode from "./config/theme/ColorMode"
import MyProfile from "./pages/MyProfile"
import SignUp from "./pages/SignUp"
import UserType from "./components/SignupForm/UserType"
import Build from "./pages/Build"
import Network from "./pages/DashboardPages/Network"
import AthleteHomepage from "./pages/DashboardPages/AthleteHomePage"
import Media from "./pages/DashboardPages/Media"
import Opportunities from "./pages/DashboardPages/Opportunities"
import { useSelector } from "react-redux"
import { useState } from "react"
import Preloader from "./utils/Preloader"
import { Test } from "./Test"


function App() {
  // const reduxState = useSelector(state => state)
  // console.log('reduxState: ', reduxState)
  // console.log('App is rendered')
  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  return (
      <BrowserRouter>
      <ScrollToTop />
        <MainNavigation />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/test" element={<Test />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/profile/:id" element={<Profile />}></Route>
            <Route path="/register-team" element={<RegisterTeam />}></Route>
            <Route path="/add-deal" element={<CreateDeal />}></Route>
            <Route path="/my-profile" element={<MyProfile />}></Route>
            <Route path="/user-type" element={<UserType />}></Route>
            <Route path="/build/" element={<Build />}></Route>
            <Route path="/build/:id" element={<Build />}></Route>
            {/* <Route path="/network" element={isLoggedIn ? <Network /> : <Preloader />}></Route> */}
            <Route path="/network" element={<Network />}></Route>
            <Route path="/athlete-home" element={<AthleteHomepage />}></Route>
            <Route path="/media" element={<Media />}></Route>
            <Route path="/opportunities" element={<Opportunities />}></Route>
            {/* <Route path="/opportunities" element={isLoggedIn ? <Opportunities /> : <Preloader />}></Route> */}
          </Routes>
        <ColorMode />
      </BrowserRouter>
  )
}

export default App