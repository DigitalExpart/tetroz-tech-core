import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const statusStyles = {
  concept: "border-foreground/15 text-foreground/60",
  research: "border-accent/40 text-accent bg-accent/10 dark:text-accent-foreground/90",
  development: "border-primary/35 text-primary bg-primary/[0.08]",
  beta: "border-primary/50 text-primary bg-primary/[0.12]",
  available: "border-emerald-600/35 text-emerald-700 bg-emerald-500/10 dark:border-[#8DFD00]/40 dark:text-[#c9ff7a] dark:bg-[#8DFD00]/[0.08]",
  discontinued: "border-foreground/15 text-foreground/35",
};

const accents = {
  cyan: "from-primary/25",
  violet: "from-accent/30",
  lime: "from-[#8DFD00]/20",
};

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="prism-card group flex h-full flex-col overflow-hidden rounded-md border border-foreground/[0.08] bg-card/80 dark:bg-white/[0.02]"
    >
      <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${accents[product.accent] || accents.cyan} to-transparent`}>
        <div className="absolute inset-0 grid-rules opacity-30" />
        <div className="absolute bottom-4 left-5 flex items-center gap-2">
          <span className={`rounded-full border px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] ${statusStyles[product.status] || statusStyles.concept}`}>
            {product.status}
          </span>
        </div>
        <div className="absolute right-5 top-5 h-9 w-9 rotate-45 rounded-sm border border-foreground/20" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="label-mono mb-2">{product.category || "Product"}</p>
          <h3 className="text-[1.05rem] font-semibold text-foreground">{product.name}</h3>
          <p className="mt-2.5 text-[0.85rem] leading-relaxed text-foreground/55">{product.tagline}</p>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-foreground/[0.08] pt-4">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-foreground/35">
            {product.availability || "Roadmap item"}
          </span>
          <ArrowUpRight className="h-4 w-4 text-foreground/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" strokeWidth={1.6} />
        </div>
      </div>
    </Link>
  );
}