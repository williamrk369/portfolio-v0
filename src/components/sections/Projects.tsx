import { ArrowUpRight } from "lucide-react";
import { site, type Project } from "@/content/site";
import { isPlaceholder, Text } from "@/lib/content";
import { Container, grid } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectPreview } from "./ProjectPreview";

/**
 * Selected work. The first project gets a wide editorial spread; the rest
 * sit as an asymmetric, vertically staggered pair so the section never reads
 * as a uniform card grid.
 */
export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-section">
      <Container>
        <div className={grid}>
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <SectionHeading
              id="work-title"
              index="01"
              eyebrow="Projects"
              title="Selected work"
              intro="Each project is told the same way: the problem, the decision that mattered, and what changed as a result."
            />
          </div>
        </div>

        <ol className={`${grid} mt-16 gap-y-24 md:mt-24 lg:gap-y-32`}>
          {site.projects.map((project, i) =>
            i === 0 ? (
              <li key={project.index} className="col-span-4 md:col-span-12">
                <FeaturedProject project={project} />
              </li>
            ) : (
              <li
                key={project.index}
                className={
                  i % 2 === 1
                    ? "col-span-4 md:col-span-12 lg:col-span-7"
                    : "col-span-4 md:col-span-12 lg:col-span-5 lg:mt-48"
                }
              >
                <CompactProject project={project} tall={i % 2 === 0} />
              </li>
            ),
          )}
        </ol>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------------ */

function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal as="article" className={`${primaryHref(project) ? "group" : ""} relative`} aria-labelledby={`project-${project.index}`}>
      <div className={`${grid} gap-y-8`}>
        <div className="col-span-4 flex items-end justify-between gap-6 border-b border-line-strong pb-6 md:col-span-12">
          <ProjectTitle project={project} size="lg" />
          <Index value={project.index} />
        </div>

        <div className="col-span-4 md:col-span-12 lg:col-span-8">
          <ProjectPreview
            project={project}
            aspect="aspect-[16/10]"
            sizes="(min-width: 1280px) 800px, (min-width: 1024px) 66vw, 100vw"
            priority
          />
        </div>

        <div className="col-span-4 flex flex-col gap-8 md:col-span-12 lg:col-span-4">
          <Meta project={project} />
          <p className="text-lead text-fg">
            <Text>{project.summary}</Text>
          </p>
          <Story project={project} className="md:grid-cols-3 lg:grid-cols-1" />
          <Stack items={project.stack} />
          <Links project={project} />
        </div>
      </div>
    </Reveal>
  );
}

function CompactProject({ project, tall }: { project: Project; tall: boolean }) {
  return (
    <Reveal
      as="article"
      className={`${primaryHref(project) ? "group" : ""} relative flex flex-col gap-8`}
      aria-labelledby={`project-${project.index}`}
    >
      <div className="flex items-end justify-between gap-6 border-b border-line-strong pb-6">
        <ProjectTitle project={project} size="md" />
        <Index value={project.index} />
      </div>
      <div className="md:grid md:grid-cols-12 md:gap-6 lg:block">
        <div className="md:col-span-7 lg:col-span-12">
          <ProjectPreview
            project={project}
            aspect={tall ? "aspect-[4/3] lg:aspect-[4/5]" : "aspect-[4/3]"}
            sizes="(min-width: 1024px) 45vw, (min-width: 768px) 58vw, 100vw"
          />
        </div>
        <div className="mt-8 flex flex-col gap-6 md:col-span-5 md:mt-0 lg:mt-8">
          <Meta project={project} />
          <p className="text-lead text-fg">
            <Text>{project.summary}</Text>
          </p>
          <Story project={project} />
          <Stack items={project.stack} />
          <Links project={project} />
        </div>
      </div>
    </Reveal>
  );
}

/* --- Shared project pieces --------------------------------------------- */

function primaryHref(project: Project) {
  const link = project.links[0];
  return link && !isPlaceholder(link.href) ? link.href : null;
}

function ProjectTitle({ project, size }: { project: Project; size: "lg" | "md" }) {
  const href = primaryHref(project);
  const cls = size === "lg" ? "text-display" : "text-title";
  const content = <Text>{project.title}</Text>;
  return (
    <h3 id={`project-${project.index}`} className={`${cls} max-w-[18ch] text-fg`}>
      {href ? (
        // Stretched link: the whole article is clickable, one tab stop.
        <a href={href} className="decoration-signal decoration-2 underline-offset-8 after:absolute after:inset-0 group-hover:underline">
          {content}
        </a>
      ) : (
        content
      )}
    </h3>
  );
}

function Index({ value }: { value: string }) {
  return (
    <span
      aria-hidden
      className="font-display text-[2.5rem] leading-none font-bold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_var(--color-line-strong)] transition-[-webkit-text-stroke-color] duration-300 group-hover:[-webkit-text-stroke-color:var(--color-signal)] md:text-[3.5rem]"
    >
      {value}
    </span>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    // Each separator belongs to the item after it, so a wrap never leaves a
    // dangling "/" at the end of a line.
    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-meta text-faint">
      {[project.kind, project.role, project.year].map((value, i) => (
        <li key={i} className="flex items-center gap-3">
          {i > 0 ? <span aria-hidden>/</span> : null}
          <Text>{value}</Text>
        </li>
      ))}
    </ul>
  );
}

function Story({ project, className = "" }: { project: Project; className?: string }) {
  const rows = [
    { label: "Problem", value: project.problem },
    { label: "Solution", value: project.solution },
    { label: "Outcome", value: project.outcome },
  ];
  return (
    <dl className={`grid grid-cols-1 gap-x-6 gap-y-5 ${className}`}>
      {rows.map((row) => (
        <div key={row.label} className="border-t border-line pt-4">
          <dt className={`text-meta font-semibold uppercase ${row.label === "Outcome" ? "text-fg" : "text-faint"}`}>
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
        <Text>{"[Add case study, live demo or repository links]"}</Text>
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
