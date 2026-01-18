import mongoose from "mongoose";

const interviewAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    questionIndex: {
      type: Number,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    feedback: {
      strengths: {
        type: [String],
        default: [],
      },
      improvements: {
        type: [String],
        default: [],
      },
      improvedAnswer: {
        type: String,
        default: "",
      },
      followUpQuestion: {
        type: String,
        default: "",
      },
    },

    autoSubmitted: {
      type: Boolean,
      default: false,
    },

    autoSubmitReason: {
      type: String,
      enum: ["TAB_SWITCH", "PAGE_CLOSE", "TIME_EXPIRED"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "InterviewAttempt",
  interviewAttemptSchema
);
