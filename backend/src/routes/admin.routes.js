import express from "express";
import {
  registerAdmin,
  getAdmins,
  checkAdminEmail,
  verifyAdminOtp,
} from "../controller/admin.controller.js";

const router = express.Router();


router.post("/register", registerAdmin);
router.get("/", getAdmins);
router.post("/check-email", checkAdminEmail);
router.post("/verify-otp", verifyAdminOtp);


export default router;
