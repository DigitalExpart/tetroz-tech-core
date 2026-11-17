import { divisions } from "@/data/divisions";
import { industries } from "@/data/industries";
import { marketplaceCategories } from "@/data/marketplace";

/**
 * Top-level navigation items and their dropdown subpages.
 */
export const navMenus = [
  {
    id: "solutions",
    label: "Solutions",
    to: "/solutions",
    overviewLabel: "All Solutions",
    overviewDescription: "Eight connected practices, one engineering standard.",
    align: "left",
    columns: 2,
    widthClass: "w-[560px]",
    items: divisions.map((d) => ({
      badge: d.code,
      label: d.title.split(" — ")[0],
      description: d.tagline,
      to: `/solutions/${d.slug}`,
    })),
  },
  {
    id: "products",
    label: "Products",
    to: "/products",
    overviewLabel: "All Products",
    overviewDescription: "A software portfolio labelled by real maturity.",
    align: "left",
    columns: 1,
    widthClass: "w-[290px]",
    items: [
      { label: "Available", description: "Ready and documented for use", to: "/products?stage=available" },
      { label: "Beta", description: "Usable with known limits", to: "/products?stage=beta" },
      { label: "In development", description: "Currently being engineered", to: "/products?stage=development" },
      { label: "Research", description: "Evaluated inside Tetroz Labs", to: "/products?stage=research" },
      { label: "Concept", description: "Early system architectures", to: "/products?stage=concept" },
    ],
  },
  {
    id: "marketplace",
    label: "Marketplace",
    to: "/marketplace",
    overviewLabel: "All Marketplace",
    overviewDescription: "Curated digital products from verified creators.",
    align: "left",
    columns: 1,
    widthClass: "w-[270px]",
    items: marketplaceCategories
      .filter((c) => c.slug !== "all")
      .map((c) => ({
        label: c.label,
        to: `/marketplace?category=${c.slug}`,
      })),
  },
  {
    id: "ai-automation",
    label: "AI & Automation",
    to: "/ai-automation",
    overviewLabel: "AI & Automation Overview",
    overviewDescription: "Applied intelligence with evaluation and guardrails.",
    align: "left",
    columns: 1,
    widthClass: "w-[310px]",
    items: [
      { label: "Capabilities", description: "Assistants, document processing & agents", to: "/ai-automation#capabilities" },
      { label: "Evaluation method", description: "Four steps from framing to operation", to: "/ai-automation#method" },
      { label: "AI & Intelligent Automation", description: "Division 01 overview", to: "/solutions/artificial-intelligence" },
      { label: "Data & Analytics", description: "Pipelines, warehouses & BI", to: "/solutions/data-and-analytics" },
      { label: "Scope an AI project", description: "Start an AI consultation", to: "/ai-automation#ai-inquiry" },
    ],
  },
  {
    id: "industries",
    label: "Industries",
    to: "/industries",
    overviewLabel: "All Industries",
    overviewDescription: "Ten sectors with distinct rules and systems.",
    align: "center",
    columns: 2,
    widthClass: "w-[540px]",
    items: industries.map((ind, idx) => ({
      badge: String(idx + 1).padStart(2, "0"),
      label: ind.title,
      to: `/industries/${ind.slug}`,
    })),
  },
  {
    id: "research",
    label: "Research",
    to: "/research",
    overviewLabel: "Tetroz Labs",
    overviewDescription: "Applied research and prototype builds.",
    align: "right",
    columns: 1,
    widthClass: "w-[300px]",
    items: [
      { label: "How the Labs operate", description: "Directives & maturity standards", to: "/research#directives" },
      { label: "Current lab tracks", description: "Active prototypes and concepts", to: "/research#tracks" },
      { label: "Research & Innovation Division", description: "Division 08 overview", to: "/solutions/research-and-innovation" },
      { label: "Research partnerships", description: "Collaborate with Tetroz Labs", to: "/partnerships" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    to: "/resources",
    overviewLabel: "Resource Library",
    overviewDescription: "Technical thinking, published plainly.",
    align: "right",
    columns: 1,
    widthClass: "w-[260px]",
    items: [
      { label: "AI", to: "/resources?category=ai" },
      { label: "Engineering", to: "/resources?category=engineering" },
      { label: "Data", to: "/resources?category=data" },
      { label: "Transformation", to: "/resources?category=transformation" },
      { label: "Research", to: "/resources?category=research" },
      { label: "Company", to: "/resources?category=company" },
    ],
  },
  {
    id: "company",
    label: "Company",
    to: null,
    align: "right",
    columns: 1,
    widthClass: "w-[270px]",
    items: [
      { label: "About Tetroz", description: "Mission, principles & background", to: "/about" },
      { label: "Partnerships", description: "Technology, research & delivery", to: "/partnerships" },
      { label: "Careers", description: "Open positions & team culture", to: "/careers" },
      { label: "Contact", description: "Start a conversation with Tetroz", to: "/contact" },
      { label: "Legal & Policies", description: "Privacy, terms & accessibility", to: "/legal/privacy-policy" },
    ],
  },
];
