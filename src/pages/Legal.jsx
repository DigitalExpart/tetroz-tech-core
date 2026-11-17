import React from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "@/components/site/PageHero";
import NotFoundBlock from "@/components/site/NotFoundBlock";
import { legalPages, legalBySlug } from "@/data/legal";

export default function Legal() {
  const { slug } = useParams();
  const page = legalBySlug(slug);

  if (!page) {
    return <NotFoundBlock title="That policy page isn't here." text="All current policies are listed in the legal index." />;
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: "Legal", to: `/legal/${legalPages[0].slug}` }, { label: page.title }]}
        eyebrow={page.updated}
        title={page.title}
        intro="This is a working draft prepared for review by Canadian legal counsel. It is published for transparency and is not legal advice."
      />

      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.6fr_1.4fr]">
          <aside>
            <p className="label-mono mb-4">Policies</p>
            <ul className="space-y-1.5">
              {legalPages.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/legal/${p.slug}`}
                    className={`block rounded-sm px-3 py-2 text-[0.82rem] transition-colors ${
                      p.slug === page.slug
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/55 hover:bg-foreground/[0.04] hover:text-foreground/85"
                    }`}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <article className="max-w-2xl">
            {page.sections.map((s) => (
              <div key={s.heading} className="mb-9">
                <h2 className="text-[1.05rem] font-semibold text-foreground">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-3 text-[0.92rem] leading-[1.75] text-foreground/60">
                    {p}
                  </p>
                ))}
              </div>
            ))}
            <div className="mt-10 rounded-md border border-accent/20 bg-accent/[0.05] p-6">
              <p className="label-mono mb-2 text-foreground/50">Status</p>
              <p className="text-[0.84rem] leading-relaxed text-foreground/60">
                Draft content. Nothing here is a claim of legal compliance, certification or regulatory approval. Final
                wording will be confirmed with Canadian counsel before publication. Questions can be sent through the{" "}
                <Link to="/contact" className="text-primary hover:text-primary/80">
                  contact form
                </Link>
                .
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}