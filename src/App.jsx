import { Route, Routes } from "react-router-dom"
import { Footer, Navbar } from "./components/import"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux"
import { ToastContainer } from "react-toastify";
import Explore from "./pages/Explore/Explore"
import Posts from "./pages/Posts/Posts"

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
