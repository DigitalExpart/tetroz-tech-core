import React, { useState } from "react";
import { Check, Loader2, Paperclip, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { futureDepartments } from "@/data/site";

const inputClass =
  "h-11 w-full rounded-sm border border-foreground/15 bg-foreground/[0.02] px-3.5 text-[0.85rem] text-foreground placeholder:text-foreground/35 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 dark:bg-white/[0.02]";
const labelClass = "mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-foreground/50";

export default function ApplicationForm({ openingTitle = "" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role_interest: openingTitle || "",
    portfolio_url: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");
  const [note, setNote] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = "Please add a valid email address.";
    if (!consent) next.consent = "Please confirm we may store your application.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    setServerError("");
    try {
      let resume_uri = "";
      if (file) {
        try {
          const uploaded = await base44.integrations.Core.UploadPrivateFile({ file });
          resume_uri = uploaded.file_uri;
        } catch {
          setNote("Your resume could not be uploaded, so the application was sent without it.");
        }
      }
      await base44.functions.invoke("submitForm", {
        kind: "application",
        ...form,
        opening_title: openingTitle,
        resume_uri,
        resume_name: file ? file.name : "",
        consent,
      });
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setServerError(err?.response?.data?.error || "The application could not be sent. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-md border border-primary/25 bg-primary/[0.06] p-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
          <Check className="h-5 w-5 text-primary" strokeWidth={2} />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-foreground">Application received</h3>
        <p className="mt-2 text-[0.88rem] leading-relaxed text-foreground/60">
          Thank you. Your details are with the Tetroz team. Because the team is small, replies are personal and may take
          time — but every genuine application is read.
        </p>
        {note && <p className="mt-3 text-[0.78rem] text-foreground/45">{note}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="ap-name">Full name *</label>
          <input id="ap-name" className={inputClass} value={form.name} onChange={set("name")} placeholder="Your name" />
          {errors.name && <p className="mt-1.5 text-[0.72rem] text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="ap-email">Email *</label>
          <input id="ap-email" type="email" className={inputClass} value={form.email} onChange={set("email")} placeholder="you@email.com" />
          {errors.email && <p className="mt-1.5 text-[0.72rem] text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="ap-phone">Phone</label>
          <input id="ap-phone" className={inputClass} value={form.phone} onChange={set("phone")} placeholder="Optional" />
        </div>
        <div>
          <label className={labelClass} htmlFor="ap-role">Area of interest</label>
          <select id="ap-role" className={inputClass} value={form.role_interest} onChange={set("role_interest")}>
            <option value="" className="bg-surface-elevated text-foreground">Select a department</option>
            {futureDepartments.map((d) => (
              <option key={d} value={d} className="bg-surface-elevated text-foreground">{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="ap-portfolio">Portfolio or profile link</label>
        <input id="ap-portfolio" className={inputClass} value={form.portfolio_url} onChange={set("portfolio_url")} placeholder="GitHub, LinkedIn, personal site" />
      </div>

      <div>
        <label className={labelClass} htmlFor="ap-message">What would you want to work on?</label>
        <textarea
          id="ap-message"
          rows={4}
          className="w-full rounded-sm border border-foreground/15 bg-foreground/[0.02] px-3.5 py-3 text-[0.85rem] leading-relaxed text-foreground placeholder:text-foreground/35 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 dark:bg-white/[0.02]"
          value={form.message}
          onChange={set("message")}
          placeholder="A few sentences on your experience and what interests you at Tetroz."
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="ap-resume">Resume or CV</label>
        <label
          htmlFor="ap-resume"
          className="flex cursor-pointer items-center gap-2 rounded-sm border border-dashed border-foreground/15 px-3.5 py-3 text-[0.8rem] text-foreground/50 transition-colors hover:border-primary/40 hover:text-foreground/75"
        >
          <Paperclip className="h-4 w-4" strokeWidth={1.6} />
          {file ? file.name : "PDF, DOC or DOCX — stored privately"}
        </label>
        <input
          id="ap-resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.78rem] leading-relaxed text-foreground/55">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
          />
          <span>I agree that Tetroz may store my application and contact me about opportunities.</span>
        </label>
        {errors.consent && <p className="mt-1.5 text-[0.72rem] text-destructive">{errors.consent}</p>}
      </div>

      {serverError && <p className="text-[0.78rem] text-destructive">{serverError}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-primary text-[0.85rem] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          <>
            Send application
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </>
        )}
      </button>
    </form>
  );
}