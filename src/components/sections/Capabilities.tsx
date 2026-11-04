import { site } from "@/content/site";
import { Text } from "@/lib/content";
import { Container, grid } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Typographic index of capabilities beside a sticky heading — not cards. */
export function Capabilities() {
  const { capabilities } = site;
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="py-section">
      <Container className={`${grid} gap-y-12`}>
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="capabilities-title"
              index="02"
              eyebrow="Capabilities"
              title={capabilities.heading}
              intro={capabilities.intro}
            />
          </div>
        </div>

        <div className="col-span-4 md:col-span-12 lg:col-span-8">
          <ol className="border-b border-line">
            {capabilities.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                className="grid grid-cols-4 gap-x-6 gap-y-4 border-t border-line py-8 md:grid-cols-8 md:py-10"
              >
                <span aria-hidden className="col-span-4 font-mono text-meta text-signal md:col-span-1 md:pt-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="col-span-4 text-title text-fg md:col-span-3">{item.title}</h3>
                <div className="col-span-4 md:col-span-4 md:pt-1">
                  <p className="text-body text-muted">{item.body}</p>
                  <ul className="mt-5 flex flex-col gap-1.5 text-meta text-faint">
                    {item.scope.map((s) => (
                      <li key={s} className="flex items-center gap-3">
                        <span aria-hidden className="size-1 shrink-0 bg-faint" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="mt-8 text-meta text-faint">
            <span className="mr-3 font-semibold uppercase text-muted">Toolkit</span>
            <Text>{capabilities.toolkit}</Text>
          </p>
        </div>
      </Container>
    </section>
  );
}
