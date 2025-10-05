// quiz.routes.js
const express = require("express");
const router = express.Router();
const quizCtrl = require("../controller/quiz.controller.js");

// Admin creates a quiz (POST /api/quizzes)
router.post("/", quizCtrl.createQuiz);

// Admin add question to quiz
router.post("/:quizId/questions", quizCtrl.addQuestion);

// Admin update a question
router.put(
  "/:quizId/questions/:questionId", quizCtrl.updateQuestion
);

// Admin delete a question
router.delete(
  "/:quizId/questions/:questionId", quizCtrl.deleteQuestion
);

// Students: get list of subjects
router.get("/subjects", quizCtrl.getSubjects);

// Students: get quizzes for a subject (optionally ?quizId=)
router.get("/subject/:subject", quizCtrl.getQuizzesBySubject);

// Students: submit quiz
router.post("/submit", quizCtrl.submitQuiz);

// Admin: get submissions (optionally filter by quizId or studentId)
router.get("/submissions", quizCtrl.getSubmissions);

// Admin: get single submission detail
router.get("/submissions/:submissionId", quizCtrl.getSubmissionById
);

module.exports = router;
