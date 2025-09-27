const BASE_URL = "http://localhost:3000/api";

export const ENDPOINTS = {
  // ===================== Auth =====================
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,

  // ===================== Courses =====================
  ADD_COURSE: `${BASE_URL}/courses/add`,
  GET_COURSES: `${BASE_URL}/courses`,
  UPDATE_COURSE: (id) => `${BASE_URL}/courses/${id}`, // PUT
  DELETE_COURSE: (id) => `${BASE_URL}/courses/${id}`, // DELETE
  GET_COURSE_BY_ID: (id) => `${BASE_URL}/courses/${id}`, // GET single

  // ===================== Blogs =====================
  ADD_BLOG: `${BASE_URL}/blogs/add`, // POST
  GET_BLOGS: `${BASE_URL}/blogs`, // GET all
  GET_BLOG_BY_ID: (id) => `${BASE_URL}/blogs/${id}`, // GET single
  UPDATE_BLOG: (id) => `${BASE_URL}/blogs/${id}`, // PUT
  DELETE_BLOG: (id) => `${BASE_URL}/blogs/${id}`, // DELETE

  // ===================== Quizzes =====================
  CREATE_QUIZ: `${BASE_URL}/quizzes`, // POST (admin)
  ADD_QUESTION: (quizId) => `${BASE_URL}/quizzes/${quizId}/questions`, // POST (admin)
  UPDATE_QUESTION: (quizId, questionId) =>
    `${BASE_URL}/quizzes/${quizId}/questions/${questionId}`, // PUT (admin)
  DELETE_QUESTION: (quizId, questionId) =>
    `${BASE_URL}/quizzes/${quizId}/questions/${questionId}`, // DELETE (admin)

  GET_SUBJECTS: `${BASE_URL}/quizzes/subjects`, // GET (students see subjects list)
  GET_QUIZZES_BY_SUBJECT: (subject) => `${BASE_URL}/quizzes/subject/${subject}`, // GET quizzes/questions by subject

  SUBMIT_QUIZ: `${BASE_URL}/quizzes/submit`, // POST (student submit answers)

  GET_SUBMISSIONS: `${BASE_URL}/quizzes/submissions`, // GET (admin view all submissions, filter by quizId/studentId via query)
  GET_SUBMISSION_BY_ID: (submissionId) =>
    `${BASE_URL}/quizzes/submissions/${submissionId}`, // GET single submission (admin)
};
