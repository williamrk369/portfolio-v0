import { ArrowUpRight } from "lucide-react";
import { site, type Project } from "@/content/site";
import { isPlaceholder, Text } from "@/lib/content";
import { Container, grid } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectPreview } from "./ProjectPreview";

/**
 * Project showcase: one full-width plate per project, then a single row
 * underneath that leads with the result and puts the proof link beside it.
 */
export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-section">
      <Container>
        <SectionHeading id="work-title" index="01" eyebrow="Projects" title="Work you can check" />
        <ol className="mt-16 flex flex-col gap-24 md:mt-24 lg:gap-32">
          {site.projects.map((project, i) => (
            <li key={project.index}>
              <ProjectPlate project={project} priority={i === 0} />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function primaryHref(project: Project) {
  const link = project.links[0];
  return link && !isPlaceholder(link.href) ? link.href : null;
}

function ProjectPlate({ project, priority }: { project: Project; priority: boolean }) {
  const href = primaryHref(project);
  return (
    <Reveal
      as="article"
      className={`${href ? "group" : ""} relative`}
      aria-labelledby={`project-${project.index}`}
    >
      <ProjectPreview
        project={project}
        aspect="aspect-[16/10] md:aspect-[16/8]"
        sizes="(min-width: 1280px) 1184px, 100vw"
        priority={priority}
      />

      <div className={`${grid} mt-10 gap-y-8`}>
        <div className="col-span-4 flex flex-col gap-4 md:col-span-12 lg:col-span-5">
          <Meta project={project} />
          <h3 id={`project-${project.index}`} className="text-title text-fg">
            {href ? (
              // Stretched link: the whole plate is clickable, one tab stop.
              <a href={href} className="decoration-signal decoration-2 underline-offset-8 after:absolute after:inset-0 group-hover:underline">
                <Text>{project.title}</Text>
              </a>
            ) : (
              <Text>{project.title}</Text>
            )}
          </h3>
          <p className="text-lead text-muted">
            <Text>{project.summary}</Text>
          </p>
        </div>

        <div className="col-span-4 flex flex-col gap-8 md:col-span-12 lg:col-span-7">
          <Story project={project} />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Stack items={project.stack} />
            <Links project={project} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    // Each separator belongs to the item after it, so a wrap never leaves a
    // dangling "/" at the end of a line.
    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-meta text-faint">
      <li className="font-mono text-signal">{project.index}</li>
      {[project.kind, project.role, project.year].map((value, i) => (
        <li key={i} className="flex items-center gap-3">
          <span aria-hidden>/</span>
          <Text>{value}</Text>
        </li>
      ))}
    </ul>
  );
}

function Story({ project }: { project: Project }) {
  // Result first: the benefit leads, the how follows.
  const rows = [
    { label: "Result", value: project.outcome },
    { label: "Problem", value: project.problem },
    { label: "What I built", value: project.solution },
  ];
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
      {rows.map((row) => (
        <div key={row.label} className="border-t border-line pt-4">
          <dt className={`text-meta font-semibold uppercase ${row.label === "Result" ? "text-fg" : "text-faint"}`}>
            {row.label}
          </dt>
          <dd className="mt-2 text-body text-muted">
            <Text>{row.value}</Text>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul aria-label="Technology" className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="border border-line px-2.5 py-1 font-mono text-[0.75rem] text-muted">
          <Text>{item}</Text>
        </li>
      ))}
    </ul>
  );
}

function Links({ project }: { project: Project }) {
  if (!project.links.length) {
    return (
      <p className="text-meta text-faint">
        <Text>{"[Add a live demo, repo or case study link]"}</Text>
      </p>
    );
  }
  return (
    <ul className="relative z-10 flex flex-wrap gap-x-6 gap-y-2">
      {project.links.map((link) => (
        <li key={link.label}>
          <SmartLink
            href={link.href}
            className="inline-flex items-center gap-1 text-[0.9375rem] font-semibold text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal"
          >
            {link.label}
            <ArrowUpRight aria-hidden size={16} />
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}
