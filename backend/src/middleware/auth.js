import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized access", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.log("Auth Header:", req.headers.authorization);

    return next(new AppError("Invalid or expired token", 401));
  }
};

export default auth;
