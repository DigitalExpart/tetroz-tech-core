import React, { useState } from "react";
import { Check, Loader2, Paperclip, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { industries } from "@/data/industries";
import { divisions } from "@/data/divisions";

const budgets = [
  { value: "not_sure", label: "Not sure yet" },
  { value: "under_10k", label: "Under $10,000" },
  { value: "10k_25k", label: "$10,000 – $25,000" },
  { value: "25k_50k", label: "$25,000 – $50,000" },
  { value: "50k_100k", label: "$50,000 – $100,000" },
  { value: "100k_plus", label: "$100,000+" },
];

const timelines = [
  { value: "exploring", label: "Exploring options" },
  { value: "under_1_month", label: "Within a month" },
  { value: "1_3_months", label: "1 – 3 months" },
  { value: "3_6_months", label: "3 – 6 months" },
  { value: "6_plus_months", label: "6+ months" },
];

const inputClass =
  "h-11 w-full rounded-sm border border-foreground/15 bg-foreground/[0.02] px-3.5 text-[0.85rem] text-foreground placeholder:text-foreground/35 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 dark:bg-white/[0.02]";

const labelClass = "mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-foreground/50";

export default function InquiryForm({ type = "general", sourcePage = "", defaultService = "", compact = false }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "",
    service_interest: defaultService,
    budget_range: "",
    timeline: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");
  const [note, setNote] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = "Please add a valid email address.";
    if (form.message.trim().length < 12) next.message = "A sentence or two about your goal helps us respond properly.";
    if (!consent) next.consent = "Please confirm we may contact you about this inquiry.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    setStatus("sending");
    try {
      let file_uri = "";
      if (file) {
        try {
          const uploaded = await base44.integrations.Core.UploadPrivateFile({ file });
          file_uri = uploaded.file_uri;
        } catch {
          setNote("Your attachment could not be uploaded, so the inquiry was sent without it.");
        }
      }
      await base44.functions.invoke("submitForm", {
        kind: "inquiry",
        ...form,
        inquiry_type: type,
        file_uri,
        file_name: file ? file.name : "",
        consent,
        source_page: sourcePage || window.location.pathname,
      });
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setServerError(
        err?.response?.data?.error || "Something went wrong sending your inquiry. Please try again in a moment."
      );
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-md border border-primary/25 bg-primary/[0.06] p-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
          <Check className="h-5 w-5 text-primary" strokeWidth={2} />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-foreground">Inquiry received</h3>
        <p className="mt-2 text-[0.88rem] leading-relaxed text-foreground/60">
          Thank you. Your inquiry is logged with the Tetroz team and will be reviewed with a clear next step. Business
          contact details are being finalised, so a reply will come from the team directly.
        </p>
        {note && <p className="mt-3 text-[0.78rem] text-foreground/45">{note}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="if-name">Full name *</label>
          <input id="if-name" className={inputClass} value={form.name} onChange={set("name")} placeholder="Your name" />
          {errors.name && <p className="mt-1.5 text-[0.72rem] text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="if-email">Business email *</label>
          <input id="if-email" type="email" className={inputClass} value={form.email} onChange={set("email")} placeholder="you@company.com" />
          {errors.email && <p className="mt-1.5 text-[0.72rem] text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="if-company">Company</label>
          <input id="if-company" className={inputClass} value={form.company} onChange={set("company")} placeholder="Organisation" />
        </div>
        <div>
          <label className={labelClass} htmlFor="if-phone">Phone</label>
          <input id="if-phone" className={inputClass} value={form.phone} onChange={set("phone")} placeholder="Optional" />
        </div>
      </div>

      {!compact && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="if-industry">Industry</label>
            <select id="if-industry" className={inputClass} value={form.industry} onChange={set("industry")}>
              <option value="" className="bg-surface-elevated text-foreground">Select an industry</option>
              {industries.map((i) => (
                <option key={i.slug} value={i.title} className="bg-surface-elevated text-foreground">{i.title}</option>
              ))}
              <option value="other" className="bg-surface-elevated text-foreground">Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="if-service">Service of interest</label>
            <select id="if-service" className={inputClass} value={form.service_interest} onChange={set("service_interest")}>
              <option value="" className="bg-surface-elevated text-foreground">Select a division</option>
              {divisions.map((d) => (
                <option key={d.slug} value={d.title} className="bg-surface-elevated text-foreground">{d.title.split(" — ")[0]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="if-budget">Budget range</label>
            <select id="if-budget" className={inputClass} value={form.budget_range} onChange={set("budget_range")}>
              <option value="" className="bg-surface-elevated text-foreground">Select a range</option>
              {budgets.map((b) => (
                <option key={b.value} value={b.value} className="bg-surface-elevated text-foreground">{b.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="if-timeline">Timeline</label>
            <select id="if-timeline" className={inputClass} value={form.timeline} onChange={set("timeline")}>
              <option value="" className="bg-surface-elevated text-foreground">Select a timeline</option>
              {timelines.map((t) => (
                <option key={t.value} value={t.value} className="bg-surface-elevated text-foreground">{t.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div>
        <label className={labelClass} htmlFor="if-message">What are you trying to build or solve? *</label>
        <textarea
          id="if-message"
          rows={compact ? 4 : 5}
          className="w-full rounded-sm border border-foreground/15 bg-foreground/[0.02] px-3.5 py-3 text-[0.85rem] leading-relaxed text-foreground placeholder:text-foreground/35 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 dark:bg-white/[0.02]"
          value={form.message}
          onChange={set("message")}
          placeholder="The problem, the goal, and anything already in place."
        />
        {errors.message && <p className="mt-1.5 text-[0.72rem] text-destructive">{errors.message}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="if-file">Attach a brief (optional)</label>
        <label
          htmlFor="if-file"
          className="flex cursor-pointer items-center gap-2 rounded-sm border border-dashed border-foreground/15 px-3.5 py-3 text-[0.8rem] text-foreground/50 transition-colors hover:border-primary/40 hover:text-foreground/75"
        >
          <Paperclip className="h-4 w-4" strokeWidth={1.6} />
          {file ? file.name : "PDF, DOC, DOCX or image — stored privately"}
        </label>
        <input
          id="if-file"
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
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
          <span>I agree that Tetroz may contact me about this inquiry and store the details I submit.</span>
        </label>
        {errors.consent && <p className="mt-1.5 text-[0.72rem] text-destructive">{errors.consent}</p>}
      </div>

      {serverError && <p className="text-[0.78rem] text-destructive">{serverError}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-primary text-[0.85rem] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          <>
            Submit inquiry
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </>
        )}
      </button>
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-foreground/25">
        Submissions are stored securely and reviewed by the Tetroz team.
      </p>
    </form>
  );
}