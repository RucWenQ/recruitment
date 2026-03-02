import { createContext, useContext, useMemo, useState } from "react";

const ExperimentContext = createContext(null);

const createInitialState = () => ({
  demographics: {
    gender: "",
    age: "",
    education: "",
  },
  aiConfig: {
    name: "",
    avatar: "",
    prompt: "",
    creativity: 50,
    strictness: 50,
  },
  group: Math.random() < 0.5 ? "experimental" : "control",
  dv: {},
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

  const resetExperiment = () => {
    setState(createInitialState());
  };

  const value = useMemo(
    () => ({
      state,
      updateDemographics,
      updateAIConfig,
      setGroup,
      setDVEvaluation,
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

export const useExperiment = () => {
  const context = useContext(ExperimentContext);
  if (!context) {
    throw new Error("useExperiment must be used within ExperimentProvider");
  }
  return context;
};
