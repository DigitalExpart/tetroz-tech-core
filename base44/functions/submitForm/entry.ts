import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";

const INQUIRY_TYPES = [
  "general",
  "software",
  "ai_automation",
  "digital_transformation",
  "enterprise",
  "cloud_security",
  "data_analytics",
  "partnership",
  "investment",
  "media",
  "careers",
];

const clean = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export default async function (req) {
  try {
    if (req.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const body = await req.json().catch(() => ({}));
    const kind = clean(body.kind, 20);
    const base44 = createClientFromRequest(req);

    if (kind === "newsletter") {
      const email = clean(body.email, 200).toLowerCase();
      if (!validEmail(email)) {
        return Response.json({ error: "A valid email address is required." }, { status: 400 });
      }
      if (body.consent !== true) {
        return Response.json({ error: "Consent is required to subscribe." }, { status: 400 });
      }
      const existing = await base44.asServiceRole.entities.NewsletterSubscriber.filter({ email }, { limit: 1 });
      if (existing.items && existing.items.length > 0) {
        return Response.json({ ok: true, existing: true });
      }
      await base44.asServiceRole.entities.NewsletterSubscriber.create({
        email,
        consent: true,
        source: clean(body.source, 60) || "website",
        status: "subscribed",
      });
      return Response.json({ ok: true });
    }

    if (kind === "inquiry") {
      const name = clean(body.name, 120);
      const email = clean(body.email, 200).toLowerCase();
      const message = clean(body.message, 6000);

      if (!name) return Response.json({ error: "Please add your name." }, { status: 400 });
      if (!validEmail(email)) return Response.json({ error: "A valid email address is required." }, { status: 400 });
      if (message.length < 10) {
        return Response.json({ error: "Please describe your inquiry in a little more detail." }, { status: 400 });
      }
      if (body.consent !== true) {
        return Response.json({ error: "Consent to be contacted is required." }, { status: 400 });
      }

      const inquiryType = INQUIRY_TYPES.includes(body.inquiry_type) ? body.inquiry_type : "general";
      const budgets = ["not_sure", "under_10k", "10k_25k", "25k_50k", "50k_100k", "100k_plus"];
      const timelines = ["exploring", "under_1_month", "1_3_months", "3_6_months", "6_plus_months"];

      const created = await base44.asServiceRole.entities.Inquiry.create({
        name,
        email,
        phone: clean(body.phone, 40),
        company: clean(body.company, 160),
        industry: clean(body.industry, 120),
        inquiry_type: inquiryType,
        service_interest: clean(body.service_interest, 160),
        budget_range: budgets.includes(body.budget_range) ? body.budget_range : "",
        timeline: timelines.includes(body.timeline) ? body.timeline : "",
        message,
        file_uri: clean(body.file_uri, 500),
        file_name: clean(body.file_name, 200),
        consent: true,
        status: "new",
        source_page: clean(body.source_page, 200),
      });

      return Response.json({ ok: true, id: created.id });
    }

    if (kind === "application") {
      const name = clean(body.name, 120);
      const email = clean(body.email, 200).toLowerCase();

      if (!name) return Response.json({ error: "Please add your name." }, { status: 400 });
      if (!validEmail(email)) return Response.json({ error: "A valid email address is required." }, { status: 400 });
      if (body.consent !== true) {
        return Response.json({ error: "Consent to store your application is required." }, { status: 400 });
      }

      const created = await base44.asServiceRole.entities.JobApplication.create({
        name,
        email,
        phone: clean(body.phone, 40),
        role_interest: clean(body.role_interest, 120),
        opening_title: clean(body.opening_title, 160),
        portfolio_url: clean(body.portfolio_url, 400),
        message: clean(body.message, 4000),
        resume_uri: clean(body.resume_uri, 500),
        resume_name: clean(body.resume_name, 200),
        consent: true,
        status: "received",
      });

      return Response.json({ ok: true, id: created.id });
    }

    return Response.json({ error: "Unknown submission type." }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}