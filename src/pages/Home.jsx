import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import Hero from "@/components/home/Hero";
import EcosystemSection from "@/components/home/EcosystemSection";
import AiBand from "@/components/home/AiBand";
import BuildSection from "@/components/home/BuildSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import LabsSection from "@/components/home/LabsSection";
import ProductsPreview from "@/components/home/ProductsPreview";
import WhySection from "@/components/home/WhySection";
import InsightsPreview from "@/components/home/InsightsPreview";
import NewsletterBand from "@/components/home/NewsletterBand";
import CtaBand from "@/components/site/CtaBand";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      const [p, a] = await Promise.all([
        base44.entities.Product.filter({}, { sort: "order_index", limit: 3 }).catch(() => ({ items: [] })),
        base44.entities.Article.filter({ status: "published" }, { sort: "-published_date", limit: 3 }).catch(() => ({ items: [] })),
      ]);
      if (!alive) return;
      setProducts(p?.items || []);
      setArticles(a?.items || []);
    };
    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <Hero />
      <EcosystemSection />
      <AiBand />
      <BuildSection />
      <IndustriesSection />
      <LabsSection />
      <ProductsPreview products={products} />
      <WhySection />
      <InsightsPreview articles={articles} />
      <NewsletterBand />
      <CtaBand />
    </>
  );
}