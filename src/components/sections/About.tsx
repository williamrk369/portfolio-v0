import Image from "next/image";
import { site } from "@/content/site";
import { Text } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Centred: small portrait, one-sentence intro, two short lines, three facts. */
export function About() {
  const { about } = site;
  return (
    <section id="about" aria-labelledby="about-title" className="py-section">
      <Container className="flex flex-col items-center text-center">
        <Reveal className="w-40 md:w-48">
          <Portrait />
        </Reveal>

        <Reveal className="mt-12 flex max-w-2xl flex-col items-center">
          <p className="mb-6 flex items-center gap-3 text-meta font-semibold uppercase text-faint">
            <span aria-hidden className="font-mono text-signal">
              (04)
            </span>
            <span>{about.heading}</span>
          </p>
          <h2 id="about-title" className="text-title text-fg">
            <Text>{about.lead}</Text>
          </h2>
          <div className="mt-6 flex max-w-read flex-col gap-3 text-lead text-muted">
            {about.body.map((p, i) => (
              <p key={i}>
                <Text>{p}</Text>
              </p>
            ))}
          </div>
        </Reveal>

        <dl className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-3">
          {about.facts.map((fact) => (
            <div key={fact.label} className="bg-ink px-4 py-5">
              <dt className="text-meta font-semibold uppercase text-faint">{fact.label}</dt>
              <dd className="mt-2 text-body text-fg">
                <Text>{fact.value}</Text>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function Portrait() {
  const { portrait } = site.about;
  return (
    <figure>
      <div data-portrait className="shadow-hard relative aspect-[4/5] overflow-hidden border border-line-strong bg-blueprint">
        {portrait ? (
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="192px"
            className="h-full w-full object-cover"
          />
        ) : (
          <div aria-hidden className="absolute inset-0">
            <span className="absolute inset-x-[18%] top-[22%] bottom-0 rounded-t-full border border-b-0 border-line-strong" />
            <span className="absolute top-[30%] left-1/2 size-[30%] -translate-x-1/2 rounded-full border border-line-strong bg-ink" />
          </div>
        )}
      </div>
      {!portrait ? (
        <figcaption className="mt-3 text-meta text-faint">
          <Text>{"[Add a portrait]"}</Text>
        </figcaption>
      ) : null}
    </figure>
  );
}
