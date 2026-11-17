import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFoundBlock({ title = "We couldn't find that page.", text }) {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "prerender-status-code";
    meta.content = "404";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-foreground/[0.08] bg-surface-alt">
      <div className="pointer-events-none absolute inset-0 aurora opacity-50" />
      <div className="relative mx-auto flex min-h-[60vh] max-w-[1400px] flex-col justify-center px-5 py-24 sm:px-8">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-primary/70">404</span>
        <h1 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-foreground/55">
          {text || "The link may be outdated, or the item is no longer published. The rest of the site is still here."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-[0.82rem] font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Back to home
          </Link>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 rounded-sm border border-foreground/15 px-6 py-3 text-[0.82rem] font-medium text-foreground/75 hover:bg-foreground/[0.04] hover:text-foreground"
          >
            Browse solutions
          </Link>
        </div>
      </div>
    </section>
  );
}