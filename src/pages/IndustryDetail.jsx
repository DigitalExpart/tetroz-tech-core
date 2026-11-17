import React from "react";
import { useParams } from "react-router-dom";
import { Check } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import NotFoundBlock from "@/components/site/NotFoundBlock";
import InquiryForm from "@/components/site/InquiryForm";
import { industryBySlug } from "@/data/industries";

export default function IndustryDetail() {
  const { slug } = useParams();
  const industry = industryBySlug(slug);

  if (!industry) {
    return <NotFoundBlock title="That sector page isn't here." text="Browse the full list of industries Tetroz works with instead." />;
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries", to: "/industries" }, { label: industry.title }]}
        eyebrow="Industry focus"
        title={industry.title}
        intro={industry.summary}
      />

      <section className="border-b border-foreground/[0.08] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <div className="rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02] sm:p-7">
                <p className="label-mono mb-4">Common challenges</p>
                <ul className="space-y-3">
                  {industry.challenges.map((c) => (
                    <li key={c} className="flex gap-2.5 text-[0.87rem] leading-relaxed text-foreground/60">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-destructive/70" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-4 rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02] sm:p-7">
                <p className="label-mono mb-4">Business benefits</p>
                <ul className="grid gap-2.5">
                  {industry.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[0.86rem] text-foreground/65">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" />
                <span className="label-mono text-primary/80">Potential applications</span>
              </div>
              <div className="space-y-3">
                {industry.applications.map((a, i) => (
                  <div key={a} className="flex gap-4 rounded-md border border-foreground/[0.08] bg-card/80 p-5 dark:bg-white/[0.02]">
                    <span className="font-mono text-[0.58rem] tracking-[0.16em] text-primary/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[0.87rem] leading-relaxed text-foreground/60">{a}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-lg text-[0.8rem] leading-relaxed text-foreground/40">
                Applications are described as potential work, not as delivered engagements. Nothing on this page should
                be read as a claim of prior client experience in this sector.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="label-mono text-primary/80">Engage Tetroz</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground">
              Start with the constraint that matters most.
            </h2>
            <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-foreground/55">
              Describe the operating problem in this sector. We will respond with a point of view on what technology can
              and cannot change about it.
            </p>
          </div>
          <div className="rounded-md border border-foreground/[0.08] bg-surface-elevated p-6 sm:p-8">
            <InquiryForm type="general" sourcePage={`/industries/${industry.slug}`} compact />
          </div>
        </div>
      </section>
    </>
  );
}