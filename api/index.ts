import express from "express";
import cors from "cors";
import serverless from "serverless-http";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working ✅" });
});

// ❌ DO NOT use app.listen()

// ✅ Export for Vercel
export default serverless(app);