"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Skill_1 = __importDefault(require("../models/Skill"));
const db_1 = require("../config/db");
dotenv_1.default.config();
const skills = [
    // Frontend
    { name: "React", level: 90, category: "Frontend", color: "#61DAFB", order: 1 },
    { name: "Three.js", level: 85, category: "Frontend", color: "#000000", order: 2 },
    { name: "Tailwind CSS", level: 95, category: "Frontend", color: "#06B6D4", order: 3 },
    { name: "Framer Motion", level: 80, category: "Frontend", color: "#FF0055", order: 4 },
    { name: "TypeScript", level: 85, category: "Frontend", color: "#3178C6", order: 5 },
    // Backend
    { name: "Node.js", level: 85, category: "Backend", color: "#339933", order: 6 },
    { name: "Express", level: 80, category: "Backend", color: "#000000", order: 7 },
    { name: "MongoDB", level: 75, category: "Backend", color: "#47A248", order: 8 },
    { name: "REST API", level: 90, category: "Backend", color: "#FF6C37", order: 9 },
    { name: "Firebase", level: 70, category: "Backend", color: "#FFCA28", order: 10 },
    // Other
    { name: "Git", level: 85, category: "Other", color: "#F05032", order: 11 },
    { name: "Docker", level: 60, category: "Other", color: "#2496ED", order: 12 },
    { name: "Vite", level: 90, category: "Other", color: "#646CFF", order: 13 },
    { name: "ESLint", level: 80, category: "Other", color: "#4B32C3", order: 14 },
    { name: "Postman", level: 85, category: "Other", color: "#FF6C37", order: 15 },
];
const seedSkills = async () => {
    try {
        await (0, db_1.connectDB)();
        for (const item of skills) {
            await Skill_1.default.findOneAndUpdate({ name: item.name }, item, { upsert: true, new: true });
            console.log(`Seeded Skill: ${item.name}`);
        }
        console.log("Skills seeded successfully");
        process.exit(0);
    }
    catch (error) {
        console.error("Error seeding skills:", error);
        process.exit(1);
    }
};
seedSkills();
