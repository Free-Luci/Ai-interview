import express from "express";
import upload from "../middleware/upload.js";
import { analyzeResume } from "../controllers/resumeController.js";
// import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/analyze",
  //  protect,
    upload.any(),
     analyzeResume);

export default router;
