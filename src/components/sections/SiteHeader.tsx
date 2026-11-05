import { site } from "@/content/site";
import { Text } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <a href="#top" className="group flex items-baseline gap-3">
          <span className="font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-fg">
            <Text>{site.name}</Text>
          </span>
          <span className="hidden text-meta text-faint lg:inline">{site.role}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative py-2 text-[0.9375rem] font-medium text-muted transition-colors duration-200 hover:text-fg after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-300 after:ease-out-quart hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <ButtonLink href={site.navCta.href} size="md">
            {site.navCta.label}
          </ButtonLink>
        </div>

        <MobileNav items={site.nav} />
      </Container>
    </header>
  );
}
