import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CANDIDATES, DV_STRINGS, JOB_DESCRIPTIONS } from "../constants.js";
import CandidateCard from "../components/CandidateCard.jsx";
import RangeWithTicks from "../components/RangeWithTicks.jsx";
import { useExperiment } from "../context/useExperiment.js";

function replaceGuide(template, aiName, c1Name, c4Name) {
  return template
    .replace("{aiName}", aiName)
    .replace("{c1}", c1Name)
    .replace("{c4}", c4Name);
}

function splitGuideText(text) {
  const segments = String(text || "")
    .match(/[^。！？!?]+[。！？!?]?/g)
    ?.map((item) => item.trim())
    .filter(Boolean);
  return segments?.length ? segments : [text];
}

function Page6() {
  const navigate = useNavigate();
  const { state, setDVEvaluation } = useExperiment();
  const { aiConfig, group, dv, demographics } = state;
  const [submitState, setSubmitState] = useState({
    loading: false,
    error: "",
  });

  const selectedCandidates = useMemo(() => {
    const candidate1 = CANDIDATES.find((item) => item.id === 1);
    const candidate4 = CANDIDATES.find((item) => item.id === 4);
    return [candidate1, candidate4].filter(Boolean);
  }, []);

  const [job1, job2] = JOB_DESCRIPTIONS;

  const guideText = useMemo(() => {
    const c1Name = selectedCandidates[0]?.name || "候选人1";
    const c4Name = selectedCandidates[1]?.name || "候选人4";
    const template =
      group === "experimental"
        ? DV_STRINGS.EXPERIMENTAL_GROUP
        : DV_STRINGS.CONTROL_GROUP;
    return replaceGuide(template, aiConfig.name, c1Name, c4Name);
  }, [aiConfig.name, group, selectedCandidates]);
  const guideSentences = useMemo(() => splitGuideText(guideText), [guideText]);

  const getValue = (candidateId, jobId) => {
    const stored = dv?.[candidateId]?.[jobId];
    if (stored === 0 || stored) return stored;
    return 50;
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="section-title">候选人评价</h2>
        <div className="space-y-1">
          {guideSentences.map((sentence, index) => (
            <p
              key={`${sentence}-${index}`}
              className="text-xl font-bold leading-9 text-slate-900 md:text-2xl"
            >
              {sentence}
            </p>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {selectedCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="grid gap-4 lg:grid-cols-[1.1fr_1.4fr]"
          >
            <CandidateCard candidate={candidate} />
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="space-y-5">
                {[job1, job2].filter(Boolean).map((job) => (
                  <div
                    key={job?.id}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">
                        {job?.title}
                      </p>
                    </div>
                    <div className="mt-3">
                      <RangeWithTicks
                        id={`dv-${candidate.id}-${job?.id}`}
                        label={DV_STRINGS.QUESTION}
                        value={getValue(candidate.id, job.id)}
                        onChange={(event) =>
                          setDVEvaluation(
                            candidate.id,
                            job.id,
                            Number(event.target.value),
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        {submitState.error && (
          <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {submitState.error}
          </div>
        )}
        <div className="mt-4 flex items-center justify-end">
          <button
            type="button"
            className="btn-primary"
            disabled={submitState.loading}
            onClick={async () => {
              if (submitState.loading) return;
              setSubmitState({ loading: true, error: "" });
              try {
                const response = await fetch("/api/submit", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    demographics,
                    aiConfig,
                    group,
                    dv,
                    submittedAt: new Date().toISOString(),
                  }),
                });
                const result = await response.json().catch(() => null);
                if (!response.ok) {
                  throw new Error(result?.error || "上传失败，请稍后重试。");
                }
                navigate("/page7", { replace: true });
              } catch (error) {
                setSubmitState({
                  loading: false,
                  error: error?.message || "上传失败，请稍后重试。",
                });
              }
            }}
          >
            {submitState.loading ? "正在上传..." : "完成实验并上传数据"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page6;
