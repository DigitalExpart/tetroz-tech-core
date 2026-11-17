import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";

export default function InsightsPreview({ articles = [] }) {
  return (
    <section className="border-t border-foreground/[0.08] py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Insights & resources"
            title="Technical thinking, published plainly."
            intro="Notes on applied AI, engineering decisions, data and transformation — written by the people doing the work."
          />
          <Reveal delay={0.08}>
            <Link
              to="/resources"
              className="group inline-flex items-center gap-2 text-[0.82rem] font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              Resource library
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-foreground/[0.08] bg-foreground/[0.07] md:grid-cols-3">
          {articles.length > 0
            ? articles.map((a, i) => (
                <Reveal key={a.id} delay={Math.min(i * 0.05, 0.2)}>
                  <Link to={`/resources/${a.slug}`} className="group flex h-full flex-col bg-background p-7 transition-colors hover:bg-foreground/[0.02]">
                    <div className="flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-primary/70">
                      {a.category}
                      <span className="text-foreground/20">·</span>
                      <span className="text-foreground/35">{a.read_minutes || 5} min</span>
                    </div>
                    <h3 className="mt-4 text-[1.02rem] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-[0.84rem] leading-relaxed text-foreground/50">{a.excerpt}</p>
                    <span className="mt-auto flex items-center gap-1 pt-6 text-[0.75rem] font-medium text-foreground/40 transition-colors group-hover:text-primary">
                      Read
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                    </span>
                  </Link>
                </Reveal>
              ))
            : [0, 1, 2].map((i) => (
                <div key={i} className="bg-background p-7">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-foreground/25">Coming soon</p>
                  <p className="mt-4 text-[0.85rem] text-foreground/40">The first Tetroz articles are being prepared.</p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}