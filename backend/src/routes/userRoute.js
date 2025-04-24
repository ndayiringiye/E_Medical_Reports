import express from "express";
import { signin, signupService } from "../services/userService.js";
import { refreshAccessToken } from "../contrrollers/refreshToken.js";
import { createAdmin } from "../services/admin.js";
import { isAdmin } from "../middleware/admin.js";
import { verifyToken } from "../contrrollers/verifyAdmin.js";
import { createSymptomsCriteria, gettingSingleSymptoms } from "../services/symptoms.js";
import { validateAge } from "../middleware/validateAge.js";
import { getAllSymptoms } from "../services/dashboardService.js";
import { deleteSymptomService } from "../services/deleteSymptom.js";
import {  sendMessage } from "../contrrollers/messageController.js";
import { getSingleMessageService } from "../services/getSimgleMessage.js";

const router = express.Router();

router.post("/signup", signupService);
router.post("/signin", signin);
router.post("/refresh_token", refreshAccessToken);
router.post("/admin",verifyToken, isAdmin, createAdmin);
router.post("/symptoms", validateAge, createSymptomsCriteria);
router.get("/getsymptoms", getAllSymptoms);
router.delete("/:id",deleteSymptomService );
router.post("/messages/send", sendMessage);
router.get("/getSingleSymptom/:id", gettingSingleSymptoms);
router.get("/getSingleMessage/:id", getSingleMessageService);


export default router;