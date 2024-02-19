class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Error.captureStackTrace is optional but helps us understand errors better in development
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
