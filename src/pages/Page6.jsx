import { useMemo, useState } from "react";
import { CANDIDATES, DV_STRINGS, JOB_DESCRIPTIONS } from "../constants.js";
import CandidateCard from "../components/CandidateCard.jsx";
import { useExperiment } from "../context/ExperimentContext.jsx";

function replaceGuide(template, aiName, c1Name, c4Name) {
  return template
    .replace("{aiName}", aiName)
    .replace("{c1}", c1Name)
    .replace("{c4}", c4Name);
}

function Page6() {
  const { state, setDVEvaluation } = useExperiment();
  const { aiConfig, group, dv, demographics } = state;
  const [submitState, setSubmitState] = useState({
    loading: false,
    error: "",
    success: false,
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

  const getValue = (candidateId, jobId) => {
    const stored = dv?.[candidateId]?.[jobId];
    if (stored === 0 || stored) return stored;
    return 50;
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="section-title">候选人评价（DV）</h2>
        <p className="text-sm text-slate-600">{guideText}</p>
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
                {[job1, job2].map((job) => (
                  <div
                    key={job?.id}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                        {job?.title}
                      </p>
                      <p className="text-sm text-slate-600">{job?.requirement}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium text-slate-700">
                        {DV_STRINGS.QUESTION}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={getValue(candidate.id, job.id)}
                          onChange={(event) =>
                            setDVEvaluation(
                              candidate.id,
                              job.id,
                              Number(event.target.value)
                            )
                          }
                          onInput={(event) =>
                            setDVEvaluation(
                              candidate.id,
                              job.id,
                              Number(event.target.value)
                            )
                          }
                          className="flex-1 cursor-pointer accent-slate-900"
                        />
                        <span className="w-12 text-right text-sm font-semibold text-slate-700">
                          {getValue(candidate.id, job.id)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-semibold text-slate-700">完成实验</h3>
        <p className="mt-2 text-xs text-slate-500">
          点击按钮将实验数据上传至服务器保存。
        </p>
        {submitState.error && (
          <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
            {submitState.error}
          </div>
        )}
        {submitState.success && (
          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            数据已成功上传，感谢参与！
          </div>
        )}
        <div className="mt-4 flex items-center justify-end">
          <button
            type="button"
            className="btn-primary"
            disabled={submitState.loading || submitState.success}
            onClick={async () => {
              if (submitState.loading || submitState.success) return;
              setSubmitState({ loading: true, error: "", success: false });
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
                if (!response.ok) {
                  throw new Error("上传失败，请稍后重试。");
                }
                setSubmitState({ loading: false, error: "", success: true });
              } catch (error) {
                setSubmitState({
                  loading: false,
                  error: error?.message || "上传失败，请稍后重试。",
                  success: false,
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