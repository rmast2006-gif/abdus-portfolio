"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const skillSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 0, max: 100 },
    category: { type: String, required: true, enum: ["Frontend", "Backend", "Database & DevOps", "Other"] },
    color: { type: String, default: "#7df9e8" },
    order: { type: Number, default: 0 },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Skill", skillSchema);
