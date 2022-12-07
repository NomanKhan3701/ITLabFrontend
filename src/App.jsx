import { Route, Routes } from "react-router-dom"
import { Footer, Navbar } from "./components/import"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { ToastContainer } from "react-toastify";
import Explore from "./pages/Explore/Explore"
import Posts from "./pages/Posts/Posts"
import { useCallback, useEffect } from "react"
import * as actions from "./store/actions/index";
import Profile from "./pages/Profile/Profile";
import ShayariPopup from "./components/Modals/ShayariPopup/ShayariPopup"
import CrawledAuthors from "./pages/CrawledAuthors/CrawledAuthors"

function App() {
  const dispatch = useDispatch();

  const onTryAutoSignup = useCallback(
    () => dispatch(actions.authCheckState()),
    [dispatch]
  );

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/crawler_authors" element={<CrawledAuthors />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
