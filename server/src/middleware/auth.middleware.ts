import type { NextFunction, Request, Response } from "express";
import { findUserById, toPublicUser, verifyToken, type PublicUser } from "../services/auth.service.js";

declare global {
  namespace Express {
    interface Request {
      user?: PublicUser;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const payload = verifyToken(token);

  if (!payload) {
    res.status(401).json({ error: "Authentication required." });
    return;
  }

  const user = await findUserById(payload.sub);
  if (!user) {
    res.status(401).json({ error: "Authentication required." });
    return;
  }

  req.user = toPublicUser(user);
  next();
}
