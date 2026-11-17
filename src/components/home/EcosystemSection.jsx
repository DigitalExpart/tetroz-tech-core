import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import DivisionCard from "@/components/site/DivisionCard";
import Reveal from "@/components/site/Reveal";
import { divisions } from "@/data/divisions";

export default function EcosystemSection() {
  return (
    <section className="relative border-t border-foreground/[0.08] py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="The Tetroz ecosystem"
            title="Eight divisions. One engineering standard."
            intro="Tetroz is built as a connected group of practices, not a list of services. Intelligence, software, cloud, data and platforms are designed together so a system does not stop at the edge of a department."
          />
          <Reveal delay={0.1}>
            <Link
              to="/solutions"
              className="group inline-flex items-center gap-2 text-[0.82rem] font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              View all solutions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((division, i) => (
            <Reveal key={division.slug} delay={Math.min(i * 0.04, 0.24)}>
              <DivisionCard division={division} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}