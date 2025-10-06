import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true, trim: true },
    facultyName: { type: String, required: true, trim: true },
    bio: { type: String, required: true, maxlength: 200, trim: true },
    price: { type: Number },
    syllabus: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    courseLink: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
