const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Logs error to console (optional)

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong!",
    // stack: process.env.NODE_ENV === "production" ? null : err.stack, // hide stack in production
  });
};

module.exports = errorHandler;
