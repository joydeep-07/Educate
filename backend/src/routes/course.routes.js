import express from "express";
import { addCourse, getCourses } from "../controller/course.controller.js";

const router = express.Router();

// POST: Add course
router.post("/add", addCourse);

// GET: Get all courses
router.get("/", getCourses);

export default router;
