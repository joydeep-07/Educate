import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import adminRoutes from "./routes/admin.routes.js";
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express App 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/quizzes", quizRoutes); 
app.use("/api/admin", adminRoutes);

export default app;
