import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import taskRouter from "./routes/taskRouter.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
const app = express();
const port = process.env.PORT || 5000;

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Task API routes
app.use("/api/tasks", taskRouter);
//User API routes
app.use("/api/users", userRoutes);
// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
