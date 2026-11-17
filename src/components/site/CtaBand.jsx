import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/site/Reveal";

export default function CtaBand({ title = "Let's build what's next.", text, primary, secondary }) {
  return (
    <section className="relative overflow-hidden border-t border-foreground/[0.08] bg-surface-alt">
      <div className="pointer-events-none absolute inset-0 aurora opacity-80" />
      <div className="pointer-events-none absolute inset-0 noise opacity-60" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="label-mono mb-6 text-primary/80">Next step</span>
          <h2 className="text-balance text-3xl font-semibold leading-[1.05] text-foreground sm:text-5xl">{title}</h2>
          <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-foreground/55">
            {text ||
              "Tell us what you are trying to build, change or understand. We will respond with a clear point of view and a practical next step."}
          </p>
          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-sm bg-primary px-7 text-[0.85rem] font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/contact">
                {primary || "Start a project"}
                <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-sm border-foreground/15 bg-transparent px-7 text-[0.85rem] font-medium text-foreground hover:bg-foreground/[0.05] hover:text-foreground"
            >
              <Link to={secondary?.to || "/solutions"}>{secondary?.label || "Explore our solutions"}</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}