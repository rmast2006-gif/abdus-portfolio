import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import cors from "cors";

// Routes & DB
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";
import contactRoutes from "./routes/contactRoutes";
import adminAuthRoutes from "./routes/adminAuthRoutes";
import contentRoutes from "./routes/contentRoutes";
import skillRoutes from "./routes/skillRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// ✅ connect DB
connectDB();

app.use(cors());
app.use(express.json());

// ✅ ROUTES
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/upload", uploadRoutes);

// ✅ STATIC
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API is running on Railway 🚀");
});

app.use(errorHandler);

// ✅ THIS IS REQUIRED FOR RAILWAY
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});