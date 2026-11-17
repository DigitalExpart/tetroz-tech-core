import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";
import { industries } from "@/data/industries";

export default function Industries() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries" }]}
        eyebrow="Industries served"
        title="Different sectors. Different rules. Different systems."
        intro="Regulation, risk and operational reality change what good technology looks like. We start from how your sector actually works before proposing anything."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={Math.min(i * 0.03, 0.2)}>
                <Link
                  to={`/industries/${industry.slug}`}
                  className="prism-card group flex h-full flex-col rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02]"
                >
                  <span className="font-mono text-[0.55rem] tracking-[0.2em] text-foreground/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-4 text-[1rem] font-semibold leading-snug text-foreground">{industry.title}</h2>
                  <p className="mt-3 text-[0.84rem] leading-relaxed text-foreground/50">{industry.summary}</p>
                  <div className="mt-auto flex items-center gap-1 pt-6 text-[0.78rem] font-medium text-foreground/45 transition-colors group-hover:text-primary">
                    Sector detail
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 rounded-md border border-accent/20 bg-accent/[0.05] p-6 sm:p-8">
            <p className="label-mono mb-2 text-foreground/50">Important</p>
            <p className="max-w-3xl text-[0.85rem] leading-relaxed text-foreground/60">
              Tetroz Technologies Inc. is a technology company. We build software and systems for organizations in these
              sectors; we do not provide regulated financial, medical, legal or accounting services, and we do not claim
              professional licensure in any regulated field.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Your sector not listed?"
        text="If the problem is real and the constraints are clear, the sector label matters less than the work."
        primary="Talk to us"
        secondary={{ label: "See our divisions", to: "/solutions" }}
      />
    </>
  );
}