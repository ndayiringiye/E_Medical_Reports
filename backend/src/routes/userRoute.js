import express from "express";
import { signupService } from "../services/userService.js";

const router = express.Router();

router.post("/signup", signupService);

export default router;