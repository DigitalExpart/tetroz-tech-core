import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import { whyTetroz } from "@/data/site";

export default function WhySection() {
  return (
    <section className="relative overflow-hidden border-t border-foreground/[0.08] bg-surface-alt py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 aurora opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why organizations choose Tetroz"
          title="Built like a company that intends to be here in ten years."
          intro="No inflated claims, no invented client logos. What we offer is engineering discipline, honest scope, and systems designed to outlive the engagement."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-foreground/[0.08] bg-foreground/[0.07] sm:grid-cols-2">
          {whyTetroz.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i * 0.05, 0.2)}>
              <div className="h-full bg-surface-alt p-7 sm:p-9">
                <span className="font-mono text-[0.6rem] tracking-[0.2em] text-primary/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[1.05rem] font-semibold leading-snug text-foreground">{item.title}</h3>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-foreground/50">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}