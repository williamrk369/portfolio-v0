import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { Text } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * Centred monument: label, two-line headline, one-line body, proof, CTAs.
 * CSS-only entrance. The headline and intro are LCP candidates, so they use
 * `lift` (transform only, painted from the first frame); small pieces fade.
 */
const rise = "motion-safe:animate-rise";
const lift = "motion-safe:animate-lift";
const delay = (step: number) => ({ animationDelay: `${step * 70}ms` });

export function Hero() {
  const { hero } = site;
  return (
    <section data-hero aria-labelledby="hero-title" className="pt-20 pb-16 md:pt-32 md:pb-24">
      <Container className="flex flex-col items-center text-center">
        <p
          style={delay(0)}
          className={`${rise} flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-meta font-semibold uppercase text-fg`}
        >
          <span aria-hidden className="size-2 bg-signal" />
          {hero.label}
          {/* The separator wraps together with the location, never alone. */}
          <span className="flex items-center gap-3 font-medium normal-case tracking-normal text-faint">
            <span aria-hidden>/</span>
            <Text>{site.location}</Text>
          </span>
        </p>

        <h1 id="hero-title" className="mt-10 text-hero text-fg md:mt-12">
          {hero.headline.map((line, i) => (
            <span key={i} style={delay(i)} className={`${lift} block`}>
              {line.map((part, j) =>
                "accent" in part && part.accent ? (
                  <span key={j} className="text-accent">
                    {part.text}
                  </span>
                ) : (
                  part.text
                ),
              )}
            </span>
          ))}
        </h1>

        <div style={delay(2)} className={`${lift} mt-10 flex flex-col items-center md:mt-12`}>
          <p className="max-w-[34rem] text-lead text-muted">{hero.intro}</p>
          {/* Proof sits right under the claim it backs. */}
          <p className="mt-3 max-w-[34rem] text-body text-fg">
            <Text>{hero.proof}</Text>
          </p>
        </div>

        <div style={delay(3)} className={`${rise} mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row`}>
          <ButtonLink href="#work" className="w-full sm:w-auto" icon={<ArrowDown size={18} strokeWidth={2.25} />}>
            {`See ${site.projects.length} projects`}
          </ButtonLink>
          <ButtonLink href="#contact" variant="secondary" className="w-full sm:w-auto">
            {hero.secondaryCta}
          </ButtonLink>
        </div>

        <p style={delay(4)} className={`${rise} mt-6 text-meta text-faint`}>
          <Text>{site.availability}</Text>
        </p>
      </Container>
    </section>
  );
}
