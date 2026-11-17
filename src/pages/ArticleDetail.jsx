import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import NotFoundBlock from "@/components/site/NotFoundBlock";
import NewsletterForm from "@/components/site/NewsletterForm";
import { base44 } from "@/api/base44Client";

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    base44.entities.Article
      .filter({ slug, status: "published" }, { limit: 1 })
      .then(async (res) => {
        const found = res.items?.[0] || null;
        if (!alive) return;
        setArticle(found);
        if (found) {
          const more = await base44.entities.Article
            .filter({ status: "published", category: found.category }, { limit: 3 })
            .catch(() => ({ items: [] }));
          if (alive) setRelated((more.items || []).filter((a) => a.id !== found.id).slice(0, 2));
        }
      })
      .catch(() => {
        if (alive) setArticle(null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1400px] px-5 py-32 sm:px-8">
        <div className="h-64 animate-pulse rounded-md border border-foreground/[0.08] bg-foreground/[0.03]" />
      </div>
    );
  }

  if (!article) {
    return <NotFoundBlock title="That article isn't available." text="It may have been unpublished or the link is out of date. The resource library is still open." />;
  }

  const paragraphs = (article.body || "").split(/\n{2,}/).filter(Boolean);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Resources", to: "/resources" }, { label: article.category }]}
        eyebrow={`${article.category} · ${article.read_minutes || 5} min read`}
        title={article.title}
        intro={article.excerpt}
      >
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-foreground/35">
          {article.author || "Tetroz Editorial"}
          {article.published_date ? ` · ${article.published_date}` : ""}
        </p>
      </PageHero>

      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <article className="max-w-2xl">
              {paragraphs.map((p, i) => (
                <p key={i} className="mb-5 text-[0.98rem] leading-[1.75] text-foreground/65">
                  {p}
                </p>
              ))}
              {article.tags?.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2 border-t border-foreground/[0.08] pt-6">
                  {article.tags.map((t) => (
                    <span key={t} className="rounded-full border border-foreground/10 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-foreground/45">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <Link to="/resources" className="mt-10 inline-flex items-center gap-2 text-[0.82rem] font-medium text-foreground/60 hover:text-primary">
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                Back to resources
              </Link>
            </article>
          </Reveal>

          <aside className="space-y-6">
            {related.length > 0 && (
              <div className="rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02]">
                <p className="label-mono mb-4">Related reading</p>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link key={r.id} to={`/resources/${r.slug}`} className="group block">
                      <p className="text-[0.88rem] font-medium leading-snug text-foreground/80 group-hover:text-primary">{r.title}</p>
                      <p className="mt-1 text-[0.75rem] text-foreground/40">{r.read_minutes || 5} min read</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02]">
              <p className="label-mono mb-3">Tetroz signal</p>
              <NewsletterForm source="article" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}