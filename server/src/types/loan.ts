export interface LoanApplicationPayload {
  age: number;
  income: number;
  credit_score: number;
  employment_status: "employed" | "self_employed" | "unemployed";
  years_employed: number;
  loan_amount: number;
  loan_purpose: "business" | "education" | "personal" | "home" | "car";
  existing_debt: number;
  collateral: "yes" | "no";
  collateral_value: number;
  has_guarantor: "yes" | "no";
  guarantor_count: number;
  guarantor1_income: number;
  guarantor1_employment: "employed" | "self_employed" | "unemployed" | "not_applicable";
  guarantor1_valid_id: "yes" | "no";
  guarantor2_income: number;
  guarantor2_employment: "employed" | "self_employed" | "unemployed" | "not_applicable";
  guarantor2_valid_id: "yes" | "no";
}

export interface PredictionResponse {
  decision: string;
  confidence: number;
  message: string;
  probabilities: Record<string, number>;
}
