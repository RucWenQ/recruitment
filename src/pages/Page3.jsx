import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RangeWithTicks from "../components/RangeWithTicks.jsx";
import { useExperiment } from "../context/useExperiment.js";

const PRESET_AVATARS = [
  "🤖",
  "🧠",
  "⚙️",
  "👩‍💼",
  "🧑‍💼",
  "🔍",
  "🐰",
  "🐱",
  "👽",
  "🐲",
  "🦊",
  "🦄",
  "🤡",
  "🐯",
  "🐼",
  "👻",
];

function Page3() {
  const navigate = useNavigate();
  const { state, updateAIConfig } = useExperiment();
  const { aiConfig } = state;
  const [validationError, setValidationError] = useState("");

  const isConfigComplete =
    aiConfig.name.trim() && aiConfig.avatar.trim() && aiConfig.prompt.trim();

  const handleNext = () => {
    if (!isConfigComplete) {
      setValidationError("请完整填写 AI 昵称、头像和提示词后再进入下一步。");
      return;
    }
    setValidationError("");
    navigate("/page4");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="section-title">创建我的AI</h2>
        <p className="text-xl">
          在这一环节中，你将创建属于你的AI智能体，用于协助你完成招聘任务。
        </p>
        <p className="text-xl">
          请给你的 AI 选取昵称和头像，并调整参数与提示词，以匹配你的招聘偏好。
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="subsection-title">AI 昵称</h3>
          <label className="mt-4 block space-y-2">
            <input
              className="input-base"
              value={aiConfig.name}
              onChange={(event) => {
                updateAIConfig({ name: event.target.value });
                if (validationError) setValidationError("");
              }}
              placeholder="请输入"
            />
          </label>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="subsection-title">AI 参数（0-100）</h3>
          <div className="mt-4 space-y-4">
            <RangeWithTicks
              id="ai-parameter1"
              label="重视热爱"
              hint="参数越高，表明越重视候选者的“热爱”程度。"
              minLabel="0"
              maxLabel="100"
              value={aiConfig.parameter1}
              onChange={(event) =>
                updateAIConfig({ parameter1: Number(event.target.value) })
              }
            />
            <RangeWithTicks
              id="ai-parameter2"
              label="重视迅捷"
              hint="参数越高，表明越重视候选者的“迅捷”程度。"
              minLabel="0"
              maxLabel="100"
              value={aiConfig.parameter2}
              onChange={(event) =>
                updateAIConfig({ parameter2: Number(event.target.value) })
              }
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="subsection-title">AI 头像</h3>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-6 text-5xl">
              {aiConfig.avatar || ""}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {PRESET_AVATARS.map((avatar) => (
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
          <h3 className="subsection-title">AI 提示词</h3>
          <label className="mt-4 block space-y-2">
            <span className="field-label text-slate-600">提示词/角色设定</span>
            <textarea
              rows="8"
              className="input-base min-h-[240px]"
              value={aiConfig.prompt}
              onChange={(event) => {
                updateAIConfig({ prompt: event.target.value });
                if (validationError) setValidationError("");
              }}
              placeholder="描述 AI 的角色、价值观与筛选偏好..."
            />
          </label>
        </div>
      </section>

      <div className="flex flex-col items-end gap-3">
        {validationError ? (
          <p className="text-base text-rose-600">{validationError}</p>
        ) : null}
        <button type="button" className="btn-primary" onClick={handleNext}>
          下一步
        </button>
      </div>
    </div>
  );
}

export default Page3;
