import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CANDIDATES, EXPERIMENT_CONFIG } from "../constants.js";
import CandidateCard from "../components/CandidateCard.jsx";
import { useExperiment } from "../context/useExperiment.js";

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Page5() {
  const navigate = useNavigate();
  const { state } = useExperiment();
  const { aiConfig } = state;

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
    setWarning("请等待AI审阅完当前候选人");
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
    if (status === "sending") return "正在发送";
    if (status === "reviewing") return `${aiConfig.name} 正在审阅材料`;
    if (status === "done") return "已完成审阅";
    return "等待发送";
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="section-title">AI 审阅</h2>
        <p className="body-text">
          请按任意顺序将每位候选人的完整资料逐个发送给 {aiConfig.name}
          ，完成5人的初步筛选。
        </p>
      </div>

      {warning && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-base text-amber-700">
          {warning}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div>
          <p className="body-text font-medium">审阅进度</p>
          <p className="note-text">
            已完成 {sentCount} / {totalCount}
          </p>
        </div>
        <span className="badge">{allDone ? "已完成" : "进行中"}</span>
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
                    ? `发送给 ${aiConfig.name}`
                    : "已发送"}
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
          下一步
        </button>
      </div>
    </div>
  );
}

export default Page5;
