import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.middleware.js";
import { askLoanAssistant, AssistantConfigurationError } from "../services/assistant.service.js";

const router = Router();
const recentRequests = new Map<string, number[]>();

const requestSchema = z.object({
  language: z.enum(["English", "Twi", "French", "Hausa", "Ga", "Ewe", "Spanish", "Portuguese", "Arabic"]).default("English"),
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().trim().min(1).max(2_000),
  })).min(1).max(12),
});

router.post("/api/assistant", requireAuth, async (req, res, next) => {
  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Please send a shorter, valid assistant message." });
    return;
  }

  const userId = req.user!.id;
  const now = Date.now();
  const active = (recentRequests.get(userId) || []).filter((time) => now - time < 60_000);
  if (active.length >= 20) {
    res.status(429).json({ error: "Please wait a moment before asking another question." });
    return;
  }
  recentRequests.set(userId, [...active, now]);

  try {
    const answer = await askLoanAssistant(parsed.data.messages, parsed.data.language);
    res.json({ answer });
  } catch (error) {
    if (error instanceof AssistantConfigurationError) {
      res.status(503).json({ error: error.message });
      return;
    }
    next(error);
  }
});

export default router;
