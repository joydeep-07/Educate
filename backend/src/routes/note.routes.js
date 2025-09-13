import express from "express";
import { createNote, getNotes } from "../controller/note.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// POST → Create Note with file uploads
router.post("/notes", upload.array("contents"), createNote);

// GET → Fetch all notes
router.get("/notes", getNotes);

export default router;
