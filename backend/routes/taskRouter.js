import express from "express";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getTasks).post(protect, createTask);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

export default router;
