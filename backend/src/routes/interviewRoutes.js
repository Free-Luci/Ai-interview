import express from "express";
import auth from "../middleware/auth.js";
import aiLimiter from "../middleware/aiLimiter.js";
import { submitAnswer } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/submit", auth, aiLimiter, submitAnswer);

export default router;
