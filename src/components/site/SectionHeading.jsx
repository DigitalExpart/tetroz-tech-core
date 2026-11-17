import React from "react";
import Reveal from "@/components/site/Reveal";

export default function SectionHeading({ eyebrow, title, intro, align = "left", className = "" }) {
  const alignment = align === "center" ? "mx-auto items-center text-center" : "items-start";
  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-primary/60" />
          <span className="label-mono text-primary/80">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-balance text-3xl font-semibold leading-[1.08] text-foreground sm:text-4xl lg:text-[2.9rem]">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-foreground/55">{intro}</p>}
    </Reveal>
  );
}