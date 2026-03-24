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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const __dirname = process.cwd();
// Debug (optional)
console.log("ENV TEST:", process.env.MONGO_URI);
// Routes & DB
const db_1 = require("./config/db");
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const adminAuthRoutes_1 = __importDefault(require("./routes/adminAuthRoutes"));
const contentRoutes_1 = __importDefault(require("./routes/contentRoutes"));
const skillRoutes_1 = __importDefault(require("./routes/skillRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = Number(process.env.PORT) || 5000;
        // Connect DB
        yield (0, db_1.connectDB)();
        // Middleware
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        // Routes
        app.use("/api/projects", projectRoutes_1.default);
        app.use("/api/contact", contactRoutes_1.default);
        app.use("/api/admin", adminAuthRoutes_1.default);
        app.use("/api/content", contentRoutes_1.default);
        app.use("/api/skills", skillRoutes_1.default);
        app.use("/api/upload", uploadRoutes_1.default);
        // Static uploads
        app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
        // Root route
        app.get("/", (req, res) => {
            res.send("API is running ✅");
        });
        // Error Handler
        app.use(errorHandler_1.errorHandler);
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });
    });
}
startServer();
