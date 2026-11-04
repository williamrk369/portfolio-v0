import Image from "next/image";
import { site } from "@/content/site";
import { Text } from "@/lib/content";
import { Container, grid } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const { about } = site;
  return (
    <section id="about" aria-labelledby="about-title" className="py-section">
      <Container className={`${grid} gap-y-12`}>
        <Reveal className="col-span-4 md:col-span-5 lg:col-span-4">
          <Portrait />
        </Reveal>

        <Reveal delay={80} className="col-span-4 md:col-span-7 lg:col-span-7 lg:col-start-6">
          <p className="mb-6 flex items-center gap-3 text-meta font-semibold uppercase text-faint">
            <span aria-hidden className="font-mono text-signal">
              (04)
            </span>
            <span>{about.heading}</span>
          </p>
          <h2 id="about-title" className="text-title text-fg">
            <Text>{about.lead}</Text>
          </h2>
          <div className="mt-8 flex max-w-read flex-col gap-5 text-lead text-muted">
            {about.body.map((p, i) => (
              <p key={i}>
                <Text>{p}</Text>
              </p>
            ))}
          </div>

          <dl className="mt-12 grid grid-cols-1 border-t border-line sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {about.facts.map((fact) => (
              <div key={fact.label} className="border-b border-line py-4 sm:border-b-0 sm:pr-6 md:border-b lg:border-b-0">
                <dt className="text-meta font-semibold uppercase text-faint">{fact.label}</dt>
                <dd className="mt-2 text-body text-fg">
                  <Text>{fact.value}</Text>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}

function Portrait() {
  const { portrait } = site.about;
  return (
    <figure>
      <div className="shadow-hard relative aspect-[4/5] overflow-hidden border border-line-strong bg-blueprint max-md:w-4/5">
        {portrait ? (
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 40vw, 100vw"
            className="h-full w-full object-cover"
          />
        ) : (
          <div aria-hidden className="absolute inset-0">
            {/* registration marks */}
            {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "right-4 bottom-4 border-r border-b"].map(
              (pos) => (
                <span key={pos} className={`absolute size-6 border-muted/60 ${pos}`} />
              ),
            )}
            <span className="absolute inset-x-[18%] top-[22%] bottom-0 rounded-t-full border border-b-0 border-line-strong" />
            <span className="absolute top-[30%] left-1/2 size-[30%] -translate-x-1/2 rounded-full border border-line-strong bg-ink" />
          </div>
        )}
      </div>
      {!portrait ? (
        <figcaption className="mt-3 text-meta text-faint">
          <Text>{"[Portrait — add a photo in src/content/site.ts]"}</Text>
        </figcaption>
      ) : null}
    </figure>
  );
}
