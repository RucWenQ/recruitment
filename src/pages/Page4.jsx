import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AI_ALIGNMENT } from "../constants.js";
import { useExperiment } from "../context/ExperimentContext.jsx";

function Page4() {
  const navigate = useNavigate();
  const { state } = useExperiment();
  const { aiConfig } = state;

  const aiName = aiConfig.name.trim() || "AI助手";
  const aiAvatar = aiConfig.avatar.trim() || "🤖";

  const statementMap = useMemo(() => AI_ALIGNMENT.STATEMENTS, []);

  const [messages, setMessages] = useState([
    {
      id: "guide",
      role: "assistant",
      text: "请发送价值对齐陈述，我会逐条回应并记录你的偏好。",
    },
  ]);
  const [sentStatements, setSentStatements] = useState(new Set());
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatError, setChatError] = useState("");

  const isAllAligned = sentStatements.size >= statementMap.length;

  const requestAssistantReply = async (nextMessages, fallbackReply) => {
    setIsSending(true);
    setChatError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: aiConfig.prompt,
          creativity: aiConfig.creativity,
          strictness: aiConfig.strictness,
          aiName,
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.text,
          })),
        }),
      });

      let errorMessage = "AI 回复失败，请稍后重试。";
      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        if (data?.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }

      const replyText = data?.reply || fallbackReply;
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: replyText,
        },
      ]);
    } catch (error) {
      setChatError(error?.message || "AI 回复失败，请稍后重试。");
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-fallback-${Date.now()}`,
          role: "assistant",
          text: fallbackReply,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const sendStatement = async (statement) => {
    if (sentStatements.has(statement.id) || isSending) return;

    setSentStatements((prev) => {
      const next = new Set(prev);
      next.add(statement.id);
      return next;
    });

    const userMessage = {
      id: `${statement.id}-${Date.now()}-user`,
      role: "user",
      text: statement.text,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);

    await requestAssistantReply(
      nextMessages,
      statement.fixedResponse || "我已收到你的观点，会在后续筛选中按这个原则执行。",
    );
  };

  const sendFreeMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) return;

    const userMessage = {
      id: `free-${Date.now()}-user`,
      role: "user",
      text: trimmed,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue("");

    await requestAssistantReply(
      nextMessages,
      "我已收到你的补充说明，会在后续筛选中参考你的偏好。",
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="section-title">AI 深度调试</h2>
        <p className="text-sm text-slate-600">{AI_ALIGNMENT.GUIDE_TEXT}</p>
      </div>

      <section className="grid items-stretch gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex h-[620px] flex-col rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-700">AI 对话窗口</h3>
          <div className="mt-4 flex flex-1 flex-col rounded-2xl border border-slate-100 bg-slate-50">
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message) => {
                if (message.role === "user") {
                  return (
                    <div key={message.id} className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl bg-slate-900 px-4 py-2 text-sm text-white shadow-sm">
                        <p className="text-xs font-semibold text-slate-300">你</p>
                        <p className="mt-1 whitespace-pre-line">{message.text}</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={message.id} className="flex items-start gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-base shadow-sm ring-1 ring-slate-200">
                      {aiAvatar}
                    </div>
                    <div className="max-w-[80%]">
                      <p className="text-xs font-semibold text-slate-500">{aiName}</p>
                      <div className="mt-1 rounded-2xl bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
                        <p className="whitespace-pre-line">{message.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {chatError ? (
              <div className="border-t border-rose-100 bg-rose-50 px-4 py-2 text-xs text-rose-700">
                {chatError}
              </div>
            ) : null}
            <div className="border-t border-slate-200 bg-white p-3">
              <div className="flex items-center gap-3">
                <input
                  className="input-base"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="输入你想补充的观点..."
                  disabled={isSending}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      sendFreeMessage();
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn-primary min-w-[88px] px-5 py-2.5 text-base"
                  disabled={isSending || !inputValue.trim()}
                  onClick={sendFreeMessage}
                >
                  {isSending ? "发送中" : "发送"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[620px] flex-col rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-700">价值对齐陈述</h3>
          <p className="mt-2 text-xs text-slate-500">
            点击按钮发送陈述，确认 AI 的态度并完成价值对齐。
          </p>
          <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
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
                    className="btn-secondary min-w-[80px] whitespace-nowrap"
                    onClick={() => sendStatement(statement)}
                    disabled={hasSent || isSending}
                  >
                    {hasSent ? "已发送" : "发送"}
                  </button>
                </div>
              );
            })}
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
          下一步
        </button>
      </div>
    </div>
  );
}

export default Page4;
