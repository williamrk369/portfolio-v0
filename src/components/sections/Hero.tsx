import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { Text } from "@/lib/content";
import { Container, grid } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroFigure } from "./HeroFigure";

/**
 * CSS-only staggered entrance — no JS, so nothing waits on hydration.
 * The headline and intro are the LCP candidates, so they use `lift`
 * (transform only, painted from the first frame); smaller pieces fade.
 */
const rise = "motion-safe:animate-rise";
const lift = "motion-safe:animate-lift";
const delay = (step: number) => ({ animationDelay: `${step * 70}ms` });

export function Hero() {
  const { hero } = site;
  return (
    <section data-hero aria-labelledby="hero-title" className="pt-12 pb-section md:pt-20">
      <Container>
        <div className={`${grid} gap-y-12 md:gap-y-16`}>
          <p
            style={delay(0)} className={`${rise} col-span-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-meta font-semibold uppercase md:col-span-12`}
          >
            <span className="flex items-center gap-3 text-fg">
              <span aria-hidden className="size-2 bg-signal" />
              {hero.label}
            </span>
            <span className="font-medium normal-case tracking-normal text-faint">
              <Text>{site.location}</Text>
            </span>
          </p>

          <h1 id="hero-title" className="col-span-4 -mt-4 text-hero text-fg md:col-span-12 md:-mt-6">
            <span style={delay(0)} className={`${lift} block`}>
              {hero.headline.before}
              <span className="relative whitespace-nowrap text-accent">{hero.headline.emphasis}</span>
            </span>
            <span style={delay(1)} className={`${lift} block md:pl-[calc((100%-11*1.5rem)/12+1.5rem)]`}>
              {hero.headline.after}
            </span>
          </h1>

          <div style={delay(2)} className={`${lift} col-span-4 flex flex-col md:col-span-8 lg:col-span-5`}>
            <p className="max-w-read text-lead text-muted">{hero.intro}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <ButtonLink href="#work" icon={<ArrowDown size={18} strokeWidth={2.25} />}>
                View Projects
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Contact Me
              </ButtonLink>
            </div>
            <p className="mt-8 text-meta text-faint lg:mt-auto">
              <Text>{site.availability}</Text>
            </p>
          </div>

          <div style={delay(5)} className={`${rise} col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-7`}>
            <HeroFigure />
          </div>
        </div>
      </Container>
    </section>
  );
}
