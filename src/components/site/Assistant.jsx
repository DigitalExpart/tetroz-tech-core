import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Send, Loader2, X, ArrowUpRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

const suggestions = [
  "What does Tetroz actually build?",
  "Which solutions fit a mid-sized business?",
  "How does an AI engagement start?",
  "How do I book a consultation?",
];

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "I'm the Tetroz AI Assistant. I can explain our divisions, help you identify the right starting point, and prepare a project inquiry. What are you working on?",
    },
  ]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  const scrollToEnd = () => {
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  };

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError("");
    scrollToEnd();
    try {
      const res = await base44.functions.invoke("tetrozAssistant", {
        messages: next.map((m) => ({ role: m.role, content: m.content })),
      });
      const reply = res?.data?.reply;
      if (!reply) throw new Error("No reply");
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setError("The assistant is unavailable right now. You can send your question through the contact form.");
    } finally {
      setBusy(false);
      scrollToEnd();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Tetroz AI Assistant" : "Open Tetroz AI Assistant"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[60] flex h-14 items-center gap-2.5 rounded-full border border-primary/35 bg-surface-elevated/95 px-5 text-[0.8rem] font-medium text-foreground shadow-[0_18px_50px_-18px_rgba(4,140,168,0.38)] backdrop-blur-xl transition-all hover:border-primary/60 hover:shadow-[0_18px_60px_-14px_rgba(4,140,168,0.55)] dark:shadow-[0_18px_50px_-18px_rgba(0,245,255,0.55)] dark:hover:shadow-[0_18px_60px_-14px_rgba(0,245,255,0.7)]"
      >
        {open ? <X className="h-4 w-4" strokeWidth={1.8} /> : <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.8} />}
        <span className="hidden sm:inline">{open ? "Close" : "Tetroz AI"}</span>
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 z-[60] flex max-h-[74vh] w-[min(94vw,400px)] flex-col overflow-hidden rounded-md border border-foreground/15 bg-surface-elevated shadow-2xl shadow-black/20 dark:shadow-black/70">
          <div className="flex items-center gap-3 border-b border-foreground/[0.08] px-4 py-3.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-primary/30 bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.7} />
            </span>
            <div>
              <p className="text-[0.82rem] font-medium leading-tight text-foreground">Tetroz AI Assistant</p>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-foreground/45">
                Grounded in approved company information
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3.5 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[88%] rounded-md px-3.5 py-2.5 text-[0.82rem] leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-primary/15 text-foreground"
                    : "border border-foreground/[0.08] bg-foreground/[0.03] text-foreground/85"
                }`}
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div className="flex items-center gap-2 text-[0.75rem] text-foreground/45">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
              </div>
            )}
            {error && <p className="text-[0.75rem] leading-relaxed text-destructive">{error}</p>}
            {messages.length === 1 && !busy && (
              <div className="space-y-1.5 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="flex w-full items-center justify-between rounded-sm border border-foreground/[0.08] px-3 py-2 text-left text-[0.75rem] text-foreground/65 transition-colors hover:border-primary/35 hover:text-foreground"
                  >
                    {s}
                    <ArrowUpRight className="h-3 w-3 opacity-40" strokeWidth={1.8} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-foreground/[0.08] p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Tetroz…"
                aria-label="Message the Tetroz AI Assistant"
                maxLength={600}
                className="h-10 w-full rounded-sm border border-foreground/15 bg-foreground/[0.03] px-3 text-[0.8rem] text-foreground placeholder:text-foreground/35 focus:border-primary/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </form>
            <Link to="/contact" className="mt-2 block text-center text-[0.68rem] text-foreground/35 hover:text-primary">
              Prefer a person? Escalate to the Tetroz team →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}