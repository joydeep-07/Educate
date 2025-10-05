import express from "express";
import {
  addCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controller/course.controller.js";

const router = express.Router();

// POST: Add course
router.post("/add", addCourse);

// GET: Get all courses
router.get("/", getCourses);

// GET: Get course by ID
router.get("/:id", getCourseById);

// PUT: Update course by ID
router.put("/:id", updateCourse);

// DELETE: Delete course by ID
router.delete("/:id", deleteCourse);

export default router;
