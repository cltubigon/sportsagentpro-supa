import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import RegisterTeam from "./pages/RegisterTeam"
import AddAthlete from "./pages/AddAthlete"
import Profile from "./pages/Profile"
import ScrollToTop from "./utils/ScrollToTop"
import Footer from "./components/layouts/Footer"
import MainNavigation from "./components/layouts/MainNavigation"


function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <MainNavigation />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/register-team" element={<RegisterTeam />}></Route>
          <Route path="/add-athlete" element={<AddAthlete />}></Route>
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App