import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import { industries } from "@/data/industries";

export default function IndustriesSection() {
  return (
    <section className="relative overflow-hidden border-t border-foreground/[0.08] bg-surface-alt py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 grid-rules-light opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr]">
          <div>
            <SectionHeading
              eyebrow="Industries served"
              title="Sector context is not optional."
              intro="The same technology means different things under different regulation, risk and operational reality. We start from how your sector actually works."
            />
            <Reveal delay={0.1}>
              <Link
                to="/industries"
                className="mt-8 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-primary hover:text-primary/80"
              >
                Explore industries
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            </Reveal>
          </div>

          <div className="border-t border-foreground/[0.08]">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={Math.min(i * 0.03, 0.2)}>
                <Link
                  to={`/industries/${industry.slug}`}
                  className="group flex items-center justify-between gap-6 border-b border-foreground/[0.08] py-4 transition-colors hover:border-primary/30"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.55rem] tracking-[0.16em] text-foreground/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.95rem] font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                      {industry.title}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/20 transition-all group-hover:-translate-y-0.5 group-hover:text-primary" strokeWidth={1.6} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}