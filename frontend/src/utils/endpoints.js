const BASE_URL = "http://localhost:3000/api";

export const ENDPOINTS = {
  // ===================== Auth =====================
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,

  // ===================== Admin =====================
  ADMIN_REGISTER: `${BASE_URL}/admin/register`,
  GET_ADMINS: `${BASE_URL}/admin`,
  CHECK_EMAIL: `${BASE_URL}/admin/check-email`,
  VERIFY_OTP: `${BASE_URL}/admin/verify-otp`,

  // ===================== Courses =====================
  ADD_COURSE: `${BASE_URL}/courses/add`,
  GET_COURSES: `${BASE_URL}/courses`,
  GET_COURSE_BY_ID: (id) => `${BASE_URL}/courses/${id}`,
  UPDATE_COURSE: (id) => `${BASE_URL}/courses/${id}`,
  DELETE_COURSE: (id) => `${BASE_URL}/courses/${id}`,

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

  // ===================== Enrollment =====================
  ENROLL_STUDENT: `${BASE_URL}/enrollments/enroll`, // POST
  GET_ENROLLMENTS_BY_STUDENT: (studentId) =>
    `${BASE_URL}/enrollments/student/${studentId}`, // GET
  GET_ENROLLMENTS_BY_COURSE: (courseId) =>
    `${BASE_URL}/enrollments/course/${courseId}`, // GET
  UNENROLL_STUDENT: `${BASE_URL}/enrollments/unenroll`, // DELETE
};
