"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjects = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Project_1 = __importDefault(require("../models/Project"));
const FALLBACK_PROJECTS = [
    {
        _id: "fallback-1",
        title: "3D Portfolio",
        description: "An immersive 3D portfolio built with React and Three.js.",
        image: "https://picsum.photos/seed/portfolio/800/600",
        liveLink: "https://example.com",
        githubLink: "https://github.com",
        tags: ["React", "Three.js", "Tailwind CSS"],
        createdAt: new Date()
    },
    {
        _id: "fallback-2",
        title: "E-commerce Platform",
        description: "A full-stack e-commerce solution with real-time updates.",
        image: "https://picsum.photos/seed/shop/800/600",
        liveLink: "https://example.com",
        githubLink: "https://github.com",
        tags: ["Node.js", "Express", "MongoDB"],
        createdAt: new Date()
    }
];
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoose_1.default.connection.readyState !== 1) {
        console.warn("⚠️ Database not connected. Returning fallback projects.");
        return res.json(FALLBACK_PROJECTS);
    }
    try {
        const projects = yield Project_1.default.find().sort({ createdAt: -1 });
        if (!projects || projects.length === 0) {
            return res.json(FALLBACK_PROJECTS);
        }
        res.json(projects);
    }
    catch (error) {
        console.error("❌ Error fetching projects:", error);
        res.json(FALLBACK_PROJECTS);
    }
});
exports.getProjects = getProjects;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoose_1.default.connection.readyState !== 1) {
        return res.status(503).json({ message: "Database not connected. Cannot create project." });
    }
    try {
        const { title, description, image, liveLink, githubLink, tags } = req.body;
        const project = yield Project_1.default.create({ title, description, image, liveLink, githubLink, tags });
        res.status(201).json(project);
    }
    catch (error) {
        res.status(400).json({ message: "Invalid project data" });
    }
});
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoose_1.default.connection.readyState !== 1) {
        return res.status(503).json({ message: "Database not connected. Cannot update project." });
    }
    try {
        const project = yield Project_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!project)
            return res.status(404).json({ message: "Project not found" });
        res.json(project);
    }
    catch (error) {
        res.status(400).json({ message: "Invalid project data" });
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoose_1.default.connection.readyState !== 1) {
        return res.status(503).json({ message: "Database not connected. Cannot delete project." });
    }
    try {
        const project = yield Project_1.default.findByIdAndDelete(req.params.id);
        if (!project)
            return res.status(404).json({ message: "Project not found" });
        res.json({ message: "Project removed" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.deleteProject = deleteProject;
