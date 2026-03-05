import { useContext } from "react";
import { ExperimentContext } from "./experimentContext.js";

export function useExperiment() {
  const context = useContext(ExperimentContext);
  if (!context) {
    throw new Error("useExperiment must be used within ExperimentProvider");
  }
  return context;
}
