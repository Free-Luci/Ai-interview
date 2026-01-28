const errorHandler = (err, req, res, next) => {
  // console.error("ERROR ", err);

   // Safe logging
  if (!isProd) {
    console.error("❌ ERROR:", err);
  } else {
    console.error("❌ ERROR:", err.message);
  }

  // If response already sent, delegate to default Express handler
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;

  const message = err.isOperational
    ? err.message
    : "Something went wrong. Please try again later.";

  res.status(statusCode).json({
    success: false,
    message
  });
};

export default errorHandler;
