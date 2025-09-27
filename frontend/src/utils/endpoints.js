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
  GET_COURSE_BY_ID: (id) => `${BASE_URL}/courses/${id}`, // GET single

  // Blogs
  ADD_BLOG: `${BASE_URL}/blogs/add`, // POST
  GET_BLOGS: `${BASE_URL}/blogs`, // GET all
  GET_BLOG_BY_ID: (id) => `${BASE_URL}/blogs/${id}`, // GET single
  UPDATE_BLOG: (id) => `${BASE_URL}/blogs/${id}`, // PUT
  DELETE_BLOG: (id) => `${BASE_URL}/blogs/${id}`, // DELETE
};
