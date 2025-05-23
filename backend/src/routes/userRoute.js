import express from "express";
import {  getSingleUser, getUsers, logggout, signin, signupService } from "../services/userService.js";
import {  refreshToken } from "../contrrollers/refreshToken.js";
import { createAdmin } from "../services/admin.js";
import { isAdmin } from "../middleware/admin.js";
import { verifyToken } from "../contrrollers/verifyToken.js";
import { createSymptomsCriteria, gettingSingleSymptoms } from "../services/symptoms.js";
import { validateAge } from "../middleware/validateAge.js";
import { getAllSymptoms } from "../services/dashboardService.js";
import { deleteSymptomService } from "../services/deleteSymptom.js";
import { getAllMessage, getSingleMessageService, getUnreadMessagesCount } from "../services/getSimgleMessage.js";
import { handleVideoUpload, uploadMiddleware, } from "../services/uploadService.js";
import { sendEmail } from "../contrrollers/sendMail.js";
import { searchSymptom } from "../contrrollers/searchSymptoms.js";

const router = express.Router();
router.post("/signup", signupService);
router.post("/signin", signin);
router.post("/refresh_token", refreshToken);
router.post("/admin",verifyToken, isAdmin, createAdmin);
router.post("/symptoms", validateAge, createSymptomsCriteria);
router.get("/getsymptoms", getAllSymptoms);
router.delete("/:id",deleteSymptomService );
router.post("/email/send", sendEmail);
router.get("/getSingleSymptom/:id", gettingSingleSymptoms);
router.get("/getSingleMessage/:id", getSingleMessageService);
router.get("/getAllMessage", getAllMessage);
router.get("/unreadMessagesCount", getUnreadMessagesCount);
router.get("/getUsers", getUsers);
router.post("/upload",uploadMiddleware, handleVideoUpload);
router.post("/sendEmail",verifyToken, isAdmin, sendEmail);
router.get("/getsingleUser/:id", getSingleUser);
router.get("/searchsymptom", searchSymptom);
router.get("/signout", logggout);


export default router;