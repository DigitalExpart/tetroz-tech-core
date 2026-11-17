import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import NewsletterForm from "@/components/site/NewsletterForm";

export default function NewsletterBand() {
  return (
    <section className="relative overflow-hidden border-t border-foreground/[0.08] bg-surface-alt">
      <div className="pointer-events-none absolute inset-0 grid-rules opacity-30" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" />
                <span className="label-mono text-primary/80">Tetroz signal</span>
              </div>
              <h2 className="text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                Occasional insight, no noise.
              </h2>
              <p className="mt-3 max-w-md text-[0.9rem] leading-relaxed text-foreground/55">
                Applied AI findings, engineering notes and product announcements. Sent only when there is something
                genuinely worth reading.
              </p>
              <Link
                to="/contact"
                className="group mt-6 inline-flex items-center gap-2 text-[0.82rem] font-medium text-foreground/65 transition-colors hover:text-primary"
              >
                Or start a conversation
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-md border border-foreground/[0.08] bg-card/85 p-6 dark:bg-white/[0.02] sm:p-7">
              <NewsletterForm source="homepage" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}