import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import RegisterTeam from "./pages/RegisterTeam"
import CreateDeal from "./pages/CreateDeal"
import Profile from "./pages/Profile"
import ScrollToTop from "./utils/ScrollToTop"
import Footer from "./components/layouts/Footer"
import MainNavigation from "./components/layouts/MainNavigation"
import ColorMode from "./config/theme/ColorMode"
import MyProfile from "./pages/MyProfile"
import SignUp from "./pages/SignUp"
import UserType from "./components/SignupForm/UserType"


function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <MainNavigation />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/register-team" element={<RegisterTeam />}></Route>
          <Route path="/add-deal" element={<CreateDeal />}></Route>
          <Route path="/my-profile" element={<MyProfile />}></Route>
          <Route path="/user-type" element={<UserType />}></Route>
        </Routes>
      <Footer />
      <ColorMode />
    </BrowserRouter>
  )
}

export default App