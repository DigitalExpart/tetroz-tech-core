import React from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { categoryMeta } from "@/data/marketplace";

export default function MarketplaceCard({ item }) {
  const meta = categoryMeta[item.category];
  const Icon = meta.icon;

  return (
    <article className="prism-card group flex flex-col overflow-hidden rounded-sm border border-foreground/[0.08] bg-card/85 dark:bg-card/50">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0b]">
        <div className={cn("absolute inset-0 bg-gradient-to-br", meta.cover)} />
        <div className="absolute inset-0 grid-rules-light opacity-60" />
        <Icon
          className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-white/80 transition-transform duration-500 group-hover:scale-110"
          strokeWidth={1.2}
        />
        <span className="absolute left-3 top-3 rounded-sm border border-white/15 bg-black/50 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/85 backdrop-blur">
          {meta.label}
        </span>
        <span className="absolute right-3 top-3 rounded-sm bg-primary px-2 py-1 font-mono text-[0.62rem] font-semibold tracking-tight text-primary-foreground">
          ${item.price}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.02rem] font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
          {item.title}
        </h3>
        <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-foreground/40">
          by {item.creator}
        </p>
        <p className="mb-5 mt-3 text-[0.85rem] leading-relaxed text-foreground/55">{item.tagline}</p>
        <div className="mt-auto flex items-center justify-between border-t border-foreground/[0.08] pt-4">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-foreground/40">
            {item.format}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-foreground/40">
            <Download className="h-3 w-3" strokeWidth={1.6} />
            {item.downloads.toLocaleString()}
          </span>
        </div>
      </div>
    </article>
  );
}