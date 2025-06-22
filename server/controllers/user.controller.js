import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware.js";
import User from "../models/user.model.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary";


export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find({
        role: "User",
        accountVerified: true
    });
    res.status(200).json({
        success: true,
        users
    });
});

export const registerNewAdmin = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("Please upload a profile image for the admin", 400)
    );
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  if (password.length < 6 || password.length > 20) {
    return next(
      new ErrorHandler("Password must be between 6 and 20 characters", 400)
    );
  }

  const userExists = await User.findOne({ email, accountVerified: true });
  if (userExists) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const { avatar } = req.files;
  if (!avatar) {
    return next(new ErrorHandler("No avatar image uploaded", 400));
  }

  const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (!allowedFormats.includes(avatar.mimetype)) {
    return next(new ErrorHandler("Please upload an image file", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Upload to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    {
      folder: "LIBRARY_MANAGEMENT_SYSTEM_ADMIN_AVATARS",
    }
  );

  if (cloudinaryResponse.error) {
    console.error(
      "Error uploading image to Cloudinary:",
      cloudinaryResponse.error
    );
    return next(new ErrorHandler("Error uploading image to Cloudinary", 500));
  }

  const admin = await User.create({
    name,
    email,
    password: hashedPassword,
    accountVerified: true,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    role: "Admin",
  });

  res.status(201).json({
    success: true,
    message: "Admin registered successfully",
    admin,
  });
});

export const registerNewLibrarian = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("Please upload a profile image for the librarian", 400)
    );
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  if (password.length < 6 || password.length > 20) {
    return next(
      new ErrorHandler("Password must be between 6 and 20 characters", 400)
    );
  }

  const userExists = await User.findOne({ email, accountVerified: true });
  if (userExists) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const { avatar } = req.files;
  if (!avatar) {
    return next(new ErrorHandler("No avatar image uploaded", 400));
  }

  const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (!allowedFormats.includes(avatar.mimetype)) {
    return next(new ErrorHandler("Please upload an image file", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Upload to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    {
      folder: "LIBRARY_MANAGEMENT_SYSTEM_LIBRARIAN_AVATARS",
    }
  );

  if (cloudinaryResponse.error) {
    console.error(
      "Error uploading image to Cloudinary:",
      cloudinaryResponse.error
    );
    return next(new ErrorHandler("Error uploading image to Cloudinary", 500));
  }

  const librarian = await User.create({
    name,
    email,
    password: hashedPassword,
    accountVerified: true,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    role: "Librarian",
  });

  res.status(201).json({
    success: true,
    message: "Librarian registered successfully",
    librarian,
  });
});

