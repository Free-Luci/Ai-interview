import InterviewAttempt from "../models/InterviewAttempt.js";
import AppError from "../utils/AppError.js";
import { evaluateAnswerWithAI } from "../services/aiService.js";
import { validateAIResponse } from "../services/aiValidator.js";

export const submitAnswer = async (req, res, next) => {
  try {
    // console.log("🔥 FULL BODY RECEIVED:", req.body);
    const {
      role,
      topic,
      question,
      questionIndex,
      answer,
      autoSubmitted = false,
      autoSubmitReason = null,
    } = req.body;

      const parsedQuestionIndex = Number(questionIndex);

    // console.log("✅ PARSED questionIndex:", parsedQuestionIndex);
    // 🔍 DEBUG (safe to keep during dev)
    // console.log("DEBUG questionIndex:", questionIndex);

    /* -------------------------------------------------
        AUTO-SUBMIT REASON VALIDATION (SECURITY)
    ------------------------------------------------- */
    const allowedReasons = [
      "TAB_SWITCH",
      "PAGE_CLOSE",
      "TIME_EXPIRED",
    ];

    if (
      autoSubmitted === true &&
      !allowedReasons.includes(autoSubmitReason)
    ) {
      return next(
        new AppError("Invalid auto-submit reason", 400)
      );
    }

    if (autoSubmitted) {
      // console.log("AUTO SUBMITTED:", autoSubmitReason);
    }

    /* -------------------------------------------------
        INPUT VALIDATION (STRICT)
    ------------------------------------------------- */
    if (
      !role ||
      !topic ||
      !question ||
  Number.isNaN(Number(questionIndex)) ||
      !answer ||
      answer.trim().length < 20 ||
      !/[a-zA-Z]/.test(answer)
    ) {
      return next(
        new AppError("Invalid answer input", 400)
      );
    }

    /* -------------------------------------------------
        AI EVALUATION (UNCHANGED)
    ------------------------------------------------- */
    const aiRawResponse = await evaluateAnswerWithAI({
      role,
      topic,
      question,
      answer,
    });

    let aiResult;
    try {
      aiResult = JSON.parse(aiRawResponse);
    } catch (err) {
      throw new AppError(
        "AI response parsing failed",
        503
      );
    }

    if (!validateAIResponse(aiResult)) {
      aiResult = {
        score: 0,
        strengths: [],
        improvements: [
          "AI could not evaluate this answer properly. Please try again.",
        ],
        improvedAnswer: "",
        followUpQuestion:
          "Can you explain your answer in more detail?",
      };
    }

    /* -------------------------------------------------
        STORE INTERVIEW ATTEMPT
    ------------------------------------------------- */
    await InterviewAttempt.create({
      userId: req.user.id,
      role,
      topic,
      question,
      questionIndex,
      answer,
      score: aiResult.score,
      autoSubmitted,
      autoSubmitReason,
      feedback: {
        strengths: aiResult.strengths,
        improvements: aiResult.improvements,
        improvedAnswer: aiResult.improvedAnswer,
        followUpQuestion: aiResult.followUpQuestion,
      },
    });
// 🔹 TOTAL QUESTIONS PER INTERVIEW
const TOTAL_QUESTIONS = 5;

// After saving attempt
const attemptsCount = await InterviewAttempt.countDocuments({
  userId: req.user.id,
  role,
  topic,
});

// Check if interview finished
const interviewCompleted = attemptsCount >= TOTAL_QUESTIONS;
    /* -------------------------------------------------
        RESPONSE
    ------------------------------------------------- */
    res.json({
      success: true,
      feedback: aiResult,
      meta: {
        autoSubmitted,
        autoSubmitReason,
          attemptsCount,
        totalQuestions: TOTAL_QUESTIONS,
      },
    });
  } catch (error) {
    next(error);
  }
};
/* ============================
   GET INTERVIEW SUMMARY
   ============================ */
export const getInterviewSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const attempts = await InterviewAttempt.find({ userId })
      .sort({ createdAt: 1 });

    // 🔹 NO ATTEMPTS CASE (unchanged logic, just safer)
    if (!attempts.length) {
      return res.json({
        success: true,
        summary: {
          role: null,
          totalQuestions: 0,
          averageScore: 0,
          autoSubmissions: 0,
          completed: false,          //
          finalScore: 0,             // 
          attempts: []
        }
      });
    }

    const totalQuestions = attempts.length;

    const averageScore =
      attempts.reduce((sum, a) => sum + a.score, 0) / totalQuestions;

    const autoSubmissions = attempts.filter(
      (a) => a.autoSubmitted === true
    ).length;

    // 🔹 NEW LOGIC — INTERVIEW COMPLETION DETECTION
    const INTERVIEW_TOTAL = 5; // your fixed interview size
    const completed = totalQuestions >= INTERVIEW_TOTAL;

    // 🔹 FINAL SCORE (same as average for now, but extensible later)
    const finalScore = Number(averageScore.toFixed(2));

    res.json({
      success: true,
      summary: {
        role: attempts[0].role,
        totalQuestions,
        averageScore: finalScore,     // keep existing field
        autoSubmissions,

        // ✅ NEW FIELDS (won’t break old UI)
        completed,
        finalScore,

        attempts: attempts.map((a) => ({
          questionIndex: a.questionIndex,
          question: a.question,
          score: a.score,
          autoSubmitted: a.autoSubmitted,
          autoSubmitReason: a.autoSubmitReason,
          createdAt: a.createdAt,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

/* ============================
   RESET INTERVIEW SUMMARY
   ============================ */
export const resetInterviewSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;

    await InterviewAttempt.deleteMany({ userId });

    res.json({
      success: true,
      message: "Interview summary reset successfully",
    });
  } catch (error) {
    next(error);
  }
};
