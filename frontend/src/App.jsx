import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import Layout from "./Components/Layout"
import Gates from "./Components/Gates"
import Symptoms from "./Pages/Symptoms"
import Dashboard from "./Pages/Dashboard"
import Response from "./Pages/Response"
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Gates />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/symptoms" element={< Symptoms />}/>
        <Route path="/Dashboard" element={< Dashboard />}/>
        <Route path="/response/:symptomId" element={< Response />}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App