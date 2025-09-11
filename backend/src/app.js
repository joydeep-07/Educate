// CREATE SERVER app.js
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("../src/routes/auth.routes"); 

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express App, Your server is running on port 3000 🚀");
});

// Auth Routes
app.use("/api/auth", authRoutes);

module.exports = app;
