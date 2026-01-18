import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  submitAnswer,
  getInterviewSummary
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/submit", protect, submitAnswer);
router.get("/summary", protect, getInterviewSummary);

export default router;
