const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
// This middleware handles 404 errors and general errors in the application.
// The `notFound` function creates a 404 error for requests that do not match any route.
// The `errorHandler` function sends a JSON response with the error message and stack trace if  not in production.
// It sets the response status code to 500 if it is not already set to a different value.
// These functions are exported for use in the main application file to handle errors globally.
