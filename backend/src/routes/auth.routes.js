const express = require("express");
const {
  register,
  login,
  logout,
  getAllStudents,
  getMe,
} = require("../controller/auth.controller");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/students", getAllStudents);

// New route for logged-in student
router.get("/me", protect, getMe);

module.exports = router;
