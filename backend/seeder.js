import mongoose from "mongoose";
import dotenv from "dotenv";
import tasks from "./data/tasks.js";
import users from "./data/users.js";

import Task from "./models/taskModel.js";
import User from "./models/userModel.js";

import connectDB from "./config/db.js";
dotenv.config();
connectDB();
const importData = async () => {
  try {
    await User.deleteMany();
    await Task.deleteMany();
    // Insert users and get the admin user ID
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleTasks = tasks.map((task) => {
      return { ...task, user: adminUser };
    });
    await Task.insertMany(sampleTasks);
    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Task.deleteMany();
    console.log("Data Destroyed Successfully!");
    process.exit();
  } catch (error) {
    console.error("Error destroying data:", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
