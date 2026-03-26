import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController";

import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware"; // ✅ ADD THIS

const router = express.Router();

// GET
router.get("/", getProjects);

// CREATE (✅ ADD upload middleware)
router.post("/", protect, upload.single("file"), createProject);

// UPDATE (✅ ADD upload middleware)
router.put("/:id", protect, upload.single("file"), updateProject);

// DELETE
router.delete("/:id", protect, deleteProject);

export default router;