import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();
export const uploadRoot = path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads"));
const maxUploadBytes = 8 * 1024 * 1024;
const allowedMimeTypes = new Set(["application/pdf", "image/jpeg", "image/png"]);

const uploadSchema = z.object({
  purpose: z.string().trim().min(2).max(80),
  fileName: z.string().trim().min(1).max(180),
  mimeType: z.string().trim().min(3),
  data: z.string().min(20),
});

function safeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
}

router.post("/api/uploads", requireAuth, async (req, res) => {
  const parsed = uploadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Upload payload is incomplete." });
    return;
  }

  const { purpose, fileName, mimeType, data } = parsed.data;
  if (!allowedMimeTypes.has(mimeType)) {
    res.status(400).json({ error: "Only PDF, JPG, and PNG files are accepted." });
    return;
  }

  const buffer = Buffer.from(data, "base64");
  if (!buffer.length || buffer.length > maxUploadBytes) {
    res.status(400).json({ error: "File must be smaller than 8MB." });
    return;
  }

  const userId = req.user?.id || "anonymous";
  const userUploadDir = path.join(uploadRoot, userId);
  await mkdir(userUploadDir, { recursive: true });

  const storedName = `${Date.now()}-${randomBytes(6).toString("hex")}-${safeFileName(fileName)}`;
  const storedPath = path.join(userUploadDir, storedName);
  await writeFile(storedPath, buffer);

  res.status(201).json({
    document: {
      id: storedName,
      purpose,
      fileName,
      mimeType,
      size: buffer.length,
      url: `/uploads/${userId}/${storedName}`,
      uploadedAt: new Date().toISOString(),
    },
  });
});

export default router;
