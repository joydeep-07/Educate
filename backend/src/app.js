import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from Express App 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/enrollments", enrollmentRoutes);

export default app;
