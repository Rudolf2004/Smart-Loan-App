import { preprocessApplication } from "../ml/preprocessor.js";
import { predictFromTree } from "../ml/decisionTree.js";
import { loadModelBundle } from "../ml/modelLoader.js";
import type { LoanApplicationInput } from "../schemas/loanApplication.js";
import type { PredictionResponse } from "../types/loan.js";

const messageByDecision: Record<string, string> = {
  APPROVED: "The machine learning model predicts that the loan application may be approved.",
  CONDITIONALLY_APPROVED: "The machine learning model predicts that the application may require additional verification or support.",
  REJECTED: "The machine learning model predicts that the loan application may not meet the current approval pattern.",
};

export async function predictLoanApplication(payload: LoanApplicationInput): Promise<PredictionResponse> {
  const modelBundle = loadModelBundle();
  const featureVector = preprocessApplication(payload, modelBundle);
  const prediction = predictFromTree(featureVector, modelBundle);
  const decision = prediction.decision;

  return {
    decision,
    confidence: Number(prediction.confidence.toFixed(2)),
    message: messageByDecision[decision] ?? messageByDecision.REJECTED,
    probabilities: Object.fromEntries(
      Object.entries(prediction.probabilities).map(([key, value]) => [key, Number(value.toFixed(2))]),
    ),
  };
}
