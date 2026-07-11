import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ModelBundle } from "./modelTypes.js";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const modelPath = path.resolve(currentDir, "../../model/loan_model_bundle.json");

let cachedModel: ModelBundle | null = null;

function validateModelBundle(bundle: unknown): asserts bundle is ModelBundle {
  if (!bundle || typeof bundle !== "object") {
    throw new Error("Model compatibility error: model bundle is invalid.");
  }

  const candidate = bundle as Partial<ModelBundle>;
  if (candidate.modelType !== "sklearn_decision_tree_classifier") {
    throw new Error("Model compatibility error: unsupported model type.");
  }
  if (candidate.formatVersion !== 1) {
    throw new Error("Model compatibility error: unsupported model format version.");
  }
  if (!Array.isArray(candidate.classes) || candidate.classes.length === 0) {
    throw new Error("Model compatibility error: classes are missing.");
  }
  if (!candidate.preprocessing || !candidate.tree) {
    throw new Error("Model compatibility error: preprocessing or tree section is missing.");
  }
  if (!Array.isArray(candidate.preprocessing.numericalColumns)) {
    throw new Error("Model compatibility error: numericalColumns must be an array.");
  }
  if (!Array.isArray(candidate.preprocessing.categoricalColumns)) {
    throw new Error("Model compatibility error: categoricalColumns must be an array.");
  }
  if (!Array.isArray(candidate.tree.childrenLeft) || !Array.isArray(candidate.tree.childrenRight)) {
    throw new Error("Model compatibility error: tree child arrays are invalid.");
  }
  if (!Array.isArray(candidate.tree.features) || !Array.isArray(candidate.tree.thresholds)) {
    throw new Error("Model compatibility error: tree feature arrays are invalid.");
  }
  if (!Array.isArray(candidate.tree.values)) {
    throw new Error("Model compatibility error: tree values array is invalid.");
  }
}

export function loadModelBundle(): ModelBundle {
  if (cachedModel) {
    return cachedModel;
  }

  if (!fs.existsSync(modelPath)) {
    throw new Error("loan_model_bundle.json is missing. The Decision Tree must be trained and exported from Google Colab before starting the server.");
  }

  const raw = fs.readFileSync(modelPath, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  validateModelBundle(parsed);

  cachedModel = parsed;
  return cachedModel;
}
