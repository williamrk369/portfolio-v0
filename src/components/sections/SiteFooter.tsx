import { ArrowUp } from "lucide-react";
import { site } from "@/content/site";
import { Text } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  return (
    <footer className="relative z-[1] border-t border-line">
      <Container className="flex flex-col gap-6 py-8 text-meta text-faint md:flex-row md:items-center md:justify-between">
        <p>
          © {site.copyrightYear} <Text>{site.name}</Text>. {site.role}.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex min-h-6 items-center transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#top" className="inline-flex min-h-6 items-center gap-1 text-fg transition-colors hover:text-accent">
                Back to top <ArrowUp aria-hidden size={14} />
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
