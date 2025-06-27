import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Please add a task title"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    category: {
      type: String,
      enum: [
        "personal",
        "work",
        "study",
        "home",
        "school",
        "health",
        "tech",
        "leisure",
      ],
      default: "personal",
    },

    dueDate: {
      type: Date,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    reminder: {
      type: Date, // optional reminder field
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
