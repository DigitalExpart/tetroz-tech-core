import React from "react";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import InquiryForm from "@/components/site/InquiryForm";

const routing = [
  { label: "New projects & consulting", text: "Scope a build, an AI system or a transformation programme.", href: "#inquiry" },
  { label: "Partnerships", text: "Technology, research or delivery collaboration.", href: "/partnerships" },
  { label: "Careers", text: "Introductions and applications.", href: "/careers" },
  { label: "Technical support", text: "Existing clients and product users. Include your account or project reference.", href: "#inquiry" },
  { label: "Media & press", text: "Interview and background requests.", href: "#inquiry" },
];

export default function Contact() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact centre"
        title={<>Let&apos;s build what&apos;s next.</>}
        intro="Tell us what you are trying to build, change or understand. Every serious inquiry is read by a person at Tetroz, not routed into a sequence."
      />

      <section className="border-b border-foreground/[0.08] py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.3fr]">
          <div className="space-y-4">
            <div className="rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02]">
              <p className="label-mono mb-4">Company</p>
              <p className="text-[1rem] font-semibold text-foreground">Tetroz Technologies Inc.</p>
              <div className="mt-4 space-y-3 text-[0.85rem] text-foreground/55">
                <p className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" strokeWidth={1.6} />
                  Regina, Saskatchewan, Canada
                </p>
                <p className="flex items-start gap-2.5 text-foreground/45">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary/50" strokeWidth={1.6} />
                  Business email — placeholder, pending official domain confirmation
                </p>
                <p className="flex items-start gap-2.5 text-foreground/45">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary/50" strokeWidth={1.6} />
                  Phone number — placeholder, pending official confirmation
                </p>
                <p className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" strokeWidth={1.6} />
                  Central Standard Time (Regina). Replies usually within two business days.
                </p>
              </div>
              <p className="mt-5 border-t border-foreground/[0.08] pt-4 font-mono text-[0.56rem] uppercase leading-relaxed tracking-[0.14em] text-foreground/30">
                Official contact details will be published once confirmed. The form below reaches the team now.
              </p>
            </div>

            <div className="rounded-md border border-foreground/[0.08] bg-card/80 p-6 dark:bg-white/[0.02]">
              <p className="label-mono mb-4">Route your inquiry</p>
              <ul className="space-y-3">
                {routing.map((r) => (
                  <li key={r.label}>
                    <a href={r.href} className="group block">
                      <p className="text-[0.86rem] font-medium text-foreground/80 transition-colors group-hover:text-primary">
                        {r.label}
                      </p>
                      <p className="mt-0.5 text-[0.78rem] leading-relaxed text-foreground/45">{r.text}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Reveal delay={0.06}>
            <div id="inquiry" className="scroll-mt-24 rounded-md border border-foreground/[0.08] bg-surface-elevated p-6 sm:p-9">
              <SectionHeading
                eyebrow="Project consultation"
                title="Start an inquiry."
                intro="Complete what is relevant. The more concrete the description, the more useful our first response will be."
                className="mb-8"
              />
              <InquiryForm type="general" sourcePage="/contact" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}