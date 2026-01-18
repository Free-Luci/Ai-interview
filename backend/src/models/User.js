import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      // uppercase: true,
      // lowercase: true,
      trim: true
    },
    rolePreference: {
      type: String,
      enum: ["frontend", "backend", "mern", "ml"],
      default: "mern"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
