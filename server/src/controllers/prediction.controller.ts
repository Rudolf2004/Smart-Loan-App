import type { Request, Response, NextFunction } from "express";
import { loanApplicationSchema } from "../schemas/loanApplication.js";
import { predictLoanApplication } from "../services/prediction.service.js";
import { createApplication } from "../services/application.service.js";

export async function predictLoanController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = loanApplicationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Request validation failed.",
        details: parsed.error.flatten(),
      });
    }

    const result = await predictLoanApplication(parsed.data);
    const application = await createApplication(req.user!.id, parsed.data, result);
    return res.json({ ...result, applicationId: application.id, status: application.status });
  } catch (error) {
    next(error);
  }
}
