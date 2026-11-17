import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";
import DivisionIcon from "@/components/site/DivisionIcon";
import { divisions } from "@/data/divisions";

export default function Solutions() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions" }]}
        eyebrow="The ecosystem"
        title="Solutions designed as one system, not eight silos."
        intro="Each division stands on its own, and each one is stronger because the others exist. Most engagements start in one place and expand as the problem becomes clearer."
      >
        <div className="flex flex-wrap gap-2">
          {divisions.map((d) => (
            <a
              key={d.slug}
              href={`#${d.slug}`}
              className="rounded-full border border-foreground/15 px-3.5 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-foreground/60 transition-colors hover:border-primary/40 hover:text-primary"
            >
              {d.title.split(" — ")[0].replace(" & Intelligent Automation", "")}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="space-y-4">
            {divisions.map((division, i) => (
              <Reveal key={division.slug} delay={Math.min(i * 0.03, 0.15)}>
                <article
                  id={division.slug}
                  className="prism-card group scroll-mt-24 rounded-md border border-foreground/[0.08] bg-card/80 p-7 dark:bg-white/[0.02] sm:p-9"
                >
                  <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
                    <div>
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-sm border border-foreground/10 bg-foreground/[0.03] text-primary">
                          <DivisionIcon name={division.icon} className="h-5 w-5" />
                        </span>
                        <div>
                          <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-foreground/35">
                            Division {division.code}
                          </span>
                          <h2 className="mt-1 text-lg font-semibold leading-snug text-foreground sm:text-xl">
                            {division.title}
                          </h2>
                        </div>
                      </div>
                      <p className="mt-5 text-[0.9rem] leading-relaxed text-foreground/55">{division.overview[0]}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {division.capabilities.slice(0, 4).map((c) => (
                          <span
                            key={c.title}
                            className="rounded-full border border-foreground/[0.09] px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-foreground/45"
                          >
                            {c.title}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/solutions/${division.slug}`}
                        className="mt-7 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-primary hover:text-primary/80"
                      >
                        Explore {division.title.split(" — ")[0]}
                        <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                      </Link>
                    </div>
                    <div className="rounded-sm border border-foreground/[0.08] bg-foreground/[0.03] p-5 dark:bg-black/20">
                      <p className="label-mono mb-3">Typical starting points</p>
                      <ul className="space-y-2.5">
                        {division.useCases.map((u) => (
                          <li key={u} className="flex gap-2.5 text-[0.82rem] leading-relaxed text-foreground/55">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                            {u}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which division fits?"
        text="Describe the situation. We will tell you where it belongs, and whether we are the right team for it."
        primary="Talk to the team"
        secondary={{ label: "See industry applications", to: "/industries" }}
      />
    </>
  );
}