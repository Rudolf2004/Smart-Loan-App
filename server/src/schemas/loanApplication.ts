import { z } from "zod";

export const loanApplicationSchema = z.object({
  age: z.coerce.number().int().min(18).max(100),
  income: z.coerce.number().positive(),
  credit_score: z.coerce.number().int().min(300).max(850),
  employment_status: z.enum(["employed", "self_employed", "unemployed"]),
  years_employed: z.coerce.number().min(0),
  loan_amount: z.coerce.number().positive(),
  loan_purpose: z.enum(["business", "education", "personal", "home", "car"]),
  existing_debt: z.coerce.number().min(0),
  collateral: z.enum(["yes", "no"]),
  collateral_value: z.coerce.number().min(0),
  has_guarantor: z.enum(["yes", "no"]),
  guarantor_count: z.coerce.number().int().min(0).max(2),
  guarantor1_income: z.coerce.number().min(0),
  guarantor1_employment: z.enum(["employed", "self_employed", "unemployed", "not_applicable"]),
  guarantor1_valid_id: z.enum(["yes", "no"]),
  guarantor2_income: z.coerce.number().min(0),
  guarantor2_employment: z.enum(["employed", "self_employed", "unemployed", "not_applicable"]),
  guarantor2_valid_id: z.enum(["yes", "no"]),
});

export type LoanApplicationInput = z.infer<typeof loanApplicationSchema>;
