import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// @desc Protect routes
// @route Middleware
// @access Private
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});
