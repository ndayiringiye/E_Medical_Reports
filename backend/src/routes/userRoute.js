import express from "express";
import { signin, signupService } from "../services/userService.js";
import { refreshAccessToken } from "../contrrollers/refreshToken.js";

const router = express.Router();

router.post("/signup", signupService);
router.post("/signin", signin);
router.post("/refresh_token", refreshAccessToken);


export default router;