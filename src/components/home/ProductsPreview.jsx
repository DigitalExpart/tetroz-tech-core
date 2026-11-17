import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import ProductCard from "@/components/site/ProductCard";

export default function ProductsPreview({ products = [] }) {
  return (
    <section className="border-t border-foreground/[0.08] py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Products & platforms"
            title="A portfolio in deliberate stages."
            intro="Tetroz is building its own products. Each one is labelled by where it genuinely stands, from concept through to available."
          />
          <Reveal delay={0.08}>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 text-[0.82rem] font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              View the catalogue
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
            </Link>
          </Reveal>
        </div>

        {products.length > 0 ? (
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 0.05, 0.2)}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-10 rounded-md border border-foreground/[0.08] p-6 text-[0.86rem] text-foreground/50">
            The product catalogue is being prepared. Inquiries about forthcoming products are welcome.
          </p>
        )}
      </div>
    </section>
  );
}