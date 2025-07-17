const { AppError } = require("../class/app.error");
const { errorHandler } = require("./errorHandler");

exports.MiddlewareApplication = (app) => {
  // Handle unhandled routes
  app.use((req, res, next) => {
    const error = new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      404
    );
    next(error);
  });
  app.use((req, res, next) => {
    req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico"
      ? res.status(204).end()
      : next();
  });
  // Global error handling middleware (add this after all routes)
  app.use(errorHandler);
};
