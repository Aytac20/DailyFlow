import asyncHandler from "../middleware/asyncHandler.js";
import Task from "../models/taskModel.js";
//@desc Fetch all tasks
//@route GET /api/tasks
//@access Public
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
});

// @desc Create a new task
// @route POST /api/tasks
// @access Protect

const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, category, dueDate } = req.body;

  // Validation
  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  // Create task (with optional user if authenticated)
  const task = new Task({
    user: req.user?._id, // Optional chaining in case there's no user
    title,
    description: description || "",
    priority: priority || "medium",
    category: category || "personal",
    dueDate: dueDate || null,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.category = req.body.category || task.category;
  task.dueDate = req.body.dueDate || task.dueDate;
  task.completed =
    typeof req.body.completed === "boolean"
      ? req.body.completed
      : task.completed;

  const updatedTask = await task.save();
  res.status(200).json(updatedTask);
});
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    await Task.deleteOne({ _id: task._id });
    res.status(200).json({ message: "Task deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
export { getTasks, createTask, updateTask, deleteTask };
