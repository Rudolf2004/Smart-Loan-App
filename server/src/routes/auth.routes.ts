import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  loginUser,
  registerUser,
  signToken,
  toPublicUser,
  upsertGoogleUser,
} from "../services/auth.service.js";

const router = Router();

const passwordRule = z
  .string()
  .min(8)
  .regex(/[A-Z]/)
  .regex(/[a-z]/)
  .regex(/[0-9]/)
  .regex(/[^A-Za-z0-9]/);

const registerSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7),
  nationalId: z.string().trim().min(5),
  password: passwordRule,
});

const loginSchema = z.object({
  identifier: z.string().trim().min(3),
  password: z.string().min(1),
});

const googleSchema = z.object({
  credential: z.string().min(10),
});

async function verifyGoogleCredential(credential: string) {
  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`,
  );
  const profile = (await response.json().catch(() => ({}))) as {
    sub?: string;
    email?: string;
    name?: string;
    aud?: string;
    email_verified?: string;
  };

  if (!response.ok || !profile.sub || !profile.email) {
    throw new Error("Google sign-in could not be verified.");
  }

  const expectedClientId = process.env.GOOGLE_CLIENT_ID;
  if (expectedClientId && profile.aud !== expectedClientId) {
    throw new Error("Google sign-in is not configured for this app.");
  }

  if (profile.email_verified && profile.email_verified !== "true") {
    throw new Error("Google account email is not verified.");
  }

  return {
    sub: profile.sub,
    email: profile.email,
    fullName: profile.name || profile.email.split("@")[0],
  };
}

router.post("/api/auth/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Please complete all registration fields with a strong password." });
    return;
  }

  try {
    const user = await registerUser(parsed.data);
    res.status(201).json({ user: toPublicUser(user), token: signToken(user) });
  } catch (error) {
    res.status(409).json({ error: error instanceof Error ? error.message : "Unable to create account." });
  }
});

router.post("/api/auth/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Enter your email/phone number and password." });
    return;
  }

  try {
    const user = await loginUser(parsed.data.identifier, parsed.data.password);
    res.json({ user: toPublicUser(user), token: signToken(user) });
  } catch (error) {
    res.status(401).json({ error: error instanceof Error ? error.message : "Unable to login." });
  }
});

router.post("/api/auth/google", async (req, res) => {
  const parsed = googleSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Google sign-in token is missing." });
    return;
  }

  try {
    const profile = await verifyGoogleCredential(parsed.data.credential);
    const user = await upsertGoogleUser(profile);
    res.json({ user: toPublicUser(user), token: signToken(user) });
  } catch (error) {
    res.status(401).json({
      error: error instanceof Error ? error.message : "Google sign-in could not be completed.",
    });
  }
});

router.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
