import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug (optional)
console.log("ENV TEST:", process.env.MONGO_URI);

// Routes & DB
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";
import contactRoutes from "./routes/contactRoutes";
import adminAuthRoutes from "./routes/adminAuthRoutes";
import contentRoutes from "./routes/contentRoutes";
import skillRoutes from "./routes/skillRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import { errorHandler } from "./middleware/errorHandler";

async function startServer() {
  const app = express();

  const PORT = Number(process.env.PORT) || 5000;

  // Connect DB
  await connectDB();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/api/projects", projectRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/admin", adminAuthRoutes);
  app.use("/api/content", contentRoutes);
  app.use("/api/skills", skillRoutes);
  app.use("/api/upload", uploadRoutes);

  // Static uploads
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // Root route
  app.get("/", (req, res) => {
    res.send("API is running ✅");
  });

  // Error Handler
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

startServer();