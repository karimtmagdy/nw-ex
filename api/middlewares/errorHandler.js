const {
  handleCastError,
  handleValidationError,
  handleDuplicatedFieldDB,
} = require("./general-errors");
const { NODE_ENV } = process.env;

exports.errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // Handle specific error types
  if (err.name === "CastError") error = handleCastError(err);
  if (err.name === "ValidationError") error = handleValidationError(err);
  // if (err.code === 11000) error = handleDuplicateKeyError(err);
  if (err.code === 11000) error = handleDuplicatedFieldDB(err);
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
      // message: "💥 Something went wrong!",
    });
  }
};
