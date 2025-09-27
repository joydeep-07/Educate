import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"; // Keep if auth exists
import courseRoutes from "./routes/course.routes.js";
import blogRoutes from "./routes/blog.routes.js";
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your React dev server
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express App 🚀");
});

app.use("/api/auth", authRoutes); // Keep if you have auth
app.use("/api/courses", courseRoutes);
app.use("/api/blogs", blogRoutes);
export default app;
