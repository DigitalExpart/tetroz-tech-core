import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import DivisionIcon from "@/components/site/DivisionIcon";

export default function DivisionCard({ division }) {
  return (
    <Link
      to={`/solutions/${division.slug}`}
      className="prism-card group relative flex flex-col justify-between overflow-hidden rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02] sm:p-7"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div>
        <div className="flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-sm border border-foreground/10 bg-foreground/[0.03] text-primary">
            <DivisionIcon name={division.icon} />
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-foreground/30">{division.code}</span>
        </div>
        <h3 className="mt-6 text-[1.05rem] font-semibold leading-snug text-foreground">{division.title}</h3>
        <p className="mt-3 text-[0.85rem] leading-relaxed text-foreground/55">{division.short}</p>
      </div>
      <div className="mt-7 flex items-center justify-between border-t border-foreground/[0.08] pt-4">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-foreground/35">{division.tagline}</span>
        <ArrowUpRight className="h-4 w-4 text-foreground/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" strokeWidth={1.6} />
      </div>
    </Link>
  );
}