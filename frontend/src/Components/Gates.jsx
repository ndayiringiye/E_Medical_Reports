import React, { useEffect, useState } from "react";
import Home from "../Pages/home";
import Department from "./Department";
import { HowWere } from "./HowWere";
import Testimonies from "./Testimonies";
import { Unprotected } from "./Unprotected";

const Gates = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div>
      <Home />
      <HowWere />
      <Unprotected />
      <Department />
      <Testimonies />
    </div>
  );
};

export default Gates;
