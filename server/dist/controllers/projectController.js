"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjects = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Project_1 = __importDefault(require("../models/Project"));
// ✅ GET ALL PROJECTS
const getProjects = async (req, res) => {
    try {
        // 🔥 DEBUG LOG (VERY IMPORTANT)
        console.log("🔥 ABDUS BACKEND V2 WORKING");
        // ✅ Check DB connection
        if (mongoose_1.default.connection.readyState !== 1) {
            console.error("❌ Database not connected");
            return res.status(500).json({ message: "Database not connected" });
        }
        // ✅ Fetch projects from DB
        const projects = await Project_1.default.find().sort({ createdAt: -1 });
        // ✅ Return real data only (NO FALLBACK)
        return res.status(200).json(projects || []);
    }
    catch (error) {
        console.error("❌ Error fetching projects:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.getProjects = getProjects;
// ✅ CREATE PROJECT
const createProject = async (req, res) => {
    try {
        const { title, description, image, liveLink, githubLink, tags } = req.body;
        // ✅ Basic validation
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }
        const project = await Project_1.default.create({
            title,
            description,
            image,
            liveLink,
            githubLink,
            tags,
        });
        return res.status(201).json(project);
    }
    catch (error) {
        console.error("❌ Error creating project:", error);
        return res.status(400).json({ message: "Invalid project data" });
    }
};
exports.createProject = createProject;
// ✅ UPDATE PROJECT
const updateProject = async (req, res) => {
    try {
        const project = await Project_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        return res.status(200).json(project);
    }
    catch (error) {
        console.error("❌ Error updating project:", error);
        return res.status(400).json({ message: "Invalid project data" });
    }
};
exports.updateProject = updateProject;
// ✅ DELETE PROJECT
const deleteProject = async (req, res) => {
    try {
        console.log("🗑️ DELETE REQUEST ID:", req.params.id);
        const project = await Project_1.default.findByIdAndDelete(req.params.id);
        if (!project) {
            console.warn("⚠️ Project not found:", req.params.id);
            return res.status(404).json({ message: "Project not found" });
        }
        console.log("✅ Project deleted:", project._id);
        return res.status(200).json({ message: "Project removed" });
    }
    catch (error) {
        console.error("❌ Error deleting project:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.deleteProject = deleteProject;
