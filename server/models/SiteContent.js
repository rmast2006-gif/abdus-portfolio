"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const siteContentSchema = new mongoose_1.default.Schema({
    page: { type: String, required: true },
    section: { type: String, required: true },
    key: { type: String, required: true },
    value: { type: String, required: true },
    type: { type: String, required: true, enum: ["text", "image"] },
}, { timestamps: true });
siteContentSchema.index({ page: 1, section: 1, key: 1 }, { unique: true });
exports.default = mongoose_1.default.model("SiteContent", siteContentSchema);
