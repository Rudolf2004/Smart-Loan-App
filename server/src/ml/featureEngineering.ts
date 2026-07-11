import type { LoanApplicationPayload } from "../types/loan.js";

export interface EngineeredFeatures {
  [key: string]: number | string;
}

export function engineerFeatures(payload: LoanApplicationPayload): EngineeredFeatures {
  const income = Number(payload.income) || 0;
  const loanAmount = Number(payload.loan_amount) || 0;
  const collateralValue = Number(payload.collateral_value) || 0;
  const existingDebt = Number(payload.existing_debt) || 0;

  const debtToIncomeRatio = income > 0 ? existingDebt / income : 0;
  const loanToIncomeRatio = income > 0 ? loanAmount / income : 0;
  const collateralCoverageRatio = loanAmount > 0 ? collateralValue / loanAmount : 0;

  const validGuarantor1 =
    payload.has_guarantor === "yes" &&
    payload.guarantor1_income >= 20000 &&
    payload.guarantor1_employment !== "unemployed" &&
    payload.guarantor1_valid_id === "yes"
      ? "yes"
      : "no";

  const valid_guarantor1 = validGuarantor1;

  return {
    age: payload.age,
    income: payload.income,
    credit_score: payload.credit_score,
    employment_status: payload.employment_status,
    years_employed: payload.years_employed,
    loan_amount: payload.loan_amount,
    loan_purpose: payload.loan_purpose,
    existing_debt: payload.existing_debt,
    collateral: payload.collateral,
    collateral_value: payload.collateral_value,
    has_guarantor: payload.has_guarantor,
    guarantor_count: payload.guarantor_count,
    guarantor1_income: payload.guarantor1_income,
    guarantor1_employment: payload.guarantor1_employment,
    guarantor1_valid_id: payload.guarantor1_valid_id,
    guarantor2_income: payload.guarantor2_income,
    guarantor2_employment: payload.guarantor2_employment,
    guarantor2_valid_id: payload.guarantor2_valid_id,
    debt_to_income_ratio: debtToIncomeRatio,
    loan_to_income_ratio: loanToIncomeRatio,
    collateral_coverage_ratio: collateralCoverageRatio,
    valid_guarantor1,
  };
}
