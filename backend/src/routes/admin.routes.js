import express from "express";
import { registerAdmin, getAdmins } from "../controller/admin.controller.js";

const router = express.Router();

// POST /api/admin/register
router.post("/register", registerAdmin);

// GET /api/admin
router.get("/", getAdmins);

export default router;
