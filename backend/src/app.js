// CREATE SERVER app.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";


dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express App, Your server is running on port 3000 🚀");
});

// Auth Routes
app.use("/api/auth", authRoutes);


export default app;
