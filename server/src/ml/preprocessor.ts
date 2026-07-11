import { engineerFeatures } from "./featureEngineering.js";
import type { ModelBundle } from "./modelTypes.js";
import type { LoanApplicationPayload } from "../types/loan.js";

export function preprocessApplication(
  payload: LoanApplicationPayload,
  modelBundle: ModelBundle,
): number[] {
  const features = engineerFeatures(payload);
  const numericalColumns = modelBundle.preprocessing.numericalColumns;
  const categoricalColumns = modelBundle.preprocessing.categoricalColumns;
  const numericalImputerStatistics = modelBundle.preprocessing.numericalImputerStatistics;
  const categoricalImputerStatistics = modelBundle.preprocessing.categoricalImputerStatistics;
  const oneHotCategories = modelBundle.preprocessing.oneHotCategories;

  const numericalVector: number[] = [];
  numericalColumns.forEach((column, index) => {
    const rawValue = features[column];
    const value = typeof rawValue === "number" ? rawValue : Number(rawValue);
    const isValid = Number.isFinite(value);
    const imputedValue = isValid ? value : numericalImputerStatistics[index] ?? 0;
    numericalVector.push(imputedValue);
  });

  const categoricalVector: number[] = [];
  categoricalColumns.forEach((column, index) => {
    const rawValue = features[column];
    const value = rawValue == null ? "" : String(rawValue);
    const fallbackValue = categoricalImputerStatistics[index] ?? "";
    const resolvedValue = value && value !== "undefined" && value !== "null" ? value : fallbackValue;
    const categories = oneHotCategories[index] ?? [];

    categories.forEach((category) => {
      categoricalVector.push(resolvedValue === category ? 1 : 0);
    });
  });

  const featureVector = [...numericalVector, ...categoricalVector];
  const expectedLength = modelBundle.preprocessing.transformedFeatureNames.length;

  if (featureVector.length !== expectedLength) {
    throw new Error(
      `Model compatibility error: expected ${expectedLength} transformed features but produced ${featureVector.length}.`,
    );
  }

  return featureVector;
}
