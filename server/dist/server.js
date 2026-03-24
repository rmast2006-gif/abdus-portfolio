"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Routes & DB
const db_1 = require("./config/db");
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const adminAuthRoutes_1 = __importDefault(require("./routes/adminAuthRoutes"));
const contentRoutes_1 = __importDefault(require("./routes/contentRoutes"));
const skillRoutes_1 = __importDefault(require("./routes/skillRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
// ✅ connect DB
(0, db_1.connectDB)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend working 🚀" });
});
// ✅ ROUTES
app.use("/api/projects", projectRoutes_1.default);
app.use("/api/contact", contactRoutes_1.default);
app.use("/api/admin", adminAuthRoutes_1.default);
app.use("/api/content", contentRoutes_1.default);
app.use("/api/skills", skillRoutes_1.default);
app.use("/api/upload", uploadRoutes_1.default);
// ✅ STATIC
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
app.get("/", (req, res) => {
    res.send("API is running on Railway 🚀");
});
app.use(errorHandler_1.errorHandler);
// ✅ THIS IS REQUIRED FOR RAILWAY
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
