import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  submitAnswer,  getInterviewSummary, resetInterviewSummary} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/submit", protect, submitAnswer);
router.get("/summary", protect, getInterviewSummary);
router.delete("/summary/reset", protect, resetInterviewSummary);

export default router;
