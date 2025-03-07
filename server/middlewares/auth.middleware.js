import { catchAsyncErrors } from "./catchAsyncErrors.middleware.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;

  if (token === undefined) {
    return res.status(401).json({
      success: false,
      message: "User is unauthenticated",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or Expired token",
      });
    }

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});