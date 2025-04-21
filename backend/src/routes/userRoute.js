import express from "express";
import { signin, signupService } from "../services/userService.js";
import { refreshAccessToken } from "../contrrollers/refreshToken.js";
import { createAdmin } from "../services/admin.js";
import { isAdmin } from "../middleware/admin.js";
import { verifyToken } from "../contrrollers/verifyAdmin.js";
import { createSymptomsCriteria } from "../services/symptoms.js";
import { validateAge } from "../middleware/validateAge.js";

const router = express.Router();

router.post("/signup", signupService);
router.post("/signin", signin);
router.post("/refresh_token", refreshAccessToken);
router.post("/admin",verifyToken, isAdmin, createAdmin);
router.post("/symptoms", validateAge, createSymptomsCriteria);

  

export default router;