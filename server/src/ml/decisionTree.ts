import type { ModelBundle } from "./modelTypes.js";

export interface TreePrediction {
  decision: string;
  confidence: number;
  probabilities: Record<string, number>;
  leafNodeIndex: number;
}

export function predictFromTree(
  featureVector: number[],
  modelBundle: ModelBundle,
): TreePrediction {
  const { tree, classes } = modelBundle;
  let nodeIndex = 0;

  while (nodeIndex >= 0 && nodeIndex < tree.features.length) {
    const featureIndex = tree.features[nodeIndex];
    const threshold = tree.thresholds[nodeIndex];
    const leftChild = tree.childrenLeft[nodeIndex];
    const rightChild = tree.childrenRight[nodeIndex];

    if (leftChild < 0 && rightChild < 0) {
      break;
    }

    if (featureIndex < 0 || featureIndex >= featureVector.length) {
      throw new Error(`Model compatibility error: feature index ${featureIndex} is out of bounds.`);
    }

    const featureValue = featureVector[featureIndex];
    const nextNode = featureValue <= threshold ? leftChild : rightChild;

    if (nextNode < 0) {
      break;
    }

    nodeIndex = nextNode;
  }

  const leafValues = tree.values[nodeIndex] ?? [];
  const flattened = leafValues.flat();
  const total = flattened.reduce((sum, value) => sum + value, 0);

  if (total <= 0) {
    throw new Error("Model compatibility error: leaf node has no class mass.");
  }

  const probabilities = classes.reduce<Record<string, number>>((acc, label, index) => {
    const value = flattened[index] ?? 0;
    acc[label] = (value / total) * 100;
    return acc;
  }, {});

  const decision = classes.reduce((bestLabel, label) => {
    const currentValue = probabilities[label] ?? 0;
    const bestValue = probabilities[bestLabel] ?? 0;
    return currentValue > bestValue ? label : bestLabel;
  }, classes[0] ?? "REJECTED");

  const confidence = probabilities[decision] ?? 0;

  return {
    decision,
    confidence,
    probabilities,
    leafNodeIndex: nodeIndex,
  };
}
