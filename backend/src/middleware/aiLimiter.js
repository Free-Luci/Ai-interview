import rateLimit from "express-rate-limit";

const aiLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 20, // 20 AI evaluations per day
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Daily AI interview limit reached. Please try again tomorrow."
  }
});

export default aiLimiter;
