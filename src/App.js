/* eslint-disable react-hooks/exhaustive-deps */
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom"
import React, { useEffect } from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
// import RegisterTeam from "./pages/RegisterTeam"
import CreateDeal from "./pages/CreateDeal"
import Profile from "./pages/Profile"
import ScrollToTop from "./utils/ScrollToTop"
import MainNavigation from "./components/layouts/MainNavigation"
// import ColorMode from "./config/theme/ColorMode"
import MyProfile from "./pages/MyProfile"
import SignUp from "./pages/SignUp"
import UserType from "./components/SignupForm/UserType"
import Build from "./pages/Build"
import Network from "./pages/DashboardPages/Network"
import AthleteHomepage from "./pages/DashboardPages/AthleteHomePage"
import Media from "./pages/DashboardPages/Media"
import Opportunities from "./pages/DashboardPages/Opportunities"
import { useDispatch, useSelector } from "react-redux"
import { SUPABASE_SIGNOUT } from "./store/actions/authActions"
import supabase from "./config/supabaseClient"
import Test from "./Test"

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  // const state = useSelector(state => state)
  // console.log('state: ', state)

  // Check if user is authenticated
  useEffect(() => {
    if (user) {
      const checkAuthState = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          dispatch(SUPABASE_SIGNOUT())
        }
      }
      checkAuthState()
    }
  }, [])

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
        {/* <Route path="/register-team" element={<RegisterTeam />}></Route> */}
        <Route path="/add-deal" element={<CreateDeal />}></Route>
        <Route path="/my-profile" element={<MyProfile />}></Route>
        <Route path="/user-type" element={<UserType />}></Route>
        <Route path="/build/" element={!user ? <Login /> : <Build />}></Route>
        <Route path="/build/:id" element={!user ? <Login /> : <Build />}></Route>
        <Route path="/network" element={!user ? <Login /> : <Network />}></Route>
        <Route path="/athlete-home" element={<AthleteHomepage />}></Route>
        <Route path="/media" element={<Media />}></Route>
        <Route path="/opportunities" element={!user ? <Login /> : <Opportunities />}></Route>
      </Routes>
      {/* <ColorMode /> */}
    </BrowserRouter>
  )
}

export default App
