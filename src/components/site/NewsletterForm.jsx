import React, { useState } from "react";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function NewsletterForm({ source = "website" }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!consent) {
      setError("Please confirm you want to receive email from Tetroz.");
      return;
    }
    setStatus("sending");
    try {
      await base44.functions.invoke("submitForm", { kind: "newsletter", email: email.trim(), consent, source });
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(err?.response?.data?.error || "Subscription failed. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex items-center gap-2.5 rounded-sm border border-primary/25 bg-primary/[0.06] px-4 py-3 text-[0.83rem] text-foreground/75">
        <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
        You&apos;re on the list. Insights will arrive when there is something worth reading.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address for the Tetroz newsletter"
          className="h-11 w-full rounded-sm border border-foreground/15 bg-foreground/[0.03] px-3.5 text-[0.85rem] text-foreground placeholder:text-foreground/35 focus:border-primary/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-sm bg-foreground px-5 text-[0.82rem] font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
        >
          {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Subscribe <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} /></>}
        </button>
      </div>
      <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-[0.72rem] leading-relaxed text-foreground/45">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-primary"
        />
        <span>I consent to receiving occasional technology insights from Tetroz. Unsubscribe any time.</span>
      </label>
      {error && <p className="mt-2 text-[0.72rem] text-destructive">{error}</p>}
    </form>
  );
}