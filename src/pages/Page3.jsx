import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RangeWithTicks from "../components/RangeWithTicks.jsx";
import { useExperiment } from "../context/ExperimentContext.jsx";

const PRESET_AVATARS = [
  "🤖",
  "🧭",
  "🧠",
  "🧑‍💼",
  "👁️‍🗨️",
  "🛰️",
  "🧪",
  "🧬",
  "📊",
  "📎",
  "🗂️",
  "🪄",
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
        <p className="body-text">
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
          <h3 className="subsection-title">
            AI 参数（0-100）
          </h3>
          <div className="mt-4 space-y-4">
            <RangeWithTicks
              id="ai-creativity"
              label="创造性"
              hint="数值越高，表示越注重创新思路与灵活判断。"
              value={aiConfig.creativity}
              onChange={(event) =>
                updateAIConfig({ creativity: Number(event.target.value) })
              }
            />
            <RangeWithTicks
              id="ai-strictness"
              label="严格程度"
              hint="数值越高，表示越注重规则一致性与高标准筛选。"
              value={aiConfig.strictness}
              onChange={(event) =>
                updateAIConfig({ strictness: Number(event.target.value) })
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
            <div className="grid grid-cols-3 gap-3">
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
            <span className="field-label text-slate-600">
              提示词/角色设定
            </span>
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
