import { BrowserRouter, Route, Link, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="About" element={<About/>}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App