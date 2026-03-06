import { useMemo, useState } from "react";
import { CANDIDATES } from "../constants.js";
import { ExperimentContext } from "./experimentContext.js";

const createInitialCandidateMaterialViews = () =>
  CANDIDATES.reduce((acc, candidate) => {
    acc[candidate.id] = false;
    return acc;
  }, {});

const createInitialState = () => ({
  demographics: {
    gender: "",
    age: "",
    education: "",
    phone: "",
  },
  aiConfig: {
    name: "",
    avatar: "",
    prompt: "",
    parameter1: 50,
    parameter2: 50,
  },
  group: "",
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
        group: Math.random() < 0.5 ? "experimental" : "control",
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
