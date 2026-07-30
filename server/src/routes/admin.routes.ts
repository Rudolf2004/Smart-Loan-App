import { Router } from "express";
import { z } from "zod";
import { requireAdmin, requireAuth } from "../middleware/auth.middleware.js";
import { listApplications, reviewApplication } from "../services/application.service.js";
import { listUsers, updateUserAccess } from "../services/auth.service.js";

const router = Router();
router.use("/api/admin", requireAuth, requireAdmin);

router.get("/api/admin/dashboard", async (_req, res, next) => {
  try {
    const [applications, users] = await Promise.all([listApplications(), listUsers()]);
    const totals = applications.reduce<Record<string, number>>((summary, item) => {
      summary[item.status] = (summary[item.status] || 0) + 1;
      return summary;
    }, {});
    const requestedAmount = applications.reduce((sum, item) => sum + Number(item.payload.loan_amount || 0), 0);
    res.json({
      stats: { users: users.length, applications: applications.length, requestedAmount, ...totals },
      recentApplications: applications.slice(0, 6),
    });
  } catch (error) { next(error); }
});

router.get("/api/admin/applications", async (_req, res, next) => {
  try {
    const [applications, users] = await Promise.all([listApplications(), listUsers()]);
    const usersById = new Map(users.map((user) => [user.id, user]));
    res.json({ applications: applications.map((item) => ({ ...item, applicant: usersById.get(item.userId) })) });
  } catch (error) { next(error); }
});

const reviewSchema = z.object({
  status: z.enum(["under_review", "approved", "rejected", "needs_information"]),
  reviewNote: z.string().trim().max(1000).default(""),
});

router.patch("/api/admin/applications/:id", async (req, res, next) => {
  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Select a valid review decision and note." }); return; }
  try {
    const application = await reviewApplication(req.params.id, req.user!.id, parsed.data.status, parsed.data.reviewNote);
    if (!application) { res.status(404).json({ error: "Application not found." }); return; }
    res.json({ application });
  } catch (error) { next(error); }
});

router.get("/api/admin/users", async (_req, res, next) => {
  try { res.json({ users: await listUsers() }); } catch (error) { next(error); }
});

const accessSchema = z.object({
  role: z.enum(["customer", "admin"]).optional(),
  status: z.enum(["active", "suspended"]).optional(),
}).refine((value) => value.role || value.status);

router.patch("/api/admin/users/:id", async (req, res, next) => {
  const parsed = accessSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Select a valid role or account status." }); return; }
  if (req.params.id === req.user!.id && parsed.data.status === "suspended") {
    res.status(400).json({ error: "You cannot suspend your own administrator account." }); return;
  }
  try {
    const user = await updateUserAccess(req.params.id, parsed.data);
    if (!user) { res.status(404).json({ error: "User not found." }); return; }
    res.json({ user });
  } catch (error) { next(error); }
});

export default router;
