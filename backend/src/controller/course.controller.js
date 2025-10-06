import Course from "../models/course.model.js";
import mongoose from "mongoose";

// Add a new course
export const addCourse = async (req, res) => {
  try {
    const {
      courseName,
      facultyName,
      bio,
      syllabus,
      price,
      duration,
      category,
      courseLink,
    } = req.body;

    if (bio.trim().split(/\s+/).length > 20) {
      return res.status(400).json({ message: "Bio cannot exceed 20 words" });
    }

    const newCourse = new Course({
      courseName,
      facultyName,
      bio,
      syllabus,
      price,
      duration,
      category,
      courseLink,
    });

    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single course by ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      courseName,
      facultyName,
      bio,
      syllabus,
      price,
      duration,
      category,
      courseLink,
    } = req.body;

    if (bio && bio.trim().split(/\s+/).length > 20) {
      return res.status(400).json({ message: "Bio cannot exceed 20 words" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        courseName,
        facultyName,
        bio,
        syllabus,
        price,
        duration,
        category,
        courseLink,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });

    res
      .status(200)
      .json({ message: "Course updated successfully", course: updatedCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse)
      return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
