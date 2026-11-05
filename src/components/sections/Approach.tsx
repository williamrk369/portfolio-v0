import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Three steps on a shared rail: vertical on mobile, horizontal from md. */
export function Approach() {
  const { approach } = site;
  const last = approach.steps.length - 1;
  return (
    <section id="approach" aria-labelledby="approach-title" className="bg-surface py-section">
      <Container>
        <SectionHeading id="approach-title" index="03" eyebrow="Process" title={approach.heading} />

        <ol data-steps className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 md:mt-24 md:grid-cols-3">
          {approach.steps.map((step, i) => (
            <Reveal as="li" key={step.title} className="relative pl-10 md:pl-0 md:pt-12">
              {/* rail */}
              <span
                aria-hidden
                data-rail
                className={[
                  "absolute bg-line-strong",
                  // mobile: vertical, joins to the next step
                  i < last ? "top-3 -bottom-12 left-[5px] w-px" : "hidden",
                  // md+: horizontal; runs through the gutter, the last step stops at the edge
                  "md:top-[5px] md:bottom-auto md:left-0 md:block md:h-px md:w-auto",
                  i === last ? "md:right-0" : "md:-right-6",
                ].join(" ")}
              />
              <span
                aria-hidden
                data-marker
                className={`absolute top-1 left-0 size-[11px] border md:top-0 ${
                  i === last ? "border-accent bg-accent" : "border-muted bg-surface"
                }`}
              />
              <p className="font-mono text-meta text-faint">Step {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-subtitle text-fg">{step.title}</h3>
              <p className="mt-4 max-w-read text-body text-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
