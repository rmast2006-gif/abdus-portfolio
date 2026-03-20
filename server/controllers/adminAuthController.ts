import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser";

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const FALLBACK_ADMIN_EMAIL = "abdu.ssamietahir2006@gmail.com";
  const FALLBACK_ADMIN_PASSWORD = "qwerty999";

  try {
    // Normalize email input
    const normalizedEmail = email.trim().toLowerCase();

    let user: any = await AdminUser.findOne({ email: normalizedEmail });
    
    if (!user) {
      // Check for fallback admin
      if (normalizedEmail === FALLBACK_ADMIN_EMAIL && password === FALLBACK_ADMIN_PASSWORD) {
        const token = jwt.sign(
          { id: "fallback-admin", email: FALLBACK_ADMIN_EMAIL },
          process.env.JWT_SECRET || "fallback_secret",
          { expiresIn: "7d" }
        );
        return res.json({ token, email: FALLBACK_ADMIN_EMAIL });
      }
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Also check fallback if database user exists but password doesn't match (unlikely but safe)
      if (normalizedEmail === FALLBACK_ADMIN_EMAIL && password === FALLBACK_ADMIN_PASSWORD) {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET || "fallback_secret",
          { expiresIn: "7d" }
        );
        return res.json({ token, email: user.email });
      }
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    res.json({ token, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
