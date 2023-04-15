import { BrowserRouter, Route, Link, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import { Container, Flex } from "@chakra-ui/react"
import NavigationBar from "./layouts/NavigationBar"
import ContentArea from "./layouts/ContentArea"

function App() {
  return (
    <BrowserRouter>
      <Container maxW={"1440px"} bg={"gray.100"} p={"0"} >
        <NavigationBar maxW={"1440px"} />
      </Container>
      
        <ContentArea maxW={"1440px"} />

      <Container maxW={"1440px"} h={"100vh"} bg={"gray.100"}>
        <Routes>
            {/* <Route path="/" element={<Home/>}></Route>
            <Route path="About" element={<About/>}></Route> */}
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App