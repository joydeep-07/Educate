import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controller/blog.controller.js";

const router = express.Router();

// Create
router.post("/add", createBlog);

// Read
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// Update
router.put("/:id", updateBlog);

// Delete
router.delete("/:id", deleteBlog);

export default router;
