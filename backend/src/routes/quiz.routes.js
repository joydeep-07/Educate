// quiz.routes.js
const express = require("express");
const router = express.Router();
const quizCtrl = require("../controller/quiz.controller.js");

// OPTIONAL: import auth / isAdmin middleware if you have them
// const { protect, isAdmin } = require("../middleware/auth");

// Admin creates a quiz (POST /api/quizzes)
router.post("/", /* protect, isAdmin, */ quizCtrl.createQuiz);

// Admin add question to quiz
router.post("/:quizId/questions", /* protect, isAdmin, */ quizCtrl.addQuestion);

// Admin update a question
router.put(
  "/:quizId/questions/:questionId",
  /* protect, isAdmin, */ quizCtrl.updateQuestion
);

// Admin delete a question
router.delete(
  "/:quizId/questions/:questionId",
  /* protect, isAdmin, */ quizCtrl.deleteQuestion
);

// Students: get list of subjects
router.get("/subjects", quizCtrl.getSubjects);

// Students: get quizzes for a subject (optionally ?quizId=)
router.get("/subject/:subject", quizCtrl.getQuizzesBySubject);

// Students: submit quiz
router.post("/submit", quizCtrl.submitQuiz);

// Admin: get submissions (optionally filter by quizId or studentId)
router.get("/submissions", /* protect, isAdmin, */ quizCtrl.getSubmissions);

// Admin: get single submission detail
router.get(
  "/submissions/:submissionId",
  /* protect, isAdmin, */ quizCtrl.getSubmissionById
);

module.exports = router;
