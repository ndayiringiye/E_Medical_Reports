import Home from "../Pages/home"
import Department from "./Department"
import { HowWere } from "./HowWere"
import { Unprotected } from "./Unprotected"

const Gates = () => {
  return (
    <div>
        <Home />
        <HowWere />
        <Unprotected />
        <Department />
    </div>
  )
}

export default Gates