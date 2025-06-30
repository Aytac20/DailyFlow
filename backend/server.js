import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import taskRouter from "./routes/taskRouter.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
dotenv.config();
const port = process.env.PORT || 5000;
// Connect to MongoDB
connectDB();

const app = express();
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(cookieParser());

// Root route

// Task API routes
app.use("/api/tasks", taskRouter);
//User API routes
app.use("/api/users", userRoutes);
// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
