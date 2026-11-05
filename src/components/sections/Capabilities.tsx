import { site } from "@/content/site";
import { Text } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Three skills, each with its proof link, on one hairline grid. */
export function Capabilities() {
  const { capabilities } = site;
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="py-section">
      <Container>
        <SectionHeading id="capabilities-title" index="02" eyebrow="Skills" title={capabilities.heading} />
        <ol className="mt-16 grid grid-cols-1 gap-px border-y border-line bg-line md:mt-24 md:grid-cols-3">
          {capabilities.items.map((item) => (
            <Reveal as="li" key={item.title} className="flex flex-col gap-4 bg-ink py-10 md:px-8 md:first:pl-0 md:last:pr-0">
              <h3 className="text-subtitle text-fg">{item.title}</h3>
              <p className="text-body text-muted">{item.body}</p>
              {/* Proof next to the claim. */}
              <p className="mt-auto pt-2 text-meta text-faint">
                <Text>{item.proof}</Text>
              </p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-8 text-center text-meta text-faint">
          <span className="mr-3 font-semibold uppercase text-muted">Toolkit</span>
          <Text>{capabilities.toolkit}</Text>
        </p>
      </Container>
    </section>
  );
}
