import rateLimit from "express-rate-limit";

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "production" ? 200 : 500,
  standardHeaders: true,
  legacyHeaders: false,

  skip: (req) => {
    return req.path === "/api/health";
  },

  message: {
    success: false,
    message: "Too many requests. Please slow down."
  }
});

export default globalLimiter;
