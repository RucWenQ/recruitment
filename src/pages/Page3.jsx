import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AI_CONFIG_UI, PAGE_COPY } from "../constants.js";
import RangeWithTicks from "../components/RangeWithTicks.jsx";
import { useExperiment } from "../context/useExperiment.js";

function Page3() {
  const navigate = useNavigate();
  const { state, updateAIConfig } = useExperiment();
  const { aiConfig } = state;
  const [validationError, setValidationError] = useState("");
  const pageCopy = PAGE_COPY.PAGE3;

  const isConfigComplete =
    aiConfig.name.trim() && aiConfig.avatar.trim() && aiConfig.prompt.trim();

  const handleNext = () => {
    if (!isConfigComplete) {
      setValidationError(pageCopy.VALIDATION_ERROR);
      return;
    }
    setValidationError("");
    navigate("/page4");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="section-title">{pageCopy.TITLE}</h2>
        {pageCopy.INTRO_LINES.map((line) => (
          <p key={line} className="text-xl">
            {line}
          </p>
        ))}
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="subsection-title">{pageCopy.NAME_TITLE}</h3>
          <label className="mt-4 block space-y-2">
            <input
              className="input-base"
              value={aiConfig.name}
              onChange={(event) => {
                updateAIConfig({ name: event.target.value });
                if (validationError) setValidationError("");
              }}
              placeholder={pageCopy.NAME_PLACEHOLDER}
            />
          </label>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="subsection-title">{pageCopy.PARAMS_TITLE}</h3>
          <div className="mt-4 space-y-4">
            {AI_CONFIG_UI.PARAMETERS.map((parameter) => (
              <RangeWithTicks
                key={parameter.key}
                id={parameter.id}
                label={parameter.label}
                hint={parameter.hint}
                minLabel={parameter.minLabel}
                maxLabel={parameter.maxLabel}
                value={aiConfig[parameter.key]}
                onChange={(event) =>
                  updateAIConfig({ [parameter.key]: Number(event.target.value) })
                }
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="subsection-title">{pageCopy.AVATAR_TITLE}</h3>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-6 text-5xl">
              {aiConfig.avatar || ""}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {AI_CONFIG_UI.PRESET_AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  className={`flex h-16 w-full items-center justify-center rounded-2xl border text-2xl transition ${
                    aiConfig.avatar === avatar
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                  onClick={() => {
                    updateAIConfig({ avatar });
                    if (validationError) setValidationError("");
                  }}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="subsection-title">{pageCopy.PROMPT_TITLE}</h3>
          <label className="mt-4 block space-y-2">
            <span className="field-label text-slate-600">{pageCopy.PROMPT_LABEL}</span>
            <textarea
              rows="8"
              className="input-base min-h-[240px]"
              value={aiConfig.prompt}
              onChange={(event) => {
                updateAIConfig({ prompt: event.target.value });
                if (validationError) setValidationError("");
              }}
              placeholder={pageCopy.PROMPT_PLACEHOLDER}
            />
          </label>
        </div>
      </section>

      <div className="flex flex-col items-end gap-3">
        {validationError ? (
          <p className="text-base text-rose-600">{validationError}</p>
        ) : null}
        <button type="button" className="btn-primary" onClick={handleNext}>
          {pageCopy.NEXT_BUTTON}
        </button>
      </div>
    </div>
  );
}

export default Page3;
