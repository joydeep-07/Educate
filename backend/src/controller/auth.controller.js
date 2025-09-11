const Student = require("../models/student.model");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (student) => {
  return jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// @desc Register student
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const student = await Student.create({ name, email, password });

    const token = generateToken(student);

    res
      .cookie("token", token, { httpOnly: true, secure: false })
      .status(201)
      .json({ message: "Account created successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Login student
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(student);

    res
      .cookie("token", token, { httpOnly: true, secure: false })
      .status(200)
      .json({ message: "Login successful", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Logout student
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
