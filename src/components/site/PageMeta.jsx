import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const meta = {
  "/": {
    title: "Tetroz Technologies Inc. — Technology That Moves Possibility Forward",
    description:
      "Tetroz builds intelligent software, AI-powered solutions and connected digital platforms. Solutions. Software. Intelligence.",
  },
  "/about": {
    title: "About Tetroz — A technology company built to own what it makes",
    description:
      "Tetroz Technologies Inc. is a Canadian technology company developing software, AI products, digital platforms and automation systems.",
  },
  "/solutions": {
    title: "Solutions — Eight divisions, one engineering standard | Tetroz",
    description:
      "AI and automation, software engineering, digital transformation, cloud and security, data analytics, digital products, platforms and applied research.",
  },
  "/ai-automation": {
    title: "AI & Automation — Applied intelligence, engineered | Tetroz",
    description:
      "AI assistants, document intelligence, predictive analytics and agentic automation, built with evaluation and guardrails.",
  },
  "/products": {
    title: "Products — A portfolio in deliberate stages | Tetroz",
    description:
      "Tetroz product catalogue: concepts, research, development, beta and available software, each labelled by real maturity.",
  },
  "/industries": {
    title: "Industries served | Tetroz Technologies Inc.",
    description:
      "Technology applications for financial services, healthcare, education, government, logistics, construction, retail, manufacturing and professional services.",
  },
  "/research": {
    title: "Tetroz Labs — Research and innovation | Tetroz",
    description:
      "Applied research, experimental software and product prototypes from Tetroz Labs, each labelled by maturity.",
  },
  "/resources": {
    title: "Resource library — Technical thinking, published plainly | Tetroz",
    description: "Articles and notes on applied AI, software engineering, data and digital transformation from Tetroz.",
  },
  "/partnerships": {
    title: "Partnerships and collaboration | Tetroz Technologies Inc.",
    description:
      "Technology, research and delivery partnerships with Tetroz. Propose a collaboration or strategic conversation.",
  },
  "/careers": {
    title: "Careers at Tetroz — Build a technology company from the foundation",
    description:
      "Open positions and general applications at Tetroz Technologies Inc., Regina, Saskatchewan.",
  },
  "/contact": {
    title: "Contact Tetroz — Let's build what's next",
    description:
      "Start a project inquiry with Tetroz Technologies Inc. Regina, Saskatchewan, Canada.",
  },
};

export default function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const entry = meta[pathname];
    if (entry) {
      document.title = entry.title;
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", entry.description);
    }
  }, [pathname]);

  return null;
}