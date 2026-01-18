import InterviewAttempt from "../models/InterviewAttempt.js";
import AppError from "../utils/AppError.js";
import { evaluateAnswerWithAI } from "../services/aiService.js";
import { validateAIResponse } from "../services/aiValidator.js";

export const submitAnswer = async (req, res, next) => {
  try {
    const {
      role,
      topic,
      question,
      questionIndex,
      answer,
      autoSubmitted = false,
      autoSubmitReason = null,
    } = req.body;

    // 🔍 DEBUG (safe to keep during dev)
    console.log("DEBUG questionIndex:", questionIndex);

    /* -------------------------------------------------
       1️⃣ AUTO-SUBMIT REASON VALIDATION (SECURITY)
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
      console.log("AUTO SUBMITTED:", autoSubmitReason);
    }

    /* -------------------------------------------------
       2️⃣ INPUT VALIDATION (STRICT)
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
       3️⃣ AI EVALUATION (UNCHANGED)
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
       4️⃣ STORE INTERVIEW ATTEMPT
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

    /* -------------------------------------------------
       5️⃣ RESPONSE
    ------------------------------------------------- */
    res.json({
      success: true,
      feedback: aiResult,
      meta: {
        autoSubmitted,
        autoSubmitReason,
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

    if (!attempts.length) {
      return next(
        new AppError("No interview attempts found", 404)
      );
    }

    const totalQuestions = attempts.length;

    const averageScore =
      attempts.reduce((sum, a) => sum + a.score, 0) /
      totalQuestions;

    const autoSubmissions = attempts.filter(
      (a) => a.autoSubmitted
    ).length;

    res.json({
      success: true,
      summary: {
        role: attempts[0].role,
        totalQuestions,
        averageScore: Number(averageScore.toFixed(2)),
        autoSubmissions,
        autoSubmittedCount,
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
