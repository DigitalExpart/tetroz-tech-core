import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import CtaBand from "@/components/site/CtaBand";
import InquiryForm from "@/components/site/InquiryForm";
import { Image } from "@/components/ui/image";
import { divisions } from "@/data/divisions";

const AI_IMAGE =
  "https://media.base44.com/images/public/6ae9827d6a5b5a073b32b018/ad65e2a3c_generated_83e500eb.png";

const ai = divisions[0];

const method = [
  {
    step: "01",
    title: "Frame the decision",
    text: "We start with the decision or task the system must improve, who owns it, and what a wrong answer costs.",
  },
  {
    step: "02",
    title: "Build the evaluation",
    text: "A curated test set and scoring method come before any production integration. If it cannot be measured, it cannot ship.",
  },
  {
    step: "03",
    title: "Integrate with guardrails",
    text: "Grounding, permissions, approval gates and full activity logging are part of the build, not a later phase.",
  },
  {
    step: "04",
    title: "Operate and improve",
    text: "Real usage produces real failure cases. Those become the next test set, and the system improves against evidence.",
  },
];

const honestNotes = [
  "We label what is live, in beta, in development or still a concept — in writing.",
  "We do not promise model accuracy that has not been measured on your data.",
  "Where a rule or a simpler system solves the problem, we will say so.",
];

export default function AiAutomation() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "AI & Automation" }]}
        eyebrow="Applied artificial intelligence"
        title={<>AI that earns its place in the workflow.</>}
        intro="Assistants, document intelligence, forecasting and agentic automation — designed around a real decision, measured against a real test set, and operated with guardrails that hold."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="#ai-inquiry"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-primary px-7 text-[0.85rem] font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Scope an AI project
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <Link
            to="/solutions/data-and-analytics"
            className="inline-flex h-12 items-center justify-center rounded-sm border border-foreground/15 px-7 text-[0.85rem] font-medium text-foreground/80 hover:bg-foreground/[0.05] hover:text-foreground"
          >
            Data foundations
          </Link>
        </div>
      </PageHero>

      <section id="capabilities" className="scroll-mt-24 border-b border-foreground/[0.08] py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Capabilities"
            title="What we actually build with AI."
            intro="Every item below is an engineering capability, not a claim about a product that already exists."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ai.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={Math.min(i * 0.04, 0.2)}>
                <div className="h-full rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02]">
                  <span className="font-mono text-[0.55rem] tracking-[0.2em] text-primary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[0.98rem] font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2.5 text-[0.84rem] leading-relaxed text-foreground/55">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="method" className="scroll-mt-24 border-b border-foreground/[0.08] bg-surface-alt py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-md border border-foreground/10">
              <Image src={AI_IMAGE} alt="Macro detail of engineered systems" className="h-[320px] w-full sm:h-[420px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/90 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-sm border border-white/15 bg-[#0a0a0d]/85 px-4 py-3 backdrop-blur-md">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-[#00f5ff]/85">Evaluation first</p>
                <p className="mt-1 text-[0.82rem] text-white/85">No production AI without a measured test set.</p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading eyebrow="Method" title="Four steps, in this order." />
            <div className="mt-8 space-y-4">
              {method.map((m, i) => (
                <Reveal key={m.step} delay={Math.min(i * 0.05, 0.2)}>
                  <div className="flex gap-5 rounded-md border border-foreground/[0.08] bg-card/80 p-5 dark:bg-white/[0.02]">
                    <span className="font-mono text-[0.62rem] tracking-[0.16em] text-primary/70">{m.step}</span>
                    <div>
                      <h3 className="text-[0.92rem] font-semibold text-foreground">{m.title}</h3>
                      <p className="mt-1.5 text-[0.83rem] leading-relaxed text-foreground/55">{m.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/[0.08] py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-8 rounded-md border border-foreground/[0.08] bg-card/80 p-7 dark:bg-white/[0.02] sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="label-mono text-primary/80">Stated plainly</p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-foreground">
                What we will not do with AI.
              </h2>
            </div>
            <ul className="space-y-3">
              {honestNotes.map((n) => (
                <li key={n} className="flex items-start gap-3 text-[0.87rem] leading-relaxed text-foreground/65">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="ai-inquiry" className="scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="AI inquiry"
              title="Describe the decision you want to improve."
              intro="Tell us where the work slows down or where judgement is being applied inconsistently. We will tell you whether AI is the right instrument — and what it would take to prove it."
            />
            <div className="mt-8 space-y-3">
              {ai.useCases.slice(0, 3).map((u) => (
                <p key={u} className="flex gap-2.5 text-[0.85rem] leading-relaxed text-foreground/55">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                  {u}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-foreground/[0.08] bg-surface-elevated p-6 sm:p-8">
            <InquiryForm type="ai_automation" sourcePage="/ai-automation" defaultService={ai.title} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Bring us the hard part."
        text="The most useful AI conversations start with the process nobody wants to explain twice."
        primary="Book a consultation"
        secondary={{ label: "See related divisions", to: "/solutions" }}
      />
    </>
  );
}