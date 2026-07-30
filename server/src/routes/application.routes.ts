import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { listApplications } from "../services/application.service.js";

const router = Router();

router.get("/api/applications", requireAuth, async (req, res, next) => {
  try {
    res.json({ applications: await listApplications(req.user!.id) });
  } catch (error) {
    next(error);
  }
});

export default router;
