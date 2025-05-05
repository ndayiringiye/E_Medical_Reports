import Home from "../Pages/home"
import Department from "./Department"
import { HowWere } from "./HowWere"
import Testimonies from "./Testimonies"
import { Unprotected } from "./Unprotected"

const Gates = () => {
  return (
    <div>
        <Home />
        <HowWere />
        <Unprotected />
        <Department />
        <Testimonies />
    </div>
  )
}

export default Gates