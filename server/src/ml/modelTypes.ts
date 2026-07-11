export interface ModelBundle {
  modelType: string;
  formatVersion: number;
  classes: string[];
  preprocessing: {
    numericalColumns: string[];
    numericalImputerStatistics: number[];
    categoricalColumns: string[];
    categoricalImputerStatistics: string[];
    oneHotCategories: string[][];
    transformedFeatureNames: string[];
  };
  tree: {
    childrenLeft: number[];
    childrenRight: number[];
    features: number[];
    thresholds: number[];
    values: number[][][];
  };
  metadata: {
    algorithm: string;
    trainingLibrary: string;
    datasetRecords: number;
    trainingRecords: number;
    testingRecords: number;
    accuracy: number;
  };
}
