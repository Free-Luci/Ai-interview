import express from "express";
import dotenv from "dotenv";
dotenv.config();
// console.log("ENV CHECK:", process.env.OPENAI_API_KEY);

import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import globalLimiter from "./middleware/globalLimiter.js";
import errorHandler from "./middleware/errorHandler.js";

// Routes (we will create these next)
import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";



const app = express();

app.use(cookieParser());
/* ------------------ MIDDLEWARE ------------------ */
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ EXACT frontend origin
    credentials: true,               // ✅ REQUIRED for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(globalLimiter);

/* ------------------ ROUTES ------------------ */
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

/* ------------------ HEALTH CHECK ------------------ */
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
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
