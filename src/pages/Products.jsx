import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import ProductCard from "@/components/site/ProductCard";
import Reveal from "@/components/site/Reveal";
import { base44 } from "@/api/base44Client";

const filters = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "beta", label: "Beta" },
  { value: "development", label: "In development" },
  { value: "research", label: "Research" },
  { value: "concept", label: "Concept" },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const stageParam = searchParams.get("stage") || "all";
  const filter = filters.some((f) => f.value === stageParam) ? stageParam : "all";
  const setFilter = (value) => setSearchParams(value === "all" ? {} : { stage: value }, { replace: true });

  useEffect(() => {
    let alive = true;
    base44.entities.Product
      .filter({}, { sort: "order_index", limit: 60 })
      .then((res) => {
        if (alive) setProducts(res.items || []);
      })
      .catch(() => {
        if (alive) setProducts([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const visible = filter === "all" ? products : products.filter((p) => p.status === filter);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Products" }]}
        eyebrow="Product catalogue"
        title="A product portfolio in honest stages."
        intro="Tetroz builds and owns its own software. Every item below carries its real maturity — concept, research, development, beta or available. Nothing here is dressed up as shipped when it is not."
      />

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-wrap gap-2 border-b border-foreground/[0.08] pb-6">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] transition-colors ${
                  filter === f.value
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-foreground/15 text-foreground/55 hover:border-foreground/30 hover:text-foreground/80"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-72 animate-pulse rounded-md border border-foreground/[0.08] bg-foreground/[0.03]" />
              ))}
            </div>
          ) : visible.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i * 0.04, 0.2)}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-md border border-foreground/[0.08] bg-card/80 p-8 dark:bg-white/[0.02]">
              <p className="text-[0.9rem] text-foreground/60">
                Nothing in this stage yet. The catalogue is being built deliberately — concepts become products only
                when they are ready to be used.
              </p>
            </div>
          )}

          <div className="mt-14 grid gap-4 rounded-md border border-foreground/[0.08] bg-card/80 p-7 dark:bg-white/[0.02] sm:grid-cols-3 sm:p-9">
            {[
              { title: "Product architecture", text: "Accounts, roles, billing hooks and usage limits are designed before a product ships." },
              { title: "Documentation first", text: "Every available product carries documentation and support information." },
              { title: "No simulated software", text: "Where a module is a demonstration, it is labelled as one — never presented as live." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-[0.9rem] font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-foreground/50">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want early access to something in development?"
        text="Tell us which product matters to you and what you would use it for. Early conversations shape what gets built."
        primary="Register interest"
        secondary={{ label: "See our platform work", to: "/solutions/platforms-and-marketplaces" }}
      />
    </>
  );
}