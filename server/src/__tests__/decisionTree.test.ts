import { describe, expect, it } from "vitest";
import { predictFromTree } from "../ml/decisionTree.js";

describe("tree traversal", () => {
  it("returns a decision from a simple synthetic tree", () => {
    const bundle = {
      modelType: "sklearn_decision_tree_classifier",
      formatVersion: 1,
      classes: ["APPROVED", "REJECTED"],
      preprocessing: {
        numericalColumns: [],
        numericalImputerStatistics: [],
        categoricalColumns: [],
        categoricalImputerStatistics: [],
        oneHotCategories: [],
        transformedFeatureNames: [],
      },
      tree: {
        childrenLeft: [-1, -1],
        childrenRight: [-1, -1],
        features: [-2, -2],
        thresholds: [0, 0],
        values: [[[5]], [[1]]],
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

    const result = predictFromTree([0], bundle as any);

    expect(result.decision).toBe("APPROVED");
    expect(result.confidence).toBeGreaterThan(0);
  });
});
