import ErrorHandler from "../middlewares/error.middleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto"; 
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendSuccessResetPasswordEmail,
} from "../services/emails.service.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new ErrorHandler("Please enter all fields", 400));
    }

    const isRegistered = await User.findOne({ email, accountVerified: true });
    if (isRegistered) {
      return next(new ErrorHandler("User already exists, please login", 400));
    }

    if (password.length < 6 || password.length > 20) {
      return next(
        new ErrorHandler("Password must be between 6 and 20 characters", 400)
      );
    }

    // 🛑 Delete any existing unverified user with this email before creating a new one
    await User.deleteOne({
      email,
      accountVerified: false,              
      verificationCodeExpire: { $lt: Date.now() },
    });

    const registeredButNotVerified = await User.findOne({
      email,
      accountVerified: false,
      verificationCodeExpire: { $gt: Date.now() },
    });
        
    if (registeredButNotVerified ) {
      return next(
        new ErrorHandler(
          "Verification Code is send to your email, please verify your account",
          400
        )
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const verificationCode = await user.generateVerificationCode();
    await user.save();
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({
      success: true,
      user
    });
  } catch (err) {
    next(err);
  }
});

export const verifyEmail = catchAsyncErrors(async (req, res, next) => {
  const { email, verificationCode } = req.body;
  if (!email || !verificationCode) {
    return next(new ErrorHandler("Email or OTP is missing", 400));
  }

  try {
    const user = await User.findOne({                    
      email,
      accountVerified: false,
      verificationCode,
      verificationCodeExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorHandler("User not found or Invalid OTP", 404));
    }

    user.accountVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpire = undefined;

    await user.save({validateModifiedOnly: true});      

    const token = user.generateJWT(res);
    await sendWelcomeEmail(email, user.name);

    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email,password)

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (!user.accountVerified) {
    return next(
      new ErrorHandler(
        "Your account is not verified, please verify your account",
        400
      )
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Incorrect password", 400));
  }

  const token = user.generateJWT(res);

  res.status(200).json({
    success: true,
    user: {
      ...user._doc,
      password: undefined,
    } ,
    token,
  });
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
})

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorHandler("Email is required", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = await user.generateResetPasswordToken();
  await user.save();

  const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  
  try {
    await sendResetPasswordEmail(email, resetPasswordUrl);
    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      resetToken: resetToken
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 400));
  }

});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { resetToken } = req.params;
  const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Token is invalid or expired", 400));
  }

  if (!req.body.password || !req.body.confirmPassword) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  if(req.body.password.length < 6 || req.body.password.length > 20) {
    return next(new ErrorHandler("Password must be between 6 and 20 characters", 400));
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  const token = user.generateJWT(res);
  await user.save();

  try{
    await sendSuccessResetPasswordEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: "Password reset successful",
      token
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }

});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Current password is incorrect", 400));
  }

  if(newPassword === currentPassword) {
    return next(new ErrorHandler("New password cannot be the same as the current password", 400));
  }

  if(newPassword !== confirmNewPassword) {
    return next(new ErrorHandler("Passwords not same, please confirm your password correctly", 400));
  }

  if(newPassword.length < 6 || newPassword.length > 20) {
    return next(new ErrorHandler("Password must be between 6 and 20 characters", 400));
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });

});
