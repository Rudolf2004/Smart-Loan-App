import { describe, expect, it } from "vitest";
import { engineerFeatures } from "../ml/featureEngineering.js";

describe("feature engineering", () => {
  it("computes derived ratios and guarantor validity", () => {
    const features = engineerFeatures({
      age: 35,
      income: 100000,
      credit_score: 750,
      employment_status: "employed",
      years_employed: 5,
      loan_amount: 50000,
      loan_purpose: "business",
      existing_debt: 10000,
      collateral: "yes",
      collateral_value: 60000,
      has_guarantor: "yes",
      guarantor_count: 1,
      guarantor1_income: 25000,
      guarantor1_employment: "employed",
      guarantor1_valid_id: "yes",
      guarantor2_income: 0,
      guarantor2_employment: "not_applicable",
      guarantor2_valid_id: "no",
    });

    expect(features.debt_to_income_ratio).toBe(0.1);
    expect(features.loan_to_income_ratio).toBe(0.5);
    expect(features.collateral_coverage_ratio).toBe(1.2);
    expect(features.valid_guarantor1).toBe("yes");
  });
});
