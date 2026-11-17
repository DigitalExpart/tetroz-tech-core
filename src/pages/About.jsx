import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import CtaBand from "@/components/site/CtaBand";
import { Image } from "@/components/ui/image";
import { brandAcronym, principles, whyTetroz } from "@/data/site";

const ABOUT_IMAGE =
  "https://media.base44.com/images/public/6ae9827d6a5b5a073b32b018/fdab5807f_generated_04f38a9d.png";

export default function About() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About Tetroz" }]}
        eyebrow="About the company"
        title={<>A technology company built to own what it makes.</>}
        intro="Tetroz Technologies Inc. is a Canadian technology company developing software, artificial intelligence products, digital platforms and automation systems — for clients today, and as its own products over time."
      />

      <section className="border-b border-foreground/[0.08] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <Reveal>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" />
                <span className="label-mono text-primary/80">Mission</span>
              </div>
              <h2 className="text-balance text-3xl font-semibold leading-[1.08] text-foreground sm:text-4xl">
                Develop intelligent technology that solves real problems — and build it to last.
              </h2>
              <p className="mt-6 text-[0.96rem] leading-relaxed text-foreground/55">
                Our mission is to develop intelligent technologies, innovative digital solutions and interconnected
                platforms that help individuals, businesses and organizations solve complex problems, operate more
                efficiently and achieve sustainable growth.
              </p>
              <p className="mt-4 text-[0.96rem] leading-relaxed text-foreground/55">
                Our vision is to become a globally recognized technology company that creates, owns and operates
                innovative products and platforms across multiple industries — starting from Regina, Saskatchewan, and
                building to an international standard.
              </p>
              <Link
                to="/partnerships"
                className="group mt-8 inline-flex items-center gap-2 text-[0.85rem] font-medium text-primary hover:text-primary/80"
              >
                Partnership and collaboration
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-md border border-foreground/10">
              <Image src={ABOUT_IMAGE} alt="A modern research and engineering facility interior" className="h-[320px] w-full sm:h-[400px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-[#00f5ff]/85">Headquarters</p>
                  <p className="mt-1 text-[0.9rem] font-medium text-white">Regina, Saskatchewan, Canada</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-foreground/[0.08] py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="The name"
            title="Six letters, one operating standard."
            intro="TETROZ is an acronym for the disciplines the company is built on. It is also the standard every engagement is measured against."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-foreground/[0.08] bg-foreground/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {brandAcronym.map((item, i) => (
              <Reveal key={`${item.word}-${i}`} delay={Math.min(i * 0.04, 0.2)}>
                <div className="h-full bg-background p-6 sm:p-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading text-3xl font-semibold text-prism">{item.letter}</span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/45">
                      {item.word}
                    </span>
                  </div>
                  <p className="mt-4 text-[0.85rem] leading-relaxed text-foreground/55">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/[0.08] bg-surface-alt py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="How we work"
            title="Principles we actually hold to."
            intro="These are not values on a wall. They decide what we say yes to, what we refuse, and how we describe the state of a product."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i * 0.04, 0.2)}>
                <div className="h-full rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02]">
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] text-primary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[0.98rem] font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2.5 text-[0.83rem] leading-relaxed text-foreground/55">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-px overflow-hidden rounded-md border border-foreground/[0.08] bg-foreground/[0.07] sm:grid-cols-2">
            {whyTetroz.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i * 0.05, 0.2)}>
                <div className="h-full bg-background p-7 sm:p-9">
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

      <CtaBand title="Want the long version?" text="Ask for the company overview. We will send a short, honest summary of what Tetroz does today and what it is building next." primary="Request company overview" />
    </>
  );
}