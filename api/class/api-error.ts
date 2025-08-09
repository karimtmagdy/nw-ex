class AppError extends Error {
  status: string;
  stack?: string;
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    //  this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
