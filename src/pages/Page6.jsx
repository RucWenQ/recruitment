import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CANDIDATES,
  DV_CONFIG,
  DV_STRINGS,
  JOB_DESCRIPTIONS,
  PAGE_COPY,
} from "../constants.js";
import CandidateCard from "../components/CandidateCard.jsx";
import RangeWithTicks from "../components/RangeWithTicks.jsx";
import { useExperiment } from "../context/useExperiment.js";

function orderCandidatePair(candidates, randomValue) {
  if (candidates.length < 2) return candidates;
  return randomValue < DV_CONFIG.ORDER_SWAP_THRESHOLD
    ? [candidates[0], candidates[1]]
    : [candidates[1], candidates[0]];
}

function getGuideTemplateByGroup(group) {
  return (
    DV_STRINGS.GUIDE_TEMPLATE_BY_GROUP[group] ||
    DV_STRINGS.GUIDE_TEMPLATE_BY_GROUP.control
  );
}

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
  const { aiConfig, group, dv, demographics, candidateMaterialViews } = state;
  const pageCopy = PAGE_COPY.PAGE6;

  const [submitState, setSubmitState] = useState({
    loading: false,
    error: "",
  });

  const selectedCandidates = useMemo(
    () =>
      DV_CONFIG.TARGET_CANDIDATE_IDS.map((candidateId) =>
        CANDIDATES.find((item) => item.id === candidateId),
      ).filter(Boolean),
    [],
  );

  // 独立随机源：一个控制引导语顺序，一个控制评分模块顺序。
  const [guideOrderRandom] = useState(() => Math.random());
  const [ratingOrderRandom] = useState(() => Math.random());

  const guideCandidates = useMemo(
    () => orderCandidatePair(selectedCandidates, guideOrderRandom),
    [selectedCandidates, guideOrderRandom],
  );
  const ratingCandidates = useMemo(
    () => orderCandidatePair(selectedCandidates, ratingOrderRandom),
    [selectedCandidates, ratingOrderRandom],
  );

  const [job1, job2] = JOB_DESCRIPTIONS;

  const guideText = useMemo(() => {
    const c1Name = guideCandidates[0]?.name || pageCopy.GUIDE_FALLBACK_C1;
    const c4Name = guideCandidates[1]?.name || pageCopy.GUIDE_FALLBACK_C4;
    const template = getGuideTemplateByGroup(group);
    return replaceGuide(template, aiConfig.name, c1Name, c4Name);
  }, [aiConfig.name, guideCandidates, group, pageCopy.GUIDE_FALLBACK_C1, pageCopy.GUIDE_FALLBACK_C4]);
  const guideSentences = useMemo(() => splitGuideText(guideText), [guideText]);

  const getValue = (candidateId, jobId) => {
    const stored = dv?.[candidateId]?.[jobId];
    if (stored === 0 || stored) return stored;
    return 50;
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="section-title">{pageCopy.TITLE}</h2>
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
        {ratingCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="grid gap-4 lg:grid-cols-[1.1fr_1.4fr]"
          >
            <CandidateCard
              candidate={candidate}
              footer={
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-700">
                    {pageCopy.RESUME_BLOCK_TITLE}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                    {candidate.resumeFull || pageCopy.RESUME_FALLBACK}
                  </p>
                </div>
              }
            />
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
                    candidateMaterialViews,
                    submittedAt: new Date().toISOString(),
                  }),
                });
                const result = await response.json().catch(() => null);
                if (!response.ok) {
                  throw new Error(result?.error || pageCopy.SUBMIT_ERROR_DEFAULT);
                }
                navigate("/page7", { replace: true });
              } catch (error) {
                setSubmitState({
                  loading: false,
                  error: error?.message || pageCopy.SUBMIT_ERROR_DEFAULT,
                });
              }
            }}
          >
            {submitState.loading
              ? pageCopy.SUBMIT_LOADING_TEXT
              : pageCopy.SUBMIT_IDLE_TEXT}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page6;
