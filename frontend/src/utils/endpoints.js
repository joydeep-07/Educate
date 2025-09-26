const BASE_URL = "http://localhost:3000/api";

export const ENDPOINTS = {
  // Auth
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,

  // Courses
  ADD_COURSE: `${BASE_URL}/courses/add`,
  GET_COURSES: `${BASE_URL}/courses`,
  UPDATE_COURSE: (id) => `${BASE_URL}/courses/${id}`, // PUT
  DELETE_COURSE: (id) => `${BASE_URL}/courses/${id}`, // DELETE
  GET_COURSE_BY_ID: (id) => `${BASE_URL}/courses/${id}`, // optional: GET single
};
