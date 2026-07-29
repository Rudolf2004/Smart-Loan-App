import { Router } from "express";
import { z } from "zod";
import { translateInterfaceTexts } from "../services/translation.service.js";

const router = Router();
const requests = new Map<string, number[]>();
const schema = z.object({
  language: z.enum(["Twi", "French", "Hausa", "Ga", "Ewe", "Spanish", "Portuguese", "Arabic"]),
  texts: z.array(z.string().trim().min(1).max(180)).min(1).max(60),
});

router.post("/api/translations/interface", async (req, res, next) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid interface translation request." }); return; }
  const key = req.ip || "unknown";
  const now = Date.now();
  const recent = (requests.get(key) || []).filter((time) => now - time < 60_000);
  if (recent.length >= 12) { res.status(429).json({ error: "Translation rate limit reached." }); return; }
  requests.set(key, [...recent, now]);
  try {
    const translations = await translateInterfaceTexts([...new Set(parsed.data.texts)], parsed.data.language);
    res.json({ source: [...new Set(parsed.data.texts)], translations });
  } catch (error) { next(error); }
});

export default router;
