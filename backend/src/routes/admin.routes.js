import express from "express";
import {
  registerAdmin,
  getAdmins,
  checkAdminEmail,
  verifyAdminOtp,
} from "../controller/admin.controller.js";

const router = express.Router();

// POST /api/admin/register
router.post("/register", registerAdmin);

// GET /api/admin
router.get("/", getAdmins);

router.post("/check-email", checkAdminEmail);
router.post("/verify-otp", verifyAdminOtp);


export default router;
