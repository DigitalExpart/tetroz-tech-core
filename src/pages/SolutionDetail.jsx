import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import NotFoundBlock from "@/components/site/NotFoundBlock";
import InquiryForm from "@/components/site/InquiryForm";
import DivisionIcon from "@/components/site/DivisionIcon";
import { Button } from "@/components/ui/button";
import { divisions, divisionBySlug } from "@/data/divisions";

export default function SolutionDetail() {
  const { slug } = useParams();
  const division = divisionBySlug(slug);

  if (!division) {
    return <NotFoundBlock title="That division isn't here." text="The solution you were looking for may have been renamed. Browse the full set of Tetroz divisions instead." />;
  }

  const others = divisions.filter((d) => d.slug !== division.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions", to: "/solutions" }, { label: division.title.split(" — ")[0] }]}
        eyebrow={`Division ${division.code} · ${division.tagline}`}
        title={division.title}
        intro={division.short}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 rounded-sm bg-primary px-7 text-[0.85rem] font-semibold text-primary-foreground hover:bg-primary/90">
            <Link to="/contact">
              Discuss this division
              <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-sm border-foreground/15 bg-transparent px-7 text-[0.85rem] font-medium text-foreground hover:bg-foreground/[0.05] hover:text-foreground"
          >
            <Link to="/solutions">All solutions</Link>
          </Button>
        </div>
      </PageHero>

      <section className="border-b border-foreground/[0.08] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" />
                <span className="label-mono text-primary/80">Position</span>
              </div>
              {division.overview.map((p) => (
                <p key={p} className="mb-4 text-[0.98rem] leading-relaxed text-foreground/65">
                  {p}
                </p>
              ))}
              <div className="mt-8 rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02]">
                <p className="label-mono mb-4">What changes</p>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {division.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2.5 text-[0.85rem] text-foreground/65">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-md border border-foreground/[0.08] bg-surface-elevated p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/25 bg-primary/[0.07] text-primary">
                  <DivisionIcon name={division.icon} />
                </span>
                <p className="text-[0.9rem] font-medium text-foreground">Start an inquiry</p>
              </div>
              <div className="mt-6">
                <InquiryForm type="general" sourcePage={`/solutions/${division.slug}`} defaultService={division.title} compact />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-foreground/[0.08] py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-8 bg-primary/60" />
            <span className="label-mono text-primary/80">Capabilities</span>
          </div>
          <div className="grid gap-px overflow-hidden rounded-md border border-foreground/[0.08] bg-foreground/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {division.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={Math.min(i * 0.04, 0.2)}>
                <div className="h-full bg-background p-6">
                  <span className="font-mono text-[0.55rem] tracking-[0.2em] text-primary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[0.95rem] font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2.5 text-[0.83rem] leading-relaxed text-foreground/55">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-8 bg-primary/60" />
            <span className="label-mono text-primary/80">Where this starts in practice</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {division.useCases.map((u) => (
              <Reveal key={u}>
                <div className="rounded-md border border-foreground/[0.08] bg-card/80 p-6 text-[0.88rem] leading-relaxed text-foreground/65 dark:bg-white/[0.02]">
                  {u}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 border-t border-foreground/[0.08] pt-10">
            <p className="label-mono mb-6">Related divisions</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to={`/solutions/${o.slug}`}
                  className="group flex items-center justify-between rounded-md border border-foreground/[0.08] bg-card/80 p-5 transition-colors hover:border-primary/35 dark:bg-white/[0.02]"
                >
                  <span className="text-[0.85rem] font-medium text-foreground/75 group-hover:text-foreground">
                    {o.title.split(" — ")[0]}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-foreground/30 group-hover:text-primary" strokeWidth={1.6} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}