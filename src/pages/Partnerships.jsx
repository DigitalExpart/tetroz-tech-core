import React from "react";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import InquiryForm from "@/components/site/InquiryForm";
import { partnershipPaths } from "@/data/site";

const stages = [
  { title: "Introduction", text: "A short conversation about what each side actually does and where the overlap is real." },
  { title: "Working agreement", text: "Scope, ownership, confidentiality and commercial terms in writing before any joint work begins." },
  { title: "Pilot", text: "A bounded piece of work that proves the partnership is useful in practice, not just on paper." },
  { title: "Ongoing", text: "A simple operating rhythm with clear owners on both sides and an annual review." },
];

export default function Partnerships() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Partnerships" }]}
        eyebrow="Partnerships & collaboration"
        title="Build something with us, not just for us."
        intro="Tetroz works with technology providers, research institutions, specialist delivery firms and operators who are building in adjacent territory. Serious conversations only — we would rather say no early than stall a good idea."
      />

      <section className="border-b border-foreground/[0.08] py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading eyebrow="Where we collaborate" title="Four kinds of partnership." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-foreground/[0.08] bg-foreground/[0.07] sm:grid-cols-2">
            {partnershipPaths.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i * 0.05, 0.2)}>
                <div className="h-full bg-background p-7 sm:p-9">
                  <span className="font-mono text-[0.58rem] tracking-[0.2em] text-primary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2.5 text-[0.86rem] leading-relaxed text-foreground/55">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/[0.08] bg-surface-alt py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div>
              <SectionHeading eyebrow="How it starts" title="A partnership has stages." />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {stages.map((s, i) => (
                <Reveal key={s.title} delay={Math.min(i * 0.05, 0.2)}>
                  <div className="h-full rounded-md border border-foreground/[0.08] bg-card/80 p-5 dark:bg-white/[0.02]">
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-primary/60">
                      Stage {i + 1}
                    </p>
                    <h3 className="mt-3 text-[0.92rem] font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-foreground/55">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/[0.08] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Propose a partnership"
              title="Tell us what you have and what you want to build."
              intro="Include what you do, what the collaboration would look like in practice, and what you would need from Tetroz. Vague pitches are politely declined."
            />
            <div className="mt-8 rounded-md border border-accent/20 bg-accent/[0.05] p-6">
              <p className="label-mono mb-2 text-foreground/55">Investor note</p>
              <p className="text-[0.83rem] leading-relaxed text-foreground/65">
                Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any security. Tetroz
                does not publicly market investment opportunities. Any future financing would be conducted privately and
                in accordance with applicable Canadian securities law.
              </p>
            </div>
          </div>
          <div className="rounded-md border border-foreground/[0.08] bg-surface-elevated p-6 sm:p-8">
            <InquiryForm type="partnership" sourcePage="/partnerships" />
          </div>
        </div>
      </section>
    </>
  );
}