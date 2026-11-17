import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import NewsletterForm from "@/components/site/NewsletterForm";
import { base44 } from "@/api/base44Client";

const categories = [
  { value: "all", label: "All" },
  { value: "ai", label: "AI" },
  { value: "engineering", label: "Engineering" },
  { value: "data", label: "Data" },
  { value: "transformation", label: "Transformation" },
  { value: "research", label: "Research" },
  { value: "company", label: "Company" },
];

export default function Resources() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const filter = categories.some((c) => c.value === categoryParam) ? categoryParam : "all";
  const setFilter = (value) => setSearchParams(value === "all" ? {} : { category: value }, { replace: true });

  useEffect(() => {
    let alive = true;
    base44.entities.Article
      .filter({ status: "published" }, { sort: "-published_date", limit: 40 })
      .then((res) => {
        if (alive) setArticles(res.items || []);
      })
      .catch(() => {
        if (alive) setArticles([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const visible = filter === "all" ? articles : articles.filter((a) => a.category === filter);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Resources" }]}
        eyebrow="Resource library"
        title="Technical thinking, published plainly."
        intro="Applied AI findings, engineering notes, data practice and transformation perspective — written by the people doing the work, not by a marketing team."
      />

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-wrap gap-2 border-b border-foreground/[0.08] pb-6">
            {categories.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setFilter(c.value)}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] transition-colors ${
                  filter === c.value
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-foreground/15 text-foreground/55 hover:border-foreground/30 hover:text-foreground/80"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="mt-10 space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-28 animate-pulse rounded-md border border-foreground/[0.08] bg-foreground/[0.03]" />
              ))}
            </div>
          ) : visible.length > 0 ? (
            <div className="mt-8">
              {visible.map((a, i) => (
                <Reveal key={a.id} delay={Math.min(i * 0.03, 0.15)}>
                  <Link
                    to={`/resources/${a.slug}`}
                    className="group flex flex-col gap-4 border-b border-foreground/[0.08] py-7 transition-colors hover:border-primary/30 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-primary/70">
                        {a.category}
                        <span className="text-foreground/20">·</span>
                        <span className="text-foreground/40">{a.read_minutes || 5} min read</span>
                        {a.published_date && (
                          <>
                            <span className="text-foreground/20">·</span>
                            <span className="text-foreground/40">{a.published_date}</span>
                          </>
                        )}
                      </div>
                      <h2 className="mt-3 text-[1.1rem] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-[1.25rem]">
                        {a.title}
                      </h2>
                      <p className="mt-2 text-[0.85rem] leading-relaxed text-foreground/55">{a.excerpt}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-foreground/30 transition-all group-hover:-translate-y-0.5 group-hover:text-primary" strokeWidth={1.5} />
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-md border border-foreground/[0.08] bg-card/80 p-8 dark:bg-white/[0.02]">
              <p className="text-[0.9rem] text-foreground/60">
                Nothing published in this category yet. The first articles are in preparation.
              </p>
            </div>
          )}

          <div className="mt-16 grid gap-8 rounded-md border border-foreground/[0.08] bg-card/80 p-7 dark:bg-white/[0.02] sm:p-9 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="label-mono text-primary/80">Tetroz signal</p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-foreground">
                Get new research and product notes.
              </h2>
              <p className="mt-3 max-w-md text-[0.87rem] leading-relaxed text-foreground/50">
                Occasional email only. No sequences, no drip campaigns, no synthetic urgency.
              </p>
            </div>
            <NewsletterForm source="resources" />
          </div>
        </div>
      </section>
    </>
  );
}