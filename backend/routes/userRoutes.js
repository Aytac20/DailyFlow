import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
} from "../controllers/userController.js";
// Register a new user
router.route("/").post(registerUser);

// Login
router.route("/auth").post(authUser);

// Logout
router.route("/logout").post(logoutUser);

export default router;
