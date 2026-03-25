import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Define upload directory (production-safe)
const uploadDir = path.join(process.cwd(), "uploads");

// ✅ Ensure uploads folder exists (VERY IMPORTANT for Railway)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // ✅ always use same safe path
  },
  filename: (req, file, cb) => {
    // ✅ sanitize filename
    const sanitizedName = file.originalname.replace(/\s+/g, "-");

    // ✅ ensure unique filename
    const uniqueName = `${Date.now()}-${sanitizedName}`;

    cb(null, uniqueName);
  },
});

// ✅ File type validation
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed."
      ),
      false
    );
  }
};

// ✅ Multer config
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // ✅ 5MB limit
  },
});