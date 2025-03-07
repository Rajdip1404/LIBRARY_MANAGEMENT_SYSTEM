class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode;
    this.message = message;

    // Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // 🛑 Handle Duplicate Key Error (MongoDB Unique Constraint)
  if (err.code === 11000) {
    statusCode = 400;
    message = `Duplicate field value entered: ${Object.keys(err.keyValue)}`;
  }

  // 🛑 Handle JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token, please try again.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired, please log in again.";
  }

  // 🛑 Handle Mongoose CastError (Invalid MongoDB Object ID)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}. Resource not found.`;
  }

  // 🛑 Handle Mongoose Validation Errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((el) => el.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack trace only in dev mode
  });
};

export default ErrorHandler;
