import Enrollment from "../models/enrollment.model.js";
import Course from "../models/course.model.js";
import Student from "../models/student.model.js";

// Enroll a student in a course
export const enrollInCourse = async (req, res) => {
  try {
    const studentId = req.user._id; // <-- use req.user, not req.student
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });
    if (existingEnrollment)
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });

    const enrollment = new Enrollment({ student: studentId, course: courseId });
    await enrollment.save();

    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all enrollments for a student
export const getStudentEnrollments = async (req, res) => {
  try {
    const { studentId } = req.params;
    const enrollments = await Enrollment.find({ student: studentId }).populate(
      "course"
    );
    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all students enrolled in a specific course
export const getCourseEnrollments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const enrollments = await Enrollment.find({ course: courseId }).populate(
      "student"
    );
    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Unenroll a student from a course
export const unenrollCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const deleted = await Enrollment.findOneAndDelete({
      student: studentId,
      course: courseId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json({ message: "Unenrolled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
