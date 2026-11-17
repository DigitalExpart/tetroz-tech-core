import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";
import { divisions } from "@/data/divisions";

const LABS_IMAGE =
  "https://media.base44.com/images/public/6ae9827d6a5b5a073b32b018/ad65e2a3c_generated_83e500eb.png";

const ai = divisions[0];

export default function AiBand() {
  return (
    <section className="relative overflow-hidden border-t border-foreground/[0.08] bg-surface-alt">
      <div className="pointer-events-none absolute inset-0 aurora opacity-60" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-md border border-foreground/10">
              <Image src={LABS_IMAGE} alt="Macro view of engineered hardware surfaces" className="h-[340px] w-full sm:h-[420px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-[#00f5ff]/85">Applied research</p>
                  <p className="mt-1 text-[0.9rem] font-medium text-white">Evaluated before it ships.</p>
                </div>
                <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/75">
                  Tetroz Labs
                </span>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" />
                <span className="label-mono text-primary/80">AI & automation</span>
              </div>
              <h2 className="text-balance text-3xl font-semibold leading-[1.05] text-foreground sm:text-4xl lg:text-[2.9rem]">
                Intelligence that is <span className="text-prism">engineered</span>, not announced.
              </h2>
              <p className="mt-5 text-[0.96rem] leading-relaxed text-foreground/55">
                Most AI projects fail on evaluation, not on model choice. We define what a good answer looks like,
                measure it, and only then put the system in front of real work.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-3">
                {ai.capabilities.slice(0, 5).map((c) => (
                  <li key={c.title} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                    <span className="text-[0.88rem] leading-relaxed text-foreground/70">
                      <span className="font-medium text-foreground">{c.title}</span> — {c.text}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <Link
                to="/ai-automation"
                className="group mt-9 inline-flex items-center gap-2 text-[0.85rem] font-medium text-primary transition-colors hover:text-primary/80"
              >
                Explore AI & automation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}