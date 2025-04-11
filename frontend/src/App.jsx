import { BrowserRouter, Routes, Route }from "react-router"
import Home from "./Pages/home"
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App