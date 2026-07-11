import { describe, expect, it } from "vitest";
import { preprocessApplication } from "../ml/preprocessor.js";

describe("one-hot preprocessing", () => {
  it("creates the expected encoded vector", () => {
    const bundle = {
      modelType: "sklearn_decision_tree_classifier",
      formatVersion: 1,
      classes: ["APPROVED", "REJECTED"],
      preprocessing: {
        numericalColumns: ["age", "income"],
        numericalImputerStatistics: [0, 0],
        categoricalColumns: ["employment_status"],
        categoricalImputerStatistics: ["unemployed"],
        oneHotCategories: [["employed", "self_employed", "unemployed"]],
        transformedFeatureNames: ["age", "income", "employment_status_employed", "employment_status_self_employed", "employment_status_unemployed"],
      },
      tree: {
        childrenLeft: [-1],
        childrenRight: [-1],
        features: [-2],
        thresholds: [0],
        values: [[[1]]],
      },
      metadata: {
        algorithm: "DecisionTreeClassifier",
        trainingLibrary: "scikit-learn",
        datasetRecords: 0,
        trainingRecords: 0,
        testingRecords: 0,
        accuracy: 0,
      },
    };

    const vector = preprocessApplication({
      age: 25,
      income: 50000,
      credit_score: 700,
      employment_status: "employed",
      years_employed: 2,
      loan_amount: 10000,
      loan_purpose: "personal",
      existing_debt: 200,
      collateral: "no",
      collateral_value: 0,
      has_guarantor: "no",
      guarantor_count: 0,
      guarantor1_income: 0,
      guarantor1_employment: "not_applicable",
      guarantor1_valid_id: "no",
      guarantor2_income: 0,
      guarantor2_employment: "not_applicable",
      guarantor2_valid_id: "no",
    } as any, bundle as any);

    expect(vector).toEqual([25, 50000, 1, 0, 0]);
  });
});
