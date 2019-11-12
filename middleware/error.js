const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (error, req, res, next) => {
  let err = { ...error };

  err.message = error.message;

  console.log(error);

  if (error.name === "CastError") {
    const message = `Movie not found with id ${error.value}`;
    err = new ErrorResponse(message, 404);
  }

  // Duplicate key
  if (error.code === 11000) {
    const message = "Duplicate value entered";
    err = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map(val => val.message);
    err = new ErrorResponse(message, 400);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Server Error"
  });
};

module.exports = errorHandler;
