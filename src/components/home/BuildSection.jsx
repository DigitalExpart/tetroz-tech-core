import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import DivisionIcon from "@/components/site/DivisionIcon";
import { divisionBySlug } from "@/data/divisions";

const slugs = ["software-engineering", "digital-products", "platforms-and-marketplaces", "digital-transformation"];

export default function BuildSection() {
  return (
    <section className="border-t border-foreground/[0.08] py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="What we build"
          title="Software, products and platforms we own the outcome of."
          intro="Some work is delivered for a client. Some becomes a Tetroz product. Both are held to the same standard of engineering, documentation and handover."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {slugs.map((slug, i) => {
            const d = divisionBySlug(slug);
            if (!d) return null;
            return (
              <Reveal key={slug} delay={Math.min(i * 0.05, 0.2)}>
                <Link
                  to={`/solutions/${d.slug}`}
                  className="prism-card group flex h-full flex-col rounded-md border border-foreground/[0.08] bg-card/80 p-7 dark:bg-white/[0.02] sm:p-9"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-sm border border-foreground/10 bg-foreground/[0.03] text-primary">
                      <DivisionIcon name={d.icon} />
                    </span>
                    <span className="font-mono text-[0.58rem] tracking-[0.2em] text-foreground/30">{d.code}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold leading-snug text-foreground">{d.title}</h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-foreground/55">{d.short}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {d.capabilities.slice(0, 3).map((c) => (
                      <span
                        key={c.title}
                        className="rounded-full border border-foreground/[0.09] px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-foreground/45"
                      >
                        {c.title}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center gap-1 pt-7 text-[0.8rem] font-medium text-foreground/60 transition-colors group-hover:text-primary">
                    Explore division
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}