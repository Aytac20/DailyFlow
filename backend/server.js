import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import taskRouter from "./routes/taskRouter.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import path from "path";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
dotenv.config();

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRoutes);

// 🧠 Serve Frontend in production
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

// ❌ Moved to bottom so frontend routes are handled first
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
