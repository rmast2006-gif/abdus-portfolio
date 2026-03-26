import express from "express";
import { upload } from "../middleware/uploadMiddleware";

const router = express.Router();

// ✅ SINGLE FILE UPLOAD (FIXED)
router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    return res.status(200).json({
      message: "Upload successful",
      url: fileUrl,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return res.status(500).json({ message: "Upload failed" });
  }
});

export default router;