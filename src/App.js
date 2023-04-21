import { BrowserRouter, Route, Link, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import RegisterTeam from "./pages/RegisterTeam"
import AddAthlete from "./pages/AddAthlete"
import Profile from "./pages/Profile"

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/register-team" element={<RegisterTeam />}></Route>
          <Route path="/add-athlete" element={<AddAthlete />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App