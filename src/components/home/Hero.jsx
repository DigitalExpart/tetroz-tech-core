import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";

const HERO_IMAGE =
  "https://media.base44.com/images/public/6ae9827d6a5b5a073b32b018/9cf2c70a5_generated_4b2d0023.png";
const LOGO_IMAGE =
  "https://media.base44.com/images/public/user_6a2a5525b4cba28c175d7eca/4119c7dd6_Tetroz_Logo_5.png";

const pillars = ["Applied AI", "Software & SaaS", "Cloud & Security", "Data & Platforms"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-alt">
      <div className="absolute inset-0">
        <Image src={HERO_IMAGE} alt="" className="h-full w-full opacity-15 transition-opacity duration-500 dark:opacity-100" fittingType="fill" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-alt via-surface-alt/90 to-surface-alt/50 dark:from-[#08080a] dark:via-[#08080a]/92 dark:to-[#08080a]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-alt via-transparent to-surface-alt/70 dark:from-[#08080a] dark:via-transparent dark:to-[#08080a]/70" />
      </div>
      <div className="pointer-events-none absolute inset-0 aurora opacity-70 dark:opacity-0" />
      <div className="pointer-events-none absolute inset-0 grid-rules opacity-30" />

      <div className="relative mx-auto flex min-h-[86vh] max-w-[1400px] flex-col justify-center px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.45fr_1fr]">
          <div>
            <Reveal>
              <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-foreground/15 bg-card/70 px-3.5 py-1.5 dark:bg-white/[0.03]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/60">
                  Tetroz Technologies Inc. · Regina, Canada
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-balance text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-[4.6rem]">
                Technology That{" "}
                <span className="text-prism">Moves Possibility</span> Forward.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-[0.98rem] leading-relaxed text-foreground/60 sm:text-[1.06rem]">
                Tetroz builds intelligent software, AI-powered solutions and connected digital platforms that transform
                ideas into meaningful technology and business opportunities.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 rounded-sm bg-primary px-7 text-[0.85rem] font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/solutions">
                    Explore our solutions
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-sm border-foreground/15 bg-transparent px-7 text-[0.85rem] font-medium text-foreground hover:bg-foreground/[0.05] hover:text-foreground"
                >
                  <Link to="/about">Discover Tetroz</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-foreground/[0.08] pt-6">
                {pillars.map((p) => (
                  <span key={p} className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-foreground/45">
                    {p}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="hidden lg:block">
            <div className="animate-drift relative">
              <div className="absolute -inset-6 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-md border border-foreground/10 glass p-6">
                <div className="flex items-center justify-between">
                  <span className="label-mono">Brand system</span>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-foreground/35">
                    Est. Regina
                  </span>
                </div>
                <div className="mt-5 overflow-hidden rounded-sm border border-foreground/10 bg-[#0a0a0d]">
                  <Image
                    src={LOGO_IMAGE}
                    alt="Tetroz Technologies Inc. brand mark"
                    className="h-auto w-full"
                    fittingType="fit"
                  />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    { label: "Divisions", value: "08" },
                    { label: "Industries", value: "10" },
                    { label: "Labs track", value: "Live" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-sm border border-foreground/[0.08] bg-card/70 px-3 py-2.5 dark:bg-white/[0.02]">
                      <p className="font-heading text-[1.05rem] font-semibold text-foreground">{s.value}</p>
                      <p className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-foreground/40">{s.label}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/research"
                  className="mt-4 flex items-center justify-between rounded-sm border border-foreground/[0.08] px-3.5 py-2.5 text-[0.75rem] text-foreground/60 transition-colors hover:border-primary/35 hover:text-foreground"
                >
                  Inside Tetroz Labs
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}