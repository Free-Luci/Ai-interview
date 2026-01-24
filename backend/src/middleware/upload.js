import multer from "multer";

const storage = multer.memoryStorage();   // 🔥 IMPORTANT

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    } else {
    cb(null, true);
  }
},
});

export default upload;
