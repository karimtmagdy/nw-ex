const { AppError } = require("../class/app.error");
// Handle Mongoose CastError (invalid ID)
exports.handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
// Handle Mongoose duplicate key error (code 11000)
exports.handleDuplicatedFieldDB = (err) => {
  const value = Object.values(err.keyValue).join(", ");
  const message = `Duplicate field value: ${value}. please use another value!`;
  return new ApiError(message, 400);
};

// Handle Mongoose validation errors
exports.handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

// Handle JWT token errors
exports.handleJWTError = () => {
  return new AppError(
    "Invalid token format or signature. Please log in again.",
    401
  );
};
exports.handleJWTExpiredError = () => {
  return new AppError("Your session has expired. Please log in again.", 401);
};
// Handle MongoDB duplicate key error (code 11000)
// exports.handleDuplicateKeyError = (err) => {
//   // Extract field name and value from error message if keyValue is not available
//   if (err.keyValue) {
//     const field = Object.keys(err.keyValue)[0];
//     const value = err.keyValue[field];
//     const message = `The ${field} '${value}' is already taken. Please choose a different ${field}.`;
//     return new AppError(message, 409);
//   } else if (err.errmsg) {
//     // Extract collection, index name, field and value from error message
//     const match = err.errmsg.match(
//       /E11000 duplicate key error collection: ([\w.]+) index: ([\w_]+) dup key: \{ ([\w]+): "([^"]+)" \}/
//     );
//     if (match) {
//       const [, collection, indexName, field, value] = match;
//       const message = `Duplicate ${field} '${value}' in ${collection} collection. Please choose a different value.`;
//       return new AppError(message, 409);
//     }
//   }

  // Fallback message
//   return new AppError(
//     "Duplicate field value entered. Please use a different value.",
//     409
//   );
// };