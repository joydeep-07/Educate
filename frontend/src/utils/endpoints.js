const BASE_URL = "http://localhost:3000/api";

export const ENDPOINTS = {
  // ===================== Auth =====================
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,

  // ===================== Admin =====================
  ADMIN_REGISTER: `${BASE_URL}/admin/register`,
  GET_ADMINS: `${BASE_URL}/admin`, // if you want to get all admins

  // ===================== Courses =====================
  ADD_COURSE: `${BASE_URL}/courses/add`,
  GET_COURSES: `${BASE_URL}/courses`,
  UPDATE_COURSE: (id) => `${BASE_URL}/courses/${id}`, // PUT
  DELETE_COURSE: (id) => `${BASE_URL}/courses/${id}`, // DELETE
  GET_COURSE_BY_ID: (id) => `${BASE_URL}/courses/${id}`, // GET single

  // ===================== Blogs =====================
  ADD_BLOG: `${BASE_URL}/blogs/add`,
  GET_BLOGS: `${BASE_URL}/blogs`,
  GET_BLOG_BY_ID: (id) => `${BASE_URL}/blogs/${id}`,
  UPDATE_BLOG: (id) => `${BASE_URL}/blogs/${id}`,
  DELETE_BLOG: (id) => `${BASE_URL}/blogs/${id}`,

  // ===================== Quizzes =====================
  CREATE_QUIZ: `${BASE_URL}/quizzes`,
  ADD_QUESTION: (quizId) => `${BASE_URL}/quizzes/${quizId}/questions`,
  UPDATE_QUESTION: (quizId, questionId) =>
    `${BASE_URL}/quizzes/${quizId}/questions/${questionId}`,
  DELETE_QUESTION: (quizId, questionId) =>
    `${BASE_URL}/quizzes/${quizId}/questions/${questionId}`,

  GET_SUBJECTS: `${BASE_URL}/quizzes/subjects`,
  GET_QUIZZES_BY_SUBJECT: (subject) => `${BASE_URL}/quizzes/subject/${subject}`,

  SUBMIT_QUIZ: `${BASE_URL}/quizzes/submit`,

  GET_SUBMISSIONS: `${BASE_URL}/quizzes/submissions`,
  GET_SUBMISSION_BY_ID: (submissionId) =>
    `${BASE_URL}/quizzes/submissions/${submissionId}`,
};
