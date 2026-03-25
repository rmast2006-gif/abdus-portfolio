import express from "express";
import { upload } from "../middleware/uploadMiddleware";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, upload.single("file"), (req, res) => {
  // ✅ FIXED: "image" → "file"

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // ✅ keep your dynamic URL logic (GOOD)
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  res.json({
    url: `${baseUrl}/uploads/${req.file.filename}`,
  });
});

export default router;