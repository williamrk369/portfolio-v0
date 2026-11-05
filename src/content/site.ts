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
  availability: "[Availability, e.g. open to full-time roles from March]",
  email: "[you@yourdomain.com]",
  url: "https://example.com", // TODO: production URL, used for metadata
  copyrightYear: 2026,
  description:
    "Applied AI and full-stack engineer. I take AI features from prototype to production: interface, backend and the tests that catch bad output.",

  nav: [
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#capabilities" },
    { label: "Process", href: "#approach" },
    { label: "About", href: "#about" },
  ] satisfies LinkItem[],

  /** Header button. Verb plus outcome. */
  navCta: { label: "Hire me", href: "#contact" },

  social: [
    { label: "GitHub", href: "[https://github.com/your-handle]" },
    { label: "LinkedIn", href: "[https://linkedin.com/in/your-handle]" },
    { label: "Résumé (PDF)", href: "[/resume.pdf]" },
  ] satisfies LinkItem[],

  // Written for one reader: a hiring manager whose team has an AI prototype
  // that needs to reach real users.
  hero: {
    label: "Applied AI / Full-Stack Engineer",
    // Two controlled lines. Parts marked `accent` are yellow.
    headline: [
      [{ text: "Your AI feature," }],
      [{ text: "shipped", accent: true }, { text: " to users." }],
    ],
    intro: "I build the interface, the backend and the tests that catch bad model output.",
    proof: "[Proof: one AI feature you shipped, its result and a link]",
    secondaryCta: "Discuss your role",
  },

  credibility: {
    heading: "At a glance",
    items: [
      { label: "Currently", value: "[Role] at [Company]" },
      { label: "Previously", value: "[Previous roles or companies]" },
      { label: "Proof", value: "[One shipped product, repo or talk, with a link]" },
    ],
  },

  projects: [
    {
      index: "01",
      title: "[Flagship project title]",
      kind: "[Type, e.g. LLM feature]",
      year: "[Year]",
      role: "[Your role]",
      summary: "[One line: what it does, for whom]",
      outcome: "[Result with a number you can prove, plus a link]",
      problem: "[The problem, in the user's words]",
      solution: "[What you built and the key decision]",
      stack: ["[Tech]", "[Tech]", "[Tech]", "[Tech]"],
      links: [],
      preview: "interface",
    },
    {
      index: "02",
      title: "[Second project title]",
      kind: "[Type, e.g. backend platform]",
      year: "[Year]",
      role: "[Your role]",
      summary: "[One line: what it does, for whom]",
      outcome: "[Result you can prove, plus a link]",
      problem: "[The problem, in plain words]",
      solution: "[What you built and why]",
      stack: ["[Tech]", "[Tech]", "[Tech]"],
      links: [],
      preview: "graph",
    },
    {
      index: "03",
      title: "[Third project title]",
      kind: "[Type, e.g. developer tooling]",
      year: "[Year]",
      role: "[Your role]",
      summary: "[One line: what it does, for whom]",
      outcome: "[Result you can prove, plus a link]",
      problem: "[The problem, in plain words]",
      solution: "[What you built and why]",
      stack: ["[Tech]", "[Tech]", "[Tech]"],
      links: [],
      preview: "terminal",
    },
  ] satisfies Project[],

  capabilities: {
    heading: "What I handle on your team",
    items: [
      {
        title: "AI features you can trust",
        body: "Answers grounded in your data, with tests that catch bad output before users see it.",
        proof: "[Link the project that shows this]",
      },
      {
        title: "The whole product",
        body: "Interface, API and database built by one person. No handoffs.",
        proof: "[Link the project that shows this]",
      },
      {
        title: "Backends that scale",
        body: "Jobs, auth, caching and tracing, sized for your traffic today.",
        proof: "[Link the project that shows this]",
      },
    ],
    toolkit: "[The languages, frameworks and platforms you actually use]",
  },

  approach: {
    heading: "How we'd work together",
    steps: [
      { title: "Agree on done", body: "We write down what success looks like and how we'll measure it." },
      { title: "Ship a thin version", body: "A working version on real inputs early. Then tests and error handling." },
      { title: "Release and watch", body: "Gradual rollout. We track quality, cost and speed after launch." },
    ],
  },

  about: {
    heading: "About",
    lead: "I'm [Your Name], an applied AI and full-stack engineer based in [City].",
    body: ["[How you got into engineering. Two sentences max.]", "[What you want next: the team, the problem, the role.]"],
    facts: [
      { label: "Based in", value: "[City, Country]" },
      { label: "Working on", value: "[Current focus or side project]" },
      { label: "Open to", value: "[Full-time, contract or both]" },
    ],
    portrait: null as ProjectImage | null, // e.g. { src: "/portrait.webp", alt: "…", width: 960, height: 1200 }
  },

  contact: {
    eyebrow: "Contact",
    heading: "Hiring for an AI feature?",
    // The objection, answered right before the button.
    objection: "Not sure it's a fit? Send the job link. I'll reply within [X working days] with a straight yes or no.",
    cta: "Email me about the role",
  },
};

export type Site = typeof site;
