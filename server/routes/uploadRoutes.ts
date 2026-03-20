import express from "express";
import { upload } from "../middleware/uploadMiddleware";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // ✅ FIX: send FULL URL
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  res.json({
    url: `${baseUrl}/uploads/${req.file.filename}`,
  });
});

export default router;