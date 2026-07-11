import { describe, expect, it } from "vitest";
import type { LoanApplicationPayload } from "../types/loan.js";
import { engineerFeatures } from "./featureEngineering.js";

describe("engineerFeatures", () => {
  it("marks a valid guarantor as valid", () => {
    const payload: LoanApplicationPayload = {
      age: 34,
      income: 60000,
      credit_score: 750,
      employment_status: "employed",
      years_employed: 4,
      loan_amount: 12000,
      loan_purpose: "business",
      existing_debt: 2000,
      collateral: "yes",
      collateral_value: 15000,
      has_guarantor: "yes",
      guarantor_count: 1,
      guarantor1_income: 25000,
      guarantor1_employment: "employed",
      guarantor1_valid_id: "yes",
      guarantor2_income: 0,
      guarantor2_employment: "not_applicable",
      guarantor2_valid_id: "no",
    };

    const features = engineerFeatures(payload);

    expect(features.valid_guarantor1).toBe("yes");
  });
});
