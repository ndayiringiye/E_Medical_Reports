import express from "express";
import { signin, signupService } from "../services/userService.js";

const router = express.Router();

router.post("/signup", signupService);
router.post("/signin", signin);




export default router;