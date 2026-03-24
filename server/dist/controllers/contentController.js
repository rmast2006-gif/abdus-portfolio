"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContent = exports.getPageContent = void 0;
const SiteContent_1 = __importDefault(require("../models/SiteContent"));
const mongoose_1 = __importDefault(require("mongoose"));
// Correcting FALLBACK_CONTENT index type
const FALLBACK_CONTENT = {
    page1: [],
    page2: []
};
const getPageContent = async (req, res) => {
    const page = req.params.page; // Casting 'page' to string
    // Check if database is connected
    if (mongoose_1.default.connection.readyState !== 1) {
        console.warn(`⚠️ Database not connected. Returning fallback data for page: ${page}`);
        return res.json(FALLBACK_CONTENT[page] || []);
    }
    try {
        const content = await SiteContent_1.default.find({ page });
        // If no content found in DB, return fallback
        if (!content || content.length === 0) {
            console.log(`ℹ️ No content found in database for page: ${page}. Returning fallback data.`);
            return res.json(FALLBACK_CONTENT[page] || []);
        }
        res.json(content);
    }
    catch (error) {
        console.error(`❌ Error fetching content for page ${page}:`, error);
        // Return fallback data on error instead of 500
        res.json(FALLBACK_CONTENT[page] || []);
    }
};
exports.getPageContent = getPageContent;
const updateContent = async (req, res) => {
    const { page, section, key, value, type } = req.body;
    if (mongoose_1.default.connection.readyState !== 1) {
        return res.status(503).json({ error: "Database not connected. Updates are disabled in offline mode." });
    }
    try {
        const content = await SiteContent_1.default.findOneAndUpdate({ page, section, key }, { value, type }, { upsert: true, new: true });
        res.json(content);
    }
    catch (error) {
        console.error("❌ Error updating content:", error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.updateContent = updateContent;
