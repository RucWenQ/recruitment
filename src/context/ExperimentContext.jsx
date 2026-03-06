import { useMemo, useState } from "react";
import {
  CANDIDATES,
  EXPERIMENT_ASSIGNMENT,
  EXPERIMENT_STATE_DEFAULTS,
} from "../constants.js";
import { ExperimentContext } from "./experimentContext.js";

const createInitialCandidateMaterialViews = () =>
  CANDIDATES.reduce((acc, candidate) => {
    acc[candidate.id] = false;
    return acc;
  }, {});

const createInitialState = () => ({
  demographics: { ...EXPERIMENT_STATE_DEFAULTS.demographics },
  aiConfig: { ...EXPERIMENT_STATE_DEFAULTS.aiConfig },
  group: EXPERIMENT_STATE_DEFAULTS.group,
  dv: {},
  candidateMaterialViews: createInitialCandidateMaterialViews(),
});

export function ExperimentProvider({ children }) {
  const [state, setState] = useState(createInitialState);

  const updateDemographics = (updates) => {
    setState((prev) => ({
      ...prev,
      demographics: { ...prev.demographics, ...updates },
    }));
  };

  const updateAIConfig = (updates) => {
    setState((prev) => ({
      ...prev,
      aiConfig: { ...prev.aiConfig, ...updates },
    }));
  };

  const setGroup = (group) => {
    setState((prev) => ({
      ...prev,
      group,
    }));
  };

  const assignRandomGroup = () => {
    setState((prev) => {
      if (prev.group) return prev;
      return {
        ...prev,
        group:
          Math.random() < EXPERIMENT_ASSIGNMENT.EXPERIMENTAL_PROBABILITY
            ? "experimental"
            : "control",
      };
    });
  };

  const setDVEvaluation = (candidateId, jobId, rating) => {
    setState((prev) => ({
      ...prev,
      dv: {
        ...prev.dv,
        [candidateId]: {
          ...(prev.dv?.[candidateId] || {}),
          [jobId]: rating,
        },
      },
    }));
  };

  const markCandidateMaterialViewed = (candidateId) => {
    if (!candidateId) return;

    setState((prev) => ({
      ...prev,
      candidateMaterialViews: {
        ...prev.candidateMaterialViews,
        [candidateId]: true,
      },
    }));
  };

  const resetExperiment = () => {
    setState(createInitialState());
  };

  const value = useMemo(
    () => ({
      state,
      updateDemographics,
      updateAIConfig,
      setGroup,
      assignRandomGroup,
      setDVEvaluation,
      markCandidateMaterialViewed,
      resetExperiment,
    }),
    [state],
  );

  return (
    <ExperimentContext.Provider value={value}>
      {children}
    </ExperimentContext.Provider>
  );
}
