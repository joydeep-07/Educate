import multer from "multer";

// Store files in memory for direct upload to ImageKit
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

export default upload;
