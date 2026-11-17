import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { labsProjects } from "@/data/site";

const ABOUT_IMAGE =
  "https://media.base44.com/images/public/6ae9827d6a5b5a073b32b018/fdab5807f_generated_04f38a9d.png";

export default function LabsSection() {
  return (
    <section className="border-t border-foreground/[0.08] py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Research & innovation"
            title="Tetroz Labs"
            intro="Where ideas are tested before they become commitments. Every item below is labelled by maturity, because a concept is not a product."
          />
          <Reveal delay={0.08}>
            <Link
              to="/research"
              className="group inline-flex items-center gap-2 text-[0.82rem] font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              Inside the labs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-md border border-foreground/10">
              <Image src={ABOUT_IMAGE} alt="Interior of a modern research facility" className="h-full w-full" fittingType="fill" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-[#00f5ff]/85">Research directive</p>
                <p className="mt-2 max-w-sm text-[0.92rem] leading-relaxed text-white/90">
                  Evaluate emerging technology against real problems, publish what we learn, and build only what earns
                  its place.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {labsProjects.map((p, i) => (
              <Reveal key={p.name} delay={Math.min(i * 0.05, 0.2)}>
                <article className="flex h-full flex-col rounded-md border border-foreground/[0.08] bg-card/80 p-5 dark:bg-white/[0.02]">
                  <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-foreground/75">
                    {p.stage}
                  </span>
                  <h3 className="mt-4 text-[0.95rem] font-semibold text-foreground">{p.name}</h3>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-foreground/55">{p.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}