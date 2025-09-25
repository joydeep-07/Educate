import Course from "../models/course.model.js";

// Add a new course
export const addCourse = async (req, res) => {
  try {
    const { courseName, facultyName, bio, syllabus, price } = req.body;

    if (bio.trim().split(/\s+/).length > 20) {
      return res.status(400).json({ message: "Bio cannot exceed 20 words" });
    }

    const newCourse = new Course({
      courseName,
      facultyName,
      bio,
      syllabus,
      price,
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
