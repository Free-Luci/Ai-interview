import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const protect = (req, res, next) => {
  let token;

  /* -----------------------------------------
     1️⃣ Try JWT from cookie (PRIMARY)
  ------------------------------------------*/
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  /* -----------------------------------------
     2️⃣ Fallback: Authorization header
  ------------------------------------------*/
  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  /* -----------------------------------------
     3️⃣ No token found
  ------------------------------------------*/
  if (!token) {
    return next(new AppError("Not authorized, token missing", 401));
  }

  /* -----------------------------------------
     4️⃣ Verify token
  ------------------------------------------*/
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded should contain user id
    req.user = {
      id: decoded.id || decoded._id,
    };

    next();
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

export default protect;
