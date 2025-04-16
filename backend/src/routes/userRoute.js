import express from "express";
import { signin, signupService } from "../services/userService.js";
import { refreshAccessToken } from "../contrrollers/refreshToken.js";
import { createAdmin } from "../services/admin.js";
import { isAdmin } from "../middleware/admin.js";
import { verifyToken } from "../contrrollers/verifyAdmin.js";

const router = express.Router();

router.post("/signup", signupService);
router.post("/signin", signin);
router.post("/refresh_token", refreshAccessToken);
router.post("/admin",verifyToken, isAdmin, createAdmin);

export default router;