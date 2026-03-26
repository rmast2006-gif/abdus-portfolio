import { Request, Response } from "express";
import mongoose from "mongoose";
import Project from "../models/Project";

// ✅ GET ALL PROJECTS
export const getProjects = async (req: Request, res: Response) => {
  try {
    console.log("🔥 ABDUS BACKEND V2 WORKING");

    if (mongoose.connection.readyState !== 1) {
      console.error("❌ Database not connected");
      return res.status(500).json({ message: "Database not connected" });
    }

    const projects = await Project.find().sort({ createdAt: -1 });

    return res.status(200).json(projects || []);
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ✅ CREATE PROJECT (FIXED 🔥)
export const createProject = async (req: any, res: Response) => {
  try {
    const { title, description, liveLink, githubLink, tags } = req.body;

    // ✅ HANDLE FILE
    let image = "";
    if (req.file) {
      image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const project = await Project.create({
      title,
      description,
      image,
      liveLink,
      githubLink,
      tags,
    });

    return res.status(201).json(project);
  } catch (error) {
    console.error("❌ Error creating project:", error);
    return res.status(400).json({ message: "Invalid project data" });
  }
};

// ✅ UPDATE PROJECT (FIXED 🔥)
export const updateProject = async (req: any, res: Response) => {
  try {
    let updateData = { ...req.body };

    // ✅ HANDLE FILE
    if (req.file) {
      updateData.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error("❌ Error updating project:", error);
    return res.status(400).json({ message: "Invalid project data" });
  }
};

// ✅ DELETE PROJECT
export const deleteProject = async (req: Request, res: Response) => {
  try {
    console.log("🗑️ DELETE REQUEST ID:", req.params.id);

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      console.warn("⚠️ Project not found:", req.params.id);
      return res.status(404).json({ message: "Project not found" });
    }

    console.log("✅ Project deleted:", project._id);

    return res.status(200).json({ message: "Project removed" });
  } catch (error) {
    console.error("❌ Error deleting project:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};