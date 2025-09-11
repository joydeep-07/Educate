// CREATE SERVER app.js
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("../src/routes/auth.routes"); 
const cors = require("cors");


const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express App, Your server is running on port 3000 🚀");
});

// Auth Routes
app.use("/api/auth", authRoutes);

module.exports = app;
