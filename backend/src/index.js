import express from "express";
import dotenv from "dotenv";
dotenv.config();
// console.log("ENV CHECK:", process.env.OPENAI_API_KEY);

import cors from "cors";
import mongoose from "mongoose";

import globalLimiter from "./middleware/globalLimiter.js";
import errorHandler from "./middleware/errorHandler.js";

// Routes (we will create these next)
import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";


const app = express();

/* ------------------ MIDDLEWARE ------------------ */
app.use(cors());
app.use(express.json());
app.use(globalLimiter);

/* ------------------ ROUTES ------------------ */
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

/* ------------------ HEALTH CHECK ------------------ */
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is running 🚀" });
});

/* ------------------ GLOBAL ERROR HANDLER ------------------ */
app.use(errorHandler);

/* ------------------ DB + SERVER ------------------ */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    // console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);  //delete it later.

    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
