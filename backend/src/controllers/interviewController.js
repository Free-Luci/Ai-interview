import InterviewAttempt from "../models/InterviewAttempt.js";
import AppError from "../utils/AppError.js";
import { evaluateAnswerWithAI } from "../services/aiService.js";
import { validateAIResponse } from "../services/aiValidator.js";

export const submitAnswer = async (req, res, next) => {
  try {
    const { role, topic, question, answer } = req.body;

    if (
      !role ||
      !topic ||
      !question ||
      !answer ||
      answer.trim().length < 20 ||
      !/[a-zA-Z]/.test(answer)
    ) {
      return next(new AppError("Invalid answer input", 400));
    }

    const aiRawResponse = await evaluateAnswerWithAI({
      role,
      topic,
      question,
      answer
    });

    let aiResult;
    try {
      aiResult = JSON.parse(aiRawResponse);
    } catch (error) {
      throw new AppError("AI response parsing failed", 503);
    }

    if (!validateAIResponse(aiResult)) {
      aiResult = {
        score: 0,
        strengths: [],
        improvements: [
          "AI could not evaluate this answer properly. Please try again."
        ],
        improvedAnswer: "",
        followUpQuestion: "Can you explain your answer in more detail?"
      };
    }

    await InterviewAttempt.create({
      userId: req.user.id,
      role,
      topic,
      question,
      answer,
      score: aiResult.score,
      feedback: {
        strengths: aiResult.strengths,
        improvements: aiResult.improvements,
        improvedAnswer: aiResult.improvedAnswer,
        followUpQuestion: aiResult.followUpQuestion
      }
    });

    res.json({
      success: true,
      feedback: aiResult
    });
  } catch (error) {
    next(error);
  }
};
