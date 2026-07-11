const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const numericFields = [
  "age",
  "income",
  "credit_score",
  "years_employed",
  "loan_amount",
  "existing_debt",
  "collateral_value",
  "guarantor_count",
  "guarantor1_income",
  "guarantor2_income",
];

function normalizeApplication(application) {
  return Object.fromEntries(
    Object.entries(application).map(([key, value]) => [
      key,
      numericFields.includes(key) ? Number(value || 0) : value,
    ]),
  );
}

function localPresentationPrediction(application) {
  const payload = normalizeApplication(application);
  const income = Number(payload.income) || 0;
  const loanAmount = Number(payload.loan_amount) || 0;
  const existingDebt = Number(payload.existing_debt) || 0;
  const creditScore = Number(payload.credit_score) || 0;
  const yearsEmployed = Number(payload.years_employed) || 0;
  const collateralValue = Number(payload.collateral_value) || 0;
  const guarantorIncome = Number(payload.guarantor1_income) || 0;

  const debtRatio = income > 0 ? existingDebt / income : 1;
  const loanRatio = income > 0 ? loanAmount / income : 10;
  const collateralCoverage = loanAmount > 0 ? collateralValue / loanAmount : 0;
  const hasValidGuarantor =
    payload.has_guarantor === "yes" &&
    guarantorIncome >= 20000 &&
    payload.guarantor1_employment !== "unemployed" &&
    payload.guarantor1_valid_id === "yes";

  let score = 0;
  score += creditScore >= 720 ? 32 : creditScore >= 650 ? 24 : creditScore >= 580 ? 12 : 2;
  score += income >= 60000 ? 24 : income >= 35000 ? 16 : income >= 18000 ? 8 : 0;
  score += debtRatio <= 0.25 ? 18 : debtRatio <= 0.45 ? 10 : debtRatio <= 0.65 ? 4 : 0;
  score += loanRatio <= 0.4 ? 14 : loanRatio <= 0.8 ? 8 : loanRatio <= 1.25 ? 3 : 0;
  score += yearsEmployed >= 3 ? 6 : yearsEmployed >= 1 ? 3 : 0;
  score += collateralCoverage >= 0.8 ? 4 : collateralCoverage >= 0.4 ? 2 : 0;
  score += hasValidGuarantor ? 2 : 0;

  const confidence = Math.max(58, Math.min(96, Math.round(score)));
  const decision =
    score >= 72 ? "APPROVED" : score >= 52 ? "CONDITIONALLY_APPROVED" : "REJECTED";

  return {
    decision,
    confidence,
    message:
      decision === "REJECTED"
        ? "Offline presentation assessment completed. The application does not currently meet the approval profile."
        : "Offline presentation assessment completed. The application matches the approval profile.",
    probabilities: {
      APPROVED: decision === "APPROVED" ? confidence : Math.max(8, 100 - confidence - 12),
      CONDITIONALLY_APPROVED:
        decision === "CONDITIONALLY_APPROVED" ? confidence : decision === "APPROVED" ? 12 : 22,
      REJECTED: decision === "REJECTED" ? confidence : Math.max(4, 100 - confidence),
    },
    source: "local-presentation-fallback",
  };
}

export async function submitLoanApplication(application) {
  const payloadToSend = normalizeApplication(application);

  const response = await fetch(`${API_URL}/api/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payloadToSend),
  }).catch(() => null);

  if (!response) {
    return localPresentationPrediction(application);
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || "Unable to evaluate the loan application right now.");
  }

  return payload;
}
