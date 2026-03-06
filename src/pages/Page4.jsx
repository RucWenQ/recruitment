import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AI_ALIGNMENT, APP_DEFAULTS, EXPERIMENT_CONFIG, PAGE_COPY } from "../constants.js";
import { useExperiment } from "../context/useExperiment.js";

function randomDelayMs(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function renderTemplate(template, variables) {
  return Object.entries(variables).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value ?? "")),
    template,
  );
}

function Page4() {
  const navigate = useNavigate();
  const { state } = useExperiment();
  const { aiConfig } = state;

  const pageCopy = PAGE_COPY.PAGE4;
  const fixedReplyDelay = EXPERIMENT_CONFIG.PAGE4_FIXED_REPLY_DELAY;

  const aiName = aiConfig.name.trim() || APP_DEFAULTS.AI_NAME;
  const aiAvatar = aiConfig.avatar.trim() || "🤖";
  const chatScrollRef = useRef(null);

  const statementMap = AI_ALIGNMENT.STATEMENTS;

  const [messages, setMessages] = useState([
    {
      id: "guide",
      role: "assistant",
      text: renderTemplate(pageCopy.WELCOME_TEMPLATE, { aiName }),
    },
  ]);
  const [sentStatements, setSentStatements] = useState(new Set());
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatError, setChatError] = useState("");

  useEffect(() => {
    const container = chatScrollRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

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
          parameter1: aiConfig.parameter1,
          parameter2: aiConfig.parameter2,
          aiName,
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.text,
          })),
        }),
      });

      let errorMessage = pageCopy.CHAT_ERROR_DEFAULT;
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
      setChatError(error?.message || pageCopy.CHAT_ERROR_DEFAULT);
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

    if (statement.fixedResponse) {
      setChatError("");
      setMessages((prev) => [...prev, userMessage]);

      const needsDelay = statement.id === "a";
      if (needsDelay) {
        setIsSending(true);
      }

      try {
        if (needsDelay) {
          await sleep(randomDelayMs(fixedReplyDelay.MIN, fixedReplyDelay.MAX));
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `${statement.id}-${Date.now()}-assistant-fixed`,
            role: "assistant",
            text: statement.fixedResponse,
          },
        ]);
      } finally {
        if (needsDelay) {
          setIsSending(false);
        }
      }
      return;
    }

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);

    await requestAssistantReply(nextMessages, pageCopy.FALLBACK_REPLY_STATEMENT);
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

    await requestAssistantReply(nextMessages, pageCopy.FALLBACK_REPLY_FREE);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="section-title">{pageCopy.TITLE}</h2>
        <p className="text-xl">{AI_ALIGNMENT.GUIDE_TEXT}</p>
      </div>

      <section className="grid items-stretch gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex h-[620px] min-h-0 flex-col rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="subsection-title">{pageCopy.CHAT_TITLE}</h3>
          <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-100 bg-slate-50">
            <div
              ref={chatScrollRef}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4"
            >
              {messages.map((message) => {
                if (message.role === "user") {
                  return (
                    <div key={message.id} className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl bg-slate-900 px-4 py-2 text-base text-white shadow-sm">
                        <p className="text-sm font-semibold text-slate-300">
                          {pageCopy.YOU_LABEL}
                        </p>
                        <p className="mt-1 whitespace-pre-line">
                          {message.text}
                        </p>
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
                      <p className="text-sm font-semibold text-slate-500">
                        {aiName}
                      </p>
                      <div className="mt-1 rounded-2xl bg-white px-4 py-2 text-base text-slate-700 shadow-sm">
                        <p className="whitespace-pre-line">{message.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {chatError ? (
              <div className="border-t border-rose-100 bg-rose-50 px-4 py-2 text-sm text-rose-700">
                {chatError}
              </div>
            ) : null}
            <div className="border-t border-slate-200 bg-white p-3">
              <div className="flex items-center gap-3">
                <input
                  className="input-base"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder={pageCopy.INPUT_PLACEHOLDER}
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
                  {isSending ? pageCopy.SENDING_BUTTON : pageCopy.SEND_BUTTON}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[620px] min-h-0 flex-col rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="subsection-title">{pageCopy.STATEMENTS_TITLE}</h3>
          <p className="note-text mt-2">{pageCopy.STATEMENTS_HINT}</p>
          <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
            {statementMap.map((statement) => {
              const hasSent = sentStatements.has(statement.id);
              return (
                <div
                  key={statement.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
                >
                  <p className="body-text">{statement.text}</p>
                  <button
                    type="button"
                    className="btn-secondary min-w-[80px] whitespace-nowrap"
                    onClick={() => sendStatement(statement)}
                    disabled={hasSent || isSending}
                  >
                    {hasSent ? pageCopy.SENT_BUTTON : pageCopy.SEND_BUTTON}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <p className="note-text">{pageCopy.READY_TO_NEXT_HINT}</p>
        <button
          type="button"
          className="btn-primary"
          disabled={!isAllAligned}
          onClick={() => navigate("/page5")}
        >
          {pageCopy.NEXT_BUTTON}
        </button>
      </div>
    </div>
  );
}

export default Page4;

