import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import MarketplaceCard from "@/components/marketplace/MarketplaceCard";
import CtaBand from "@/components/site/CtaBand";
import {
  marketplaceCategories,
  marketplaceListings,
  marketplaceSorts,
} from "@/data/marketplace";

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const category = marketplaceCategories.some((c) => c.slug === categoryParam) ? categoryParam : "all";
  const setCategory = (slug) => setSearchParams(slug === "all" ? {} : { category: slug }, { replace: true });
  const [sort, setSort] = useState("newest");

  const items = useMemo(() => {
    const filtered =
      category === "all"
        ? marketplaceListings
        : marketplaceListings.filter((item) => item.category === category);

    const sorted = [...filtered];
    if (sort === "popular") sorted.sort((a, b) => b.downloads - a.downloads);
    else if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else sorted.sort((a, b) => new Date(b.released) - new Date(a.released));
    return sorted;
  }, [category, sort]);

  return (
    <>
      <PageHero
        eyebrow="Marketplace"
        crumbs={[{ label: "Marketplace" }]}
        title="Discover premium digital products from top creators"
        intro="Ebooks, templates, AI tools, courses, automations and prompt libraries — reviewed and listed by Tetroz for people building serious work."
      />

      <section className="relative border-b border-foreground/[0.08] bg-background">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16">
          <div className="flex flex-col gap-5 border-b border-foreground/[0.08] pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {marketplaceCategories.map((c) => {
                const active = category === c.slug;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => setCategory(c.slug)}
                    aria-pressed={active}
                    className={`rounded-sm border px-3.5 py-2 text-[0.78rem] font-medium tracking-tight transition-colors ${
                      active
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-foreground/15 text-foreground/60 hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="label-mono">Sort</span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort products"
                  className="h-10 appearance-none rounded-sm border border-foreground/15 bg-transparent pl-3.5 pr-9 text-[0.8rem] font-medium tracking-tight text-foreground/80 transition-colors hover:border-foreground/30 focus:border-primary/60 focus:outline-none"
                >
                  {marketplaceSorts.map((s) => (
                    <option key={s.value} value={s.value} className="bg-surface-elevated text-foreground">
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/40"
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </div>

          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-foreground/35">
            {items.length} {items.length === 1 ? "product" : "products"}
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <MarketplaceCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Built something worth listing?"
        text="We list a small number of creator products at a time. Tell us what you have made and who it is for."
        primary="Talk to our team"
        secondary={{ label: "See partnerships", to: "/partnerships" }}
      />
    </>
  );
}