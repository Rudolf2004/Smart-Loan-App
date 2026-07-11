import type { Request, Response, NextFunction } from "express";
import { loanApplicationSchema } from "../schemas/loanApplication.js";
import { predictLoanApplication } from "../services/prediction.service.js";

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
    return res.json(result);
  } catch (error) {
    next(error);
  }
}
