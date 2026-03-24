"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AdminUser_1 = __importDefault(require("../models/AdminUser"));
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    const FALLBACK_ADMIN_EMAIL = "abdu.ssamietahir2006@gmail.com";
    const FALLBACK_ADMIN_PASSWORD = "qwerty999";
    try {
        // Normalize email input
        const normalizedEmail = email.trim().toLowerCase();
        let user = await AdminUser_1.default.findOne({ email: normalizedEmail });
        if (!user) {
            // Check for fallback admin
            if (normalizedEmail === FALLBACK_ADMIN_EMAIL && password === FALLBACK_ADMIN_PASSWORD) {
                const token = jsonwebtoken_1.default.sign({ id: "fallback-admin", email: FALLBACK_ADMIN_EMAIL }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "7d" });
                return res.json({ token, email: FALLBACK_ADMIN_EMAIL });
            }
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            // Also check fallback if database user exists but password doesn't match (unlikely but safe)
            if (normalizedEmail === FALLBACK_ADMIN_EMAIL && password === FALLBACK_ADMIN_PASSWORD) {
                const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "7d" });
                return res.json({ token, email: user.email });
            }
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "7d" });
        res.json({ token, email: user.email });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.loginAdmin = loginAdmin;
