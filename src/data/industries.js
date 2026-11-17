export const industries = [
  {
    slug: "financial-services",
    title: "Financial Services & Fintech",
    summary: "Interfaces, data pipelines and controls for organisations that carry regulatory weight.",
    challenges: [
      "Legacy cores that make new products slow to launch",
      "Reconciliation and reporting assembled by hand",
      "Audit trails that are reconstructed after the fact",
    ],
    applications: [
      "Client portals with role-based access and complete activity logs",
      "Document intelligence for onboarding and verification files",
      "Governed reporting pipelines with defined metric ownership",
      "Internal tooling that reduces manual review queues",
    ],
    benefits: ["Faster onboarding", "Defensible records", "Fewer manual controls", "Clearer risk visibility"],
  },
  {
    slug: "healthcare",
    title: "Healthcare & Health Technology",
    summary: "Clinical-adjacent systems designed around privacy, consent and careful data handling.",
    challenges: [
      "Fragmented records across providers and systems",
      "Administrative load that competes with care",
      "Sensitive data with strict access requirements",
    ],
    applications: [
      "Scheduling and intake systems with consent capture",
      "Secure document exchange between authorised parties",
      "Operational dashboards for non-clinical performance",
      "Knowledge tools grounded in approved internal material",
    ],
    benefits: ["Less administrative overhead", "Consistent consent records", "Clear access boundaries", "Safer information flow"],
  },
  {
    slug: "education",
    title: "Education & Learning Technology",
    summary: "Learning platforms, administrative tooling and content delivery that work at cohort scale.",
    challenges: [
      "Content spread across disconnected tools",
      "Manual enrolment, tracking and reporting",
      "Limited visibility into learner progress",
    ],
    applications: [
      "Course platforms with account-based access",
      "Enrolment and credential workflows",
      "Progress and completion reporting for administrators",
      "Assessment and feedback tooling",
    ],
    benefits: ["One learning environment", "Automated administration", "Visible progress", "Reusable content library"],
  },
  {
    slug: "government",
    title: "Government & Public Services",
    summary: "Service delivery, accessibility and accountability for public-facing digital systems.",
    challenges: [
      "Paper-heavy processes with long turnaround",
      "Accessibility and transparency obligations",
      "Systems that must remain accountable over time",
    ],
    applications: [
      "Accessible online service portals",
      "Case intake, routing and status tracking",
      "Public dashboards for published metrics",
      "Document digitisation with review checkpoints",
    ],
    benefits: ["Reduced processing time", "Accessible service access", "Documented decisions", "Clear public reporting"],
  },
  {
    slug: "non-profit",
    title: "Non-profit & Humanitarian Organisations",
    summary: "Practical platforms for organisations with limited budgets and high accountability.",
    challenges: [
      "Small teams carrying large operational loads",
      "Donor and programme reporting that consumes weeks",
      "Volunteer and beneficiary data spread across tools",
    ],
    applications: [
      "Donor and programme management in one system",
      "Intake and case tracking with controlled access",
      "Volunteer coordination and scheduling",
      "Impact reporting that refreshes automatically",
    ],
    benefits: ["More time on mission", "Cleaner reporting", "Protected sensitive records", "Lower tooling cost"],
  },
  {
    slug: "logistics",
    title: "Transportation & Logistics",
    summary: "Visibility, scheduling and exception handling across moving parts.",
    challenges: [
      "Status information trapped in calls and spreadsheets",
      "Exceptions discovered too late",
      "Disconnected dispatch, driver and customer systems",
    ],
    applications: [
      "Shipment tracking and status portals",
      "Route and capacity planning tools",
      "Exception alerts and escalation workflows",
      "Customer-facing delivery visibility",
    ],
    benefits: ["Earlier exception detection", "Fewer status calls", "Better capacity use", "Shared operational picture"],
  },
  {
    slug: "construction",
    title: "Construction & Engineering",
    summary: "Project control, documentation and field-to-office coordination.",
    challenges: [
      "Document versions diverging between site and office",
      "Change orders tracked informally",
      "Progress reporting rebuilt every cycle",
    ],
    applications: [
      "Project portals with controlled document sets",
      "Change and approval workflows",
      "Field capture feeding office records",
      "Cost and progress dashboards",
    ],
    benefits: ["One document set", "Traceable approvals", "Fewer disputes", "Live project visibility"],
  },
  {
    slug: "retail",
    title: "Retail & E-commerce",
    summary: "Commerce platforms, inventory visibility and customer experience at scale.",
    challenges: [
      "Channels that disagree on inventory",
      "Checkout friction and abandoned baskets",
      "Customer data scattered across tools",
    ],
    applications: [
      "Headless storefronts and product catalogues",
      "Unified inventory and order state",
      "Customer accounts and subscription handling",
      "Merchandising and search improvements",
    ],
    benefits: ["Consistent stock truth", "Smoother checkout", "Higher repeat purchase", "Unified customer record"],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    summary: "Production visibility, quality records and maintenance coordination.",
    challenges: [
      "Production data locked in machines and paper logs",
      "Quality records assembled after the fact",
      "Unplanned downtime with unclear causes",
    ],
    applications: [
      "Production and quality data capture",
      "Maintenance scheduling and history",
      "Supplier and inventory integration",
      "Operational dashboards for supervisors",
    ],
    benefits: ["Visible throughput", "Traceable quality", "Planned maintenance", "Less unrecorded downtime"],
  },
  {
    slug: "professional-services",
    title: "Professional Services & Real Estate",
    summary: "Client portals, project tracking and document workflows for advice-led businesses.",
    challenges: [
      "Client communication spread across email threads",
      "Deliverables and approvals with no audit trail",
      "Time and billing assembled manually",
    ],
    applications: [
      "Client portals with project status and document access",
      "Engagement intake and scoping workflows",
      "Approval trails for key deliverables",
      "Utilisation and billing reporting",
    ],
    benefits: ["Fewer status meetings", "Documented approvals", "Faster invoicing", "Professional client experience"],
  },
];

export const industryBySlug = (slug) => industries.find((i) => i.slug === slug);