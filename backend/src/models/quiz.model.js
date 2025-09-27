// quiz.model.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    // exactly 4 options expected
    options: {
      type: [String],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length === 4;
        },
        message: "Exactly 4 options required",
      },
      required: true,
    },
    // store index 0..3 of correct option OR the exact string (we'll use index)
    correctIndex: {
      type: Number,
      required: [true, "Correct option index is required"],
      min: 0,
      max: 3,
    },
    marks: {
      type: Number,
      default: 1,
    },
    // optional explanation to show after test
    explanation: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const quizSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    questions: [questionSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional admin user model if you have one
    },
  },
  { timestamps: true }
);

// Submission schema to store student's answers and computed score
const submissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    // answers: array of { question: ObjectId, selectedIndex: Number, correct: Boolean }
    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        selectedIndex: {
          type: Number,
          required: true,
          min: 0,
          max: 3,
        },
        correct: {
          type: Boolean,
          required: true,
        },
        marksObtained: {
          type: Number,
          required: true,
        },
      },
    ],
    totalMarks: { type: Number, required: true },
    obtainedMarks: { type: Number, required: true },
    durationSeconds: { type: Number }, // optional
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
const Submission = mongoose.model("Submission", submissionSchema);

module.exports = {
  Quiz,
  Submission,
};
