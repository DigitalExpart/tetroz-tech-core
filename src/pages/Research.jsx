import React from "react";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import CtaBand from "@/components/site/CtaBand";
import { Image } from "@/components/ui/image";
import { labsProjects } from "@/data/site";

const SAFE_LABS_IMAGE =
  "https://media.base44.com/images/public/6ae9827d6a5b5a073b32b018/ad65e2a3c_generated_83e500eb.png";

const directives = [
  {
    title: "Evaluate before committing",
    text: "Emerging models and platforms are assessed against a defined use case, not a demo reel. If the evidence is thin, we say so.",
  },
  {
    title: "Build the prototype",
    text: "Small, complete builds answer questions faster than documents. Prototypes are scoped to a single decision.",
  },
  {
    title: "Publish what we learn",
    text: "Findings are written up so they can be reused internally and shared publicly where appropriate.",
  },
  {
    title: "Label maturity honestly",
    text: "Concept, prototype, research and product are distinct states. The website never blurs them.",
  },
];

export default function Research() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Research" }]}
        eyebrow="Tetroz Labs"
        title={<>Research and innovation, with the labels switched on.</>}
        intro="Tetroz Labs evaluates emerging technology, builds experimental software and turns validated concepts into products. Everything here is labelled by maturity — a research direction is not a shipped capability."
      />

      <section id="directives" className="scroll-mt-24 border-b border-foreground/[0.08] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-md border border-foreground/10">
              <Image src={SAFE_LABS_IMAGE} alt="Precision-engineered material study" className="h-[320px] w-full sm:h-[400px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-[#00f5ff]/85">Research posture</p>
                <p className="mt-1.5 text-[0.9rem] text-white/90">
                  Evidence first. Products only when the evidence holds.
                </p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Directives" title="How the labs operate." />
            <div className="mt-8 space-y-3">
              {directives.map((d, i) => (
                <Reveal key={d.title} delay={Math.min(i * 0.05, 0.2)}>
                  <div className="rounded-md border border-foreground/[0.08] bg-card/80 p-5 dark:bg-white/[0.02]">
                    <h3 className="text-[0.92rem] font-semibold text-foreground">{d.title}</h3>
                    <p className="mt-1.5 text-[0.83rem] leading-relaxed text-foreground/55">{d.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="tracks" className="scroll-mt-24 border-b border-foreground/[0.08] py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Current tracks"
            title="What the labs are working on."
            intro="Each track carries a maturity label. None of these are being presented as available products."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {labsProjects.map((p, i) => (
              <Reveal key={p.name} delay={Math.min(i * 0.05, 0.2)}>
                <article className="h-full rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-foreground/75">
                      {p.stage}
                    </span>
                    <span className="font-mono text-[0.55rem] tracking-[0.18em] text-foreground/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1rem] font-semibold text-foreground">{p.name}</h3>
                  <p className="mt-2.5 text-[0.85rem] leading-relaxed text-foreground/55">{p.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-4 rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02] sm:grid-cols-3 sm:p-8">
            {[
              { k: "Active product", v: "Built, documented and available to use. Listed in the product catalogue." },
              { k: "Beta", v: "Usable with known limits. Feedback shapes the next release." },
              { k: "Experimental", v: "Research or prototype. Not available, and not promised." },
            ].map((row) => (
              <div key={row.k}>
                <p className="label-mono mb-2 text-primary/70">{row.k}</p>
                <p className="text-[0.83rem] leading-relaxed text-foreground/50">{row.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Research with us."
        text="We collaborate with institutions and specialists on applied problems where the outcome is genuinely uncertain."
        primary="Propose a collaboration"
        secondary={{ label: "See partnerships", to: "/partnerships" }}
      />
    </>
  );
}