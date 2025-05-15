import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Layout from "./Components/Layout";
import Gates from "./Components/Gates";
import Symptoms from "./Pages/Symptoms";
import Dashboard from "./Pages/Dashboard";
import Response from "./Pages/Response";
import { AuthProvider } from "./Components/AuthContext.jsx";
import AboutUs from "./Pages/AboutUs";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Gates />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/response/:symptomId" element={<Response />} />
            <Route path="/about" element={<AboutUs />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
