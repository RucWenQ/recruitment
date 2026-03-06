import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_DEFAULTS, CANDIDATES, EXPERIMENT_CONFIG, PAGE_COPY } from "../constants.js";
import CandidateCard from "../components/CandidateCard.jsx";
import { useExperiment } from "../context/useExperiment.js";

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderTemplate(template, variables) {
  return Object.entries(variables).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value ?? "")),
    template,
  );
}

function Page5() {
  const navigate = useNavigate();
  const { state } = useExperiment();
  const { aiConfig } = state;
  const pageCopy = PAGE_COPY.PAGE5;
  const aiName = aiConfig.name.trim() || APP_DEFAULTS.AI_NAME;

  const [statusMap, setStatusMap] = useState(() =>
    Object.fromEntries(CANDIDATES.map((candidate) => [candidate.id, "idle"])),
  );
  const [sentCount, setSentCount] = useState(0);
  const [warning, setWarning] = useState("");
  const warningTimerRef = useRef(null);
  const inProgressRef = useRef(false);

  const totalCount = CANDIDATES.length;
  const allDone = sentCount >= totalCount;

  const showWarning = () => {
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
    }
    setWarning(renderTemplate(pageCopy.WARNING_TEMPLATE, { aiName }));
    warningTimerRef.current = setTimeout(() => setWarning(""), 2000);
  };

  const startSend = (candidateId) => {
    if (statusMap[candidateId] !== "idle") return;

    if (inProgressRef.current) {
      showWarning();
      return;
    }

    inProgressRef.current = true;
    setWarning("");
    setStatusMap((prev) => ({ ...prev, [candidateId]: "sending" }));

    const sendingDelay = getRandomDelay(
      EXPERIMENT_CONFIG.STIMULUS_DELAY.SENDING_MIN,
      EXPERIMENT_CONFIG.STIMULUS_DELAY.SENDING_MAX,
    );
    const reviewingDelay = getRandomDelay(
      EXPERIMENT_CONFIG.STIMULUS_DELAY.REVIEWING_MIN,
      EXPERIMENT_CONFIG.STIMULUS_DELAY.REVIEWING_MAX,
    );

    setTimeout(() => {
      setStatusMap((prev) => ({ ...prev, [candidateId]: "reviewing" }));
    }, sendingDelay);

    setTimeout(() => {
      setStatusMap((prev) => ({ ...prev, [candidateId]: "done" }));
      setSentCount((prev) => prev + 1);
      inProgressRef.current = false;
    }, sendingDelay + reviewingDelay);
  };

  const getStatusText = (status) => {
    if (status === "sending") return pageCopy.STATUS_SENDING;
    if (status === "reviewing") {
      return renderTemplate(pageCopy.STATUS_REVIEWING_TEMPLATE, {
        aiName,
      });
    }
    if (status === "done") return pageCopy.STATUS_DONE;
    return pageCopy.STATUS_IDLE;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="section-title">{pageCopy.TITLE}</h2>
        <p className="text-xl">
          {renderTemplate(pageCopy.INTRO_TEMPLATE, { aiName })}
        </p>
      </div>

      {warning && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-base text-amber-700">
          {warning}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div>
          <p className="body-text font-medium">{pageCopy.PROGRESS_TITLE}</p>
          <p className="note-text">
            {renderTemplate(pageCopy.PROGRESS_TEMPLATE, {
              sentCount,
              totalCount,
            })}
          </p>
        </div>
        <span className="badge">
          {allDone ? pageCopy.BADGE_DONE : pageCopy.BADGE_IN_PROGRESS}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CANDIDATES.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            footer={
              <div className="space-y-2">
                <p className="note-text">
                  {getStatusText(statusMap[candidate.id])}
                </p>
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={() => startSend(candidate.id)}
                  disabled={statusMap[candidate.id] !== "idle"}
                >
                  {statusMap[candidate.id] === "idle"
                    ? renderTemplate(pageCopy.SEND_TO_AI_TEMPLATE, {
                        aiName,
                      })
                    : pageCopy.SENT_BUTTON}
                </button>
              </div>
            }
          />
        ))}
      </div>

      <div className="flex items-center justify-end">
        <button
          type="button"
          className="btn-primary"
          disabled={!allDone}
          onClick={() => navigate("/page6")}
        >
          {pageCopy.NEXT_BUTTON}
        </button>
      </div>
    </div>
  );
}

export default Page5;

