/**
 * All page copy lives here, separate from presentation.
 *
 * Conventions
 * - Text wrapped in [square brackets] is a PLACEHOLDER. It renders with a
 *   dashed outline on the page so it cannot ship unnoticed. Replace the whole
 *   string, brackets included, with real content.
 * - A link whose href is a placeholder renders as plain text, never as a
 *   dead link.
 * - Do not add numbers, client names or outcomes you can't back up.
 */

export type LinkItem = { label: string; href: string };

export type ProjectImage = {
  /** Path under /public, e.g. "/work/project-one.webp" */
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  index: string;
  title: string;
  kind: string;
  year: string;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  stack: string[];
  links: LinkItem[];
  /** Add a real screenshot; until then an abstract preview is drawn. */
  image?: ProjectImage;
  /** Which abstract preview to draw while `image` is missing. */
  preview: "interface" | "graph" | "terminal";
};

export const site = {
  name: "[Your Name]",
  role: "Applied AI / Full-Stack Engineer",
  location: "[City, Country]",
  availability: "[Availability — e.g. open to full-time roles]",
  email: "[you@yourdomain.com]",
  url: "https://example.com", // TODO: production URL, used for metadata
  copyrightYear: 2026,
  description:
    "Applied AI and full-stack engineer building language-model features end to end — interface, backend, and the evaluation that keeps them reliable.",

  nav: [
    { label: "Work", href: "#work" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Approach", href: "#approach" },
    { label: "About", href: "#about" },
  ] satisfies LinkItem[],

  social: [
    { label: "GitHub", href: "[https://github.com/your-handle]" },
    { label: "LinkedIn", href: "[https://linkedin.com/in/your-handle]" },
    { label: "Résumé (PDF)", href: "[/resume.pdf]" },
  ] satisfies LinkItem[],

  hero: {
    label: "Applied AI / Full-Stack Engineer",
    // Two controlled lines. `emphasis` is highlighted in the accent colour.
    headline: { before: "AI that ", emphasis: "ships,", after: "not just demos." },
    intro:
      "I take language-model features from prototype to production — the product surface, the backend that serves it, and the evaluation that keeps it honest.",
  },

  credibility: {
    heading: "At a glance",
    items: [
      { label: "Focus", value: "Applied AI · Full-stack product engineering" },
      { label: "Currently", value: "[Role] at [Company]" },
      { label: "Previously", value: "[Previous roles or organisations]" },
      { label: "Proof", value: "[A shipped product, repo, paper or talk — linked]" },
    ],
  },

  projects: [
    {
      index: "01",
      title: "[Flagship project title]",
      kind: "[Type — e.g. LLM product feature]",
      year: "[Year]",
      role: "[Your role]",
      summary: "[One sentence: what it is and who it serves.]",
      problem: "[The problem in the user's or business's terms.]",
      solution: "[What you built and the technical decision that mattered most.]",
      outcome: "[A verifiable result. Link the evidence where you can.]",
      stack: ["[Tech]", "[Tech]", "[Tech]", "[Tech]"],
      links: [],
      preview: "interface",
    },
    {
      index: "02",
      title: "[Second project title]",
      kind: "[Type — e.g. backend platform]",
      year: "[Year]",
      role: "[Your role]",
      summary: "[One sentence: what it is and who it serves.]",
      problem: "[The problem in plain terms.]",
      solution: "[What you built and why it was built that way.]",
      outcome: "[A verifiable result.]",
      stack: ["[Tech]", "[Tech]", "[Tech]"],
      links: [],
      preview: "graph",
    },
    {
      index: "03",
      title: "[Third project title]",
      kind: "[Type — e.g. developer tooling]",
      year: "[Year]",
      role: "[Your role]",
      summary: "[One sentence: what it is and who it serves.]",
      problem: "[The problem in plain terms.]",
      solution: "[What you built and why it was built that way.]",
      outcome: "[A verifiable result.]",
      stack: ["[Tech]", "[Tech]", "[Tech]"],
      links: [],
      preview: "terminal",
    },
  ] satisfies Project[],

  capabilities: {
    heading: "What I bring to a team",
    intro:
      "Four areas I work across. The overlap is the point: AI features fail at the seams between model, product and infrastructure.",
    items: [
      {
        title: "Applied AI integration",
        body: "Turning model capability into dependable product behaviour — grounding responses in the right context and measuring quality before and after release.",
        scope: ["Retrieval & context design", "Tool use & structured output", "Evaluation & guardrails"],
      },
      {
        title: "Full-stack product engineering",
        body: "Interfaces, APIs and data models designed as one system, so a feature can move from idea to production without hand-offs losing intent.",
        scope: ["Product interfaces", "API design", "Data modelling"],
      },
      {
        title: "Backend engineering",
        body: "Services that stay predictable under real traffic: clear contracts, careful failure handling, and integrations that are easy to reason about.",
        scope: ["Services & background jobs", "Auth & permissions", "Third-party integrations"],
      },
      {
        title: "Scalable system design",
        body: "Architecture sized to the problem — starting simple, with the observability to know when and where it needs to grow.",
        scope: ["Latency & caching", "Observability", "Cost awareness"],
      },
    ],
    toolkit: "[List the languages, frameworks and platforms you actually use]",
  },

  approach: {
    heading: "From problem to production",
    intro: "How I like to work, whether I'm one engineer on a large team or the first one in the room.",
    steps: [
      {
        title: "Understand",
        body: "Start with the people and the constraint, not the model. Define what “working” means before writing code.",
      },
      {
        title: "Prototype",
        body: "Build the thinnest version that answers the riskiest question. Put it in front of real inputs early.",
      },
      {
        title: "Build",
        body: "Harden what proved itself: typed contracts, tests, evaluation sets and failure paths designed on purpose.",
      },
      {
        title: "Ship & measure",
        body: "Release gradually, watch the signals that matter, and feed what we learn back into the next iteration.",
      },
    ],
  },

  about: {
    heading: "About",
    lead: "I'm [Your Name], an applied AI and full-stack engineer based in [City].",
    body: [
      "[Two or three sentences in your own voice: how you got into engineering, and what kind of problems keep you interested.]",
      "[One sentence on what you're looking for next — the team, the problem space, the kind of role.]",
    ],
    facts: [
      { label: "Based in", value: "[City, Country]" },
      { label: "Working on", value: "[Current focus or side project]" },
      { label: "Open to", value: "[Full-time · Contract · Collaboration]" },
    ],
    portrait: null as ProjectImage | null, // e.g. { src: "/portrait.webp", alt: "…", width: 960, height: 1200 }
  },

  contact: {
    eyebrow: "Contact",
    heading: "Have something worth building?",
    body: "I'm always glad to talk through a hard problem, a role, or an early idea. Email is the fastest way to reach me.",
  },
};

export type Site = typeof site;
