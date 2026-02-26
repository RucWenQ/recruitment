import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AI_ALIGNMENT } from "../constants.js";
import { useExperiment } from "../context/ExperimentContext.jsx";

function Page4() {
  const navigate = useNavigate();
  const { state } = useExperiment();
  const { aiConfig } = state;
  const [messages, setMessages] = useState([
    {
      id: "guide",
      role: "assistant",
      text: "请发送价值对齐陈述，我会逐条回应并记录你的偏好。",
    },
  ]);
  const [sentStatements, setSentStatements] = useState(new Set());
  const [inputValue, setInputValue] = useState("");

  const statementMap = useMemo(() => AI_ALIGNMENT.STATEMENTS, []);
  const isAllAligned = sentStatements.size >= statementMap.length;

  const sendStatement = (statement) => {
    if (sentStatements.has(statement.id)) return;

    setSentStatements((prev) => {
      const next = new Set(prev);
      next.add(statement.id);
      return next;
    });

    const timestamp = Date.now();
    const userMessage = {
      id: `${statement.id}-${timestamp}-user`,
      role: "user",
      text: statement.text,
    };
    setMessages((prev) => [...prev, userMessage]);

    const replyText =
      statement.fixedResponse || "（待接入大模型 API，后续将替换为实时回复。）";

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${statement.id}-${timestamp}-assistant`,
          role: "assistant",
          text: replyText,
        },
      ]);
    }, 600);
  };

  const sendFreeMessage = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const timestamp = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: `free-${timestamp}-user`,
        role: "user",
        text: trimmed,
      },
    ]);
    setInputValue("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `free-${timestamp}-assistant`,
          role: "assistant",
          text: "（AI 已收到你的补充说明，稍后会参考你的偏好。）",
        },
      ]);
    }, 700);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="section-title">价值对齐对话</h2>
        <p className="text-sm text-slate-600">{AI_ALIGNMENT.GUIDE_TEXT}</p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-700">AI 对话窗口</h3>
          <div className="mt-4 flex h-[460px] flex-col rounded-2xl border border-slate-100 bg-slate-50">
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                      message.role === "user"
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-700"
                    }`}
                  >
                    <p className="text-xs font-semibold text-slate-400">
                      {message.role === "user" ? "你" : aiConfig.name}
                    </p>
                    <p className="mt-1 whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 bg-white p-3">
              <div className="flex items-center gap-3">
                <input
                  className="input-base"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="输入你想补充的观点..."
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      sendFreeMessage();
                    }
                  }}
                />
                <button type="button" className="btn-primary" onClick={sendFreeMessage}>
                  发送
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-700">价值对齐陈述</h3>
            <p className="mt-2 text-xs text-slate-500">
              点击右侧按钮发送陈述，确认 AI 的态度并完成价值对齐。
            </p>
            <div className="mt-4 space-y-3">
              {statementMap.map((statement) => {
                const hasSent = sentStatements.has(statement.id);
                return (
                  <div
                    key={statement.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
                  >
                    <p className="text-sm text-slate-700">{statement.text}</p>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => sendStatement(statement)}
                      disabled={hasSent}
                    >
                      {hasSent ? "已发送" : "发送"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
            对话功能可在后续接入大模型 API。当前版本保留固定回应与占位文本，便于测试流程。
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          需完成 5 条价值对齐陈述后方可进入下一步。
        </p>
        <button
          type="button"
          className="btn-primary"
          disabled={!isAllAligned}
          onClick={() => navigate("/page5")}
        >
          进入 AI 初步筛选
        </button>
      </div>
    </div>
  );
}

export default Page4;
