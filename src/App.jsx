import { Route, Routes } from "react-router-dom"
import { Footer, Navbar } from "./components/import"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
