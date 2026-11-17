import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function PageHero({ eyebrow, title, intro, crumbs = [], children }) {
  return (
    <section className="relative overflow-hidden border-b border-foreground/[0.08] bg-surface-alt">
      <div className="pointer-events-none absolute inset-0 aurora opacity-70" />
      <div className="pointer-events-none absolute inset-0 grid-rules opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-foreground/35">
            <Link to="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3 opacity-50" strokeWidth={2} />
                {c.to ? (
                  <Link to={c.to} className="transition-colors hover:text-primary">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-foreground/60">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-primary/60" />
              <span className="label-mono text-primary/80">{eyebrow}</span>
            </div>
          )}
          <h1 className="text-balance text-4xl font-semibold leading-[1.03] tracking-tight text-foreground sm:text-5xl lg:text-[4rem]">
            {title}
          </h1>
          {intro && <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-foreground/55 sm:text-[1.06rem]">{intro}</p>}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </div>
    </section>
  );
}