import React, { useEffect, useState } from "react";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import ApplicationForm from "@/components/careers/ApplicationForm";
import { base44 } from "@/api/base44Client";
import { futureDepartments } from "@/data/site";

const culture = [
  {
    title: "Small team, real ownership",
    text: "Work is scoped so one person can own it end to end. That means responsibility, not just tasks.",
  },
  {
    title: "Write it down",
    text: "Decisions live in writing. If a choice cannot be explained clearly, it is not finished.",
  },
  {
    title: "Craft over velocity theatre",
    text: "Shipping matters. Shipping something nobody has to rewrite matters more.",
  },
  {
    title: "Honest about limits",
    text: "We say what we do not know, what is not built, and what would need to change before it is.",
  },
];

export default function Careers() {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    base44.entities.JobOpening
      .filter({ status: "open" }, { sort: "-created_date", limit: 20 })
      .then((res) => {
        if (alive) setOpenings(res.items || []);
      })
      .catch(() => {
        if (alive) setOpenings([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Careers" }]}
        eyebrow="Careers at Tetroz"
        title={<>Help build a technology company from the foundation up.</>}
        intro="Tetroz is at the earliest and most interesting stage: standards are being set now, and the people who join early define them. We hire for judgement, craft and honesty."
      />

      <section className="border-b border-foreground/[0.08] py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading eyebrow="How we work" title="What you would be joining." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {culture.map((c, i) => (
              <Reveal key={c.title} delay={Math.min(i * 0.05, 0.2)}>
                <div className="h-full rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02]">
                  <span className="font-mono text-[0.55rem] tracking-[0.2em] text-primary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[0.96rem] font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2.5 text-[0.83rem] leading-relaxed text-foreground/55">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/[0.08] bg-surface-alt py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Current opportunities" title="Open positions." />
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-foreground/40">
              {loading ? "Checking…" : `${openings.length} open`}
            </p>
          </div>

          <div className="mt-10">
            {loading ? (
              <div className="h-28 animate-pulse rounded-md border border-foreground/[0.08] bg-foreground/[0.03]" />
            ) : openings.length > 0 ? (
              <div className="space-y-3">
                {openings.map((o) => (
                  <div key={o.id} className="rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02]">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-foreground/45">
                      <span className="text-primary/70">{o.department}</span>
                      <span className="text-foreground/20">·</span>
                      <span>{o.location}</span>
                      <span className="text-foreground/20">·</span>
                      <span>{String(o.work_type || "").replace("_", " ")}</span>
                    </div>
                    <h3 className="mt-3 text-[1.05rem] font-semibold text-foreground">{o.title}</h3>
                    <p className="mt-2 max-w-2xl text-[0.86rem] leading-relaxed text-foreground/55">{o.description}</p>
                    {o.responsibilities?.length > 0 && (
                      <ul className="mt-4 grid gap-1.5">
                        {o.responsibilities.map((r) => (
                          <li key={r} className="flex gap-2 text-[0.82rem] text-foreground/55">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}
                    <a
                      href="#apply"
                      className="mt-5 inline-flex items-center gap-2 text-[0.8rem] font-medium text-primary hover:text-primary/80"
                    >
                      Apply for this role
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-foreground/[0.08] bg-card/80 p-7 dark:bg-white/[0.02] sm:p-9">
                <p className="text-[0.95rem] font-medium text-foreground">No positions are open right now.</p>
                <p className="mt-2 max-w-xl text-[0.86rem] leading-relaxed text-foreground/55">
                  That is the honest status. Tetroz is not currently advertising roles. If you want to be considered when
                  the next position opens, send an introduction below — genuine applications are kept and read.
                </p>
              </div>
            )}
          </div>

          <div className="mt-12">
            <p className="label-mono mb-4">Departments we expect to build</p>
            <div className="flex flex-wrap gap-2">
              {futureDepartments.map((d) => (
                <span key={d} className="rounded-full border border-foreground/[0.09] px-3 py-1.5 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-foreground/45">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Apply"
              title="Introduce yourself."
              intro="No cover-letter theatre required. Tell us what you have built, what you want to build, and where you are strongest."
            />
          </div>
          <div className="rounded-md border border-foreground/[0.08] bg-surface-elevated p-6 sm:p-8">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}