const {
  handleCastError,
  handleValidationError,
  handleDuplicateKeyError,
} = require("./general-errors");
const { NODE_ENV } = process.env;

exports.errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // Handle specific error types
  if (err.name === "CastError") error = handleCastError(err);
  if (err.name === "ValidationError") error = handleValidationError(err);
  if (err.code === 11000) error = handleDuplicateKeyError(err);
  // if (err.name === "JsonWebTokenError") error = handleJWTError();
  // if (err.name === "TokenExpiredError") error = handleJWTExpiredError();
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (NODE_ENV === "development") {
    res.status(error.statusCode).json({
      status: error.status,
      error: err,
      message: error.message,
      stack: err.stack,
    });
  } else {
    // Production mode
    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
    // Programming or unknown errors
    res.status(500).json({
      status: error.status,
      message: error.message,
      // status: "error",
      // message: "💥 Something went wrong!",
    });
  }
};
// if (err instanceof ZodError) {
//   return res.status(400).json({
//     status: "fail",
//     message: "Validation error",
//     errors: err.errors,
//   });
// }
//   const handleDuplicatedFieldDB = (err) => {
//   const value = Object.values(err.keyValue).join(", ");
//   const message = `Duplicate field value: ${value}. please use another value!`;
//   return new ApiError(message, 400);
// };
