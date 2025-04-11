import { BrowserRouter, Routes, Route }from "react-router"
import Home from "./Pages/home"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>


      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App