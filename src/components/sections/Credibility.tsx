import { site } from "@/content/site";
import { Text } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** A ruled index of facts — compact proof, no invented numbers. */
export function Credibility() {
  const { credibility } = site;
  return (
    <section aria-labelledby="glance-title">
      <Container>
        <Reveal className="border-y border-line-strong">
          <h2 id="glance-title" className="sr-only">
            {credibility.heading}
          </h2>
          <dl className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {credibility.items.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-3 bg-ink py-6 pr-6 sm:even:pl-6 lg:py-8 lg:not-first:pl-6"
              >
                <dt className="text-meta font-semibold uppercase text-faint">{item.label}</dt>
                <dd className="font-display text-subtitle font-semibold text-fg">
                  <Text>{item.value}</Text>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
