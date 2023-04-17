import { BrowserRouter, Route, Link, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import RegisterTeam from "./pages/RegisterTeam"


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="register-team" element={<RegisterTeam />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App