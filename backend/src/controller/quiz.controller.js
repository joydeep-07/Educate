// quiz.controller.js
const mongoose = require("mongoose");
const { Quiz, Submission } = require("../models/quiz.model.js");
const Student = require("./../models/student.model") || require("../models/student.model"); 

// Helper: remove correctIndex from questions before sending to student
function hideAnswersFromQuiz(quizDoc) {
  const quiz = quizDoc.toObject
    ? quizDoc.toObject()
    : JSON.parse(JSON.stringify(quizDoc));
  quiz.questions = quiz.questions.map((q) => {
    const { correctIndex, ...rest } = q;
    return rest;
  });
  return quiz;
}


//   Create a new quiz (admin)
//   body: { subject, title, description, questions: [{ text, options[4], correctIndex, marks?, explanation? }, ...] }
 
const createQuiz = async (req, res) => {
  try {
    const { subject, title, description, questions = [] } = req.body;

    if (!subject || !title) {
      return res
        .status(400)
        .json({ message: "subject and title are required" });
    }

    // validate each question
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text) {
        return res
          .status(400)
          .json({ message: `text is required for question ${i + 1}` });
      }
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        return res
          .status(400)
          .json({ message: `question ${i + 1} must have exactly 4 options` });
      }
      if (
        typeof q.correctIndex !== "number" ||
        q.correctIndex < 0 ||
        q.correctIndex > 3
      ) {
        return res.status(400).json({
          message: `question ${i + 1} must have correctIndex as a number 0..3`,
        });
      }
    }

    const quiz = new Quiz({
      subject,
      title,
      description,
      questions,
      createdBy: req.user ? req.user._id : undefined,
    });

    await quiz.save();

    return res.status(201).json({ message: "Quiz created", quiz });
  } catch (err) {
    console.error("createQuiz err:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

/**
 * Add a question to an existing quiz (admin)
 * params: :quizId
 * body: { text, options[4], correctIndex, marks?, explanation? }
 */
const addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const {
      text,
      options,
      correctIndex,
      marks = 1,
      explanation = "",
    } = req.body;

    if (!text || !Array.isArray(options) || options.length !== 4) {
      return res.status(400).json({
        message: "text and exactly 4 options are required",
      });
    }
    if (
      typeof correctIndex !== "number" ||
      correctIndex < 0 ||
      correctIndex > 3
    ) {
      return res.status(400).json({ message: "correctIndex must be 0..3" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    quiz.questions.push({ text, options, correctIndex, marks, explanation });
    await quiz.save();

    return res
      .status(200)
      .json({
        message: "Question added",
        question: quiz.questions.slice(-1)[0],
      });
  } catch (err) {
    console.error("addQuestion err:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

/**
 * Update a question inside a quiz (admin)
 * params: :quizId /questions/:questionId
 * body can contain { text, options, correctIndex, marks, explanation }
 */
const updateQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const updates = req.body;

    if (
      updates.options &&
      (!Array.isArray(updates.options) || updates.options.length !== 4)
    ) {
      return res
        .status(400)
        .json({ message: "options must be an array of exactly 4 strings" });
    }
    if (
      updates.correctIndex !== undefined &&
      (typeof updates.correctIndex !== "number" ||
        updates.correctIndex < 0 ||
        updates.correctIndex > 3)
    ) {
      return res
        .status(400)
        .json({ message: "correctIndex must be a number between 0 and 3" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const q = quiz.questions.id(questionId);
    if (!q) return res.status(404).json({ message: "Question not found" });

    Object.assign(q, updates);
    await quiz.save();

    return res.status(200).json({ message: "Question updated", question: q });
  } catch (err) {
    console.error("updateQuestion err:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

/**
 * Delete a question (admin)
 * params: :quizId /questions/:questionId
 */
const deleteQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const q = quiz.questions.id(questionId);
    if (!q) return res.status(404).json({ message: "Question not found" });

    q.remove();
    await quiz.save();

    return res.status(200).json({ message: "Question removed" });
  } catch (err) {
    console.error("deleteQuestion err:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

/**
 * Get list of subjects (students see this first)
 * returns array of distinct subjects (and optionally quiz ids/titles)
 */
const getSubjects = async (req, res) => {
  try {
    const subjects = await Quiz.distinct("subject");
    return res.status(200).json({ subjects });
  } catch (err) {
    console.error("getSubjects err:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

/**
 * Get quiz(s) for a particular subject (without correct answers)
 * query: ?quizId=... optional to select a specific quiz under the subject
 */
const getQuizzesBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const { quizId } = req.query;

    if (!subject)
      return res.status(400).json({ message: "subject is required" });

    let quizzes;
    if (quizId) {
      const quiz = await Quiz.findOne({ _id: quizId, subject });
      if (!quiz)
        return res.status(404).json({ message: "Quiz not found for subject" });
      quizzes = [hideAnswersFromQuiz(quiz)];
    } else {
      const found = await Quiz.find({ subject });
      quizzes = found.map(hideAnswersFromQuiz);
    }

    return res.status(200).json({ quizzes });
  } catch (err) {
    console.error("getQuizzesBySubject err:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

/**
 * Submit quiz answers (student)
 * body: { studentId, quizId, answers: [{ questionId, selectedIndex }], durationSeconds? }
 * returns score and saved submission
 */
const submitQuiz = async (req, res) => {
  try {
    const { studentId, quizId, answers, durationSeconds } = req.body;

    if (!studentId || !quizId || !Array.isArray(answers)) {
      return res
        .status(400)
        .json({ message: "studentId, quizId and answers are required" });
    }

    // ✅ Ensure student exists
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // ✅ Ensure quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // ✅ Prevent multiple submissions (one attempt per quiz per student)
    const existing = await Submission.findOne({
      student: studentId,
      quiz: quizId,
    });
    if (existing) {
      return res.status(400).json({
        message:
          "You have already submitted this quiz. Only one attempt allowed.",
      });
    }

    // Build map of questions for quick lookup
    const questionMap = new Map();
    for (const q of quiz.questions) questionMap.set(String(q._id), q);

    let obtainedMarks = 0;
    const savedAnswers = [];

    for (const ans of answers) {
      const { questionId, selectedIndex } = ans;
      const q = questionMap.get(String(questionId));
      if (!q) {
        // invalid question -> mark wrong
        savedAnswers.push({
          question: questionId,
          selectedIndex: selectedIndex != null ? selectedIndex : null,
          correct: false,
          marksObtained: 0,
        });
        continue;
      }

      const correct = q.correctIndex === selectedIndex;
      const marksObtained = correct ? q.marks || 1 : 0;
      if (correct) obtainedMarks += marksObtained;

      savedAnswers.push({
        question: q._id,
        selectedIndex,
        correct,
        marksObtained,
      });
    }

    // ✅ Always compute totalMarks from quiz definition
    const totalMarks = quiz.questions.reduce((s, q) => s + (q.marks || 1), 0);

    // Save submission
    const submission = new Submission({
      student: student._id,
      quiz: quiz._id,
      answers: savedAnswers,
      totalMarks,
      obtainedMarks,
      durationSeconds,
    });

    await submission.save();

    // Return summary
    const resultSummary = {
      submissionId: submission._id,
      quizId: quiz._id,
      studentId: student._id,
      totalMarks,
      obtainedMarks,
      percentage: totalMarks
        ? Math.round((obtainedMarks / totalMarks) * 100 * 100) / 100
        : 0,
    };

    return res
      .status(201)
      .json({ message: "Submission saved", result: resultSummary });
  } catch (err) {
    console.error("submitQuiz err:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};


/**
 * Admin: fetch submissions with student names and quiz subject/title
 * query params: ?quizId=... & ?studentId=...
 */
const getSubmissions = async (req, res) => {
  try {
    const { quizId, studentId } = req.query;
    const filter = {};
    if (quizId) filter.quiz = quizId;
    if (studentId) filter.student = studentId;

    const submissions = await Submission.find(filter)
      .populate({ path: "student", select: "firstname lastname email" })
      .populate({ path: "quiz", select: "subject title" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ submissions });
  } catch (err) {
    console.error("getSubmissions err:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

/**
 * Admin: fetch a single submission with details
 */
const getSubmissionById = async (req, res) => {
  try {
    const { submissionId } = req.params;
    if (!submissionId)
      return res.status(400).json({ message: "submissionId required" });

    const submission = await Submission.findById(submissionId)
      .populate({ path: "student", select: "firstname lastname email" })
      .populate({ path: "quiz", select: "subject title questions" });

    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    // Optionally, we can attach the question text/options to each answered question
    // by mapping question ids in submission to the quiz questions
    const quiz = submission.quiz;
    const qMap = new Map();
    for (const q of quiz.questions) qMap.set(String(q._id), q);

    const answersWithQuestion = submission.answers.map((a) => {
      const q = qMap.get(String(a.question));
      return {
        questionId: a.question,
        questionText: q ? q.text : null,
        options: q ? q.options : null,
        selectedIndex: a.selectedIndex,
        correct: a.correct,
        marksObtained: a.marksObtained,
        correctIndex: undefined, // hide correct index by default. Admin can see it if you want.
      };
    });

    const response = {
      submissionId: submission._id,
      student: submission.student,
      quiz: { _id: quiz._id, subject: quiz.subject, title: quiz.title },
      totalMarks: submission.totalMarks,
      obtainedMarks: submission.obtainedMarks,
      createdAt: submission.createdAt,
      answers: answersWithQuestion,
    };

    return res.status(200).json({ submission: response });
  } catch (err) {
    console.error("getSubmissionById err:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createQuiz,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getSubjects,
  getQuizzesBySubject,
  submitQuiz,
  getSubmissions,
  getSubmissionById,
};
