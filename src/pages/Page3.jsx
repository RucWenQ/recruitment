import { useNavigate } from "react-router-dom";
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

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="section-title">创建我的AI</h2>
        <p className="text-sm text-slate-600">
          请给你的 AI 选取昵称和头像，并调整参数与提示词，以匹配你的招聘偏好。
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-m font-semibold text-slate-700">AI 昵称</h3>
          <label className="mt-4 block space-y-2">
            {/* <span className="text-xs font-medium text-slate-500">AI 昵称</span> */}
            <input
              className="input-base"
              value={aiConfig.name}
              onChange={(event) => updateAIConfig({ name: event.target.value })}
              placeholder="请输入"
            />
          </label>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-m font-semibold text-slate-700">
            AI 参数（0-100）
          </h3>
          <div className="mt-4 space-y-4">
            <label className="space-y-2">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>创造性</span>
                <span className="font-semibold text-slate-700">
                  {aiConfig.creativity}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={aiConfig.creativity}
                onChange={(event) =>
                  updateAIConfig({ creativity: Number(event.target.value) })
                }
                onInput={(event) =>
                  updateAIConfig({ creativity: Number(event.target.value) })
                }
                className="w-full cursor-pointer accent-slate-900"
              />
            </label>
            <label className="space-y-2">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>严格程度</span>
                <span className="font-semibold text-slate-700">
                  {aiConfig.strictness}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={aiConfig.strictness}
                onChange={(event) =>
                  updateAIConfig({ strictness: Number(event.target.value) })
                }
                onInput={(event) =>
                  updateAIConfig({ strictness: Number(event.target.value) })
                }
                className="w-full cursor-pointer accent-slate-900"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-m font-semibold text-slate-700">AI 头像</h3>
          {/* <p className="mt-2 text-xs text-slate-500">选择或输入头像并预览。</p> */}
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
                  onClick={() => updateAIConfig({ avatar })}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-m font-semibold text-slate-700">AI 提示词</h3>
          <label className="mt-4 block space-y-2">
            <span className="text-sm font-medium text-slate-500">
              提示词/角色设定
            </span>
            <textarea
              rows="8"
              className="input-base min-h-[240px]"
              value={aiConfig.prompt}
              onChange={(event) =>
                updateAIConfig({ prompt: event.target.value })
              }
              placeholder="描述 AI 的角色、价值观与筛选偏好..."
            />
          </label>
        </div>
      </section>

      <div className="flex items-center justify-end">
        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate("/page4")}
        >
          下一步
        </button>
      </div>
    </div>
  );
}

export default Page3;
