import express from "express";
import {
  enrollInCourse,
  getStudentEnrollments,
} from "../controller/enrollment.controller.js";
import protect from "../middleware/authMiddleware.js"; // make sure path is correct

const router = express.Router();

// Protect this route so req.user is set
router.post("/enroll", protect, enrollInCourse);

// Optional: get enrollments for logged in student
router.get("/my-enrollments", protect, getStudentEnrollments);

export default router;
