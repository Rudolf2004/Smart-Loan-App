import { Router } from "express";
import { predictLoanController } from "../controllers/prediction.controller.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    message: "Loan Approval Machine Learning API is running successfully.",
    model: "Exported scikit-learn Decision Tree Classifier",
    runtime: "Node.js TypeScript",
  });
});

router.get("/health", (_req, res) => {
  res.json({
    status: "healthy",
    modelLoaded: true,
    modelType: "sklearn_decision_tree_classifier",
  });
});

router.post("/api/predict", predictLoanController);

export default router;
