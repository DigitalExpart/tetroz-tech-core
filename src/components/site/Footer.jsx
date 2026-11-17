import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import Logo from "@/components/site/Logo";
import { divisions } from "@/data/divisions";
import { legalPages } from "@/data/legal";

const columns = [
  {
    title: "Solutions",
    links: divisions.slice(0, 5).map((d) => ({ label: d.title.split(" — ")[0], to: `/solutions/${d.slug}` })),
    tail: { label: "All solutions", to: "/solutions" },
  },
  {
    title: "Company",
    links: [
      { label: "About Tetroz", to: "/about" },
      { label: "Tetroz Labs", to: "/research" },
      { label: "Partnerships", to: "/partnerships" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Products", to: "/products" },
      { label: "AI & Automation", to: "/ai-automation" },
      { label: "Industries", to: "/industries" },
      { label: "Resource library", to: "/resources" },
    ],
  },
  {
    title: "Legal",
    links: legalPages.slice(0, 5).map((p) => ({ label: p.title, to: `/legal/${p.slug}` })),
    tail: { label: "All policies", to: "/legal/accessibility" },
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-foreground/[0.08] bg-surface-footer">
      <div className="pointer-events-none absolute inset-0 aurora opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2.6fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-[0.9rem] leading-relaxed text-foreground/55">
              A technology and innovation company building intelligent digital solutions, software platforms and
              connected business ecosystems.
            </p>
            <div className="mt-7 flex items-start gap-2 text-[0.82rem] text-foreground/45">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" strokeWidth={1.6} />
              <span>
                Tetroz Technologies Inc.
                <br />
                Regina, Saskatchewan, Canada
              </span>
            </div>
            <p className="mt-4 max-w-xs font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.14em] text-foreground/25">
              Business email and phone will be published once officially confirmed.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="label-mono mb-4">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-[0.82rem] leading-snug text-foreground/55 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {col.tail && (
                    <li>
                      <Link
                        to={col.tail.to}
                        className="inline-flex items-center gap-1 text-[0.82rem] text-foreground/80 transition-colors hover:text-primary"
                      >
                        {col.tail.label}
                        <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-foreground/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-foreground/30">
            © {year} Tetroz Technologies Inc. All rights reserved.
          </p>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-foreground/30">
            Technology. Evolution. Transformation. Research. Optimization. Zenith.
          </p>
        </div>
      </div>
    </footer>
  );
}