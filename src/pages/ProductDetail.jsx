import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import NotFoundBlock from "@/components/site/NotFoundBlock";
import InquiryForm from "@/components/site/InquiryForm";
import { statusStyles } from "@/components/site/ProductCard";
import { base44 } from "@/api/base44Client";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    base44.entities.Product
      .filter({ slug }, { limit: 1 })
      .then((res) => {
        if (alive) setProduct(res.items?.[0] || null);
      })
      .catch(() => {
        if (alive) setProduct(null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) {
    return <div className="mx-auto max-w-[1400px] px-5 py-32 sm:px-8"><div className="h-64 animate-pulse rounded-md border border-foreground/[0.08] bg-foreground/[0.03]" /></div>;
  }

  if (!product) {
    return <NotFoundBlock title="That product isn't listed." text="It may have been renamed or is not yet published. The full catalogue is still available." />;
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: "Products", to: "/products" }, { label: product.name }]}
        eyebrow={product.category || "Tetroz product"}
        title={product.name}
        intro={product.tagline}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full border px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] ${statusStyles[product.status] || statusStyles.concept}`}>
            {product.status}
          </span>
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-foreground/35">
            {product.availability || "Roadmap item"}
          </span>
        </div>
      </PageHero>

      <section className="border-b border-foreground/[0.08] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div>
              <p className="text-[0.98rem] leading-relaxed text-foreground/65">{product.description}</p>

              {product.features?.length > 0 && (
                <div className="mt-10">
                  <p className="label-mono mb-4">Intended capability</p>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[0.86rem] leading-relaxed text-foreground/65">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-10 rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02]">
                <p className="label-mono mb-2">Availability & pricing</p>
                <p className="text-[0.88rem] leading-relaxed text-foreground/60">
                  {product.pricing_note ||
                    "Pricing is not published for this product while it remains in development. Register your interest and the team will share terms once they are confirmed."}
                </p>
              </div>

              <Link to="/products" className="mt-8 inline-flex items-center gap-2 text-[0.82rem] font-medium text-foreground/60 hover:text-primary">
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                Back to catalogue
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-md border border-foreground/[0.08] bg-surface-elevated p-6 sm:p-7">
              <p className="text-[0.92rem] font-medium text-foreground">Register interest</p>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-foreground/45">
                Early conversations shape what gets built first.
              </p>
              <div className="mt-6">
                <InquiryForm type="general" sourcePage={`/products/${product.slug}`} compact />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}