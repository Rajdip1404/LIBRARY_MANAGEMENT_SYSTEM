class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// utils/errorResponse.js
export const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};


export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // 🛑 Handle Duplicate Key Error (MongoDB Unique Constraint)
  if (err.code === 11000) {
    statusCode = 400;
    message = `Duplicate field value entered: ${Object.keys(err.keyValue)}`;
    err = new ErrorHandler(message, statusCode);
  }
  
  // 🛑 Handle JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token, please try again.";
    err = new ErrorHandler(message, statusCode);
  }
  
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired, please log in again.";
    err = new ErrorHandler(message, statusCode);
  }
  
  // 🛑 Handle Mongoose CastError (Invalid MongoDB Object ID)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid id. Resource not found: ${err.path}`;
    err = new ErrorHandler(message, statusCode);
  }
  
  // 🛑 Handle Mongoose Validation Errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = `Validation Error: ${err.message}`;                
    err = new ErrorHandler(message, statusCode);
  }

  const errorMessage = err.errors ? Object.values(err.errors)
    .map((el) => el.message)
    .join(", ") : err.message; 

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack trace only in dev mode
  });
};

export default ErrorHandler;
