import mongoose from "mongoose";

const interviewAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    role: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    feedback: {
      strengths: [String],
      improvements: [String],
      improvedAnswer: String,
      followUpQuestion: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("InterviewAttempt", interviewAttemptSchema);
