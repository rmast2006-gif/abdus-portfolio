import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware"; // ✅ using your existing middleware

const router = express.Router();

// GET ALL PROJECTS
router.get("/", getProjects);

// CREATE PROJECT (WITH IMAGE UPLOAD)
router.post("/", protect, upload.single("image"), createProject);

// UPDATE PROJECT (WITH IMAGE UPLOAD)
router.put("/:id", protect, upload.single("image"), updateProject);

// DELETE PROJECT
router.delete("/:id", protect, deleteProject);

export default router;