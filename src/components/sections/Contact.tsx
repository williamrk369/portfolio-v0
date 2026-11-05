import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { isPlaceholder, plain, Text } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SmartLink } from "@/components/ui/SmartLink";
import { Reveal } from "@/components/ui/Reveal";

/** Centred close: question headline, the objection answered, then the button. */
export function Contact() {
  const { contact } = site;
  const email = plain(site.email);
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line-strong py-section">
      <Container className="flex flex-col items-center text-center">
        <p className="mb-8 flex items-center gap-3 text-meta font-semibold uppercase text-faint">
          <span aria-hidden className="font-mono text-signal">
            (05)
          </span>
          <span>{contact.eyebrow}</span>
        </p>
        <h2
          id="contact-title"
          data-split
          className="text-[clamp(2.25rem,1.2rem+4.6vw,5.75rem)] leading-[0.98] tracking-[-0.04em] text-fg"
        >
          {contact.heading}
        </h2>

        <Reveal className="mt-8 flex flex-col items-center gap-8">
          <p className="max-w-read text-lead text-muted">
            <Text>{contact.objection}</Text>
          </p>

          {isPlaceholder(site.email) ? (
            // Until a real address exists, show the slot instead of a dead mailto: link.
            <span className="inline-flex min-h-14 flex-wrap items-center justify-center gap-2 border border-dashed border-line-strong px-7 py-3 text-base font-semibold text-muted">
              {contact.cta} <Text>{"[add email in site.ts]"}</Text>
            </span>
          ) : (
            <ButtonLink href={`mailto:${email}`} icon={<ArrowUpRight size={18} strokeWidth={2.25} />}>
              {contact.cta}
            </ButtonLink>
          )}

          <div className="flex flex-col items-center gap-4">
            <p className="font-mono text-[0.9375rem] break-all text-muted">
              <Text>{site.email}</Text>
            </p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {site.social.map((link) => (
                <li key={link.label}>
                  <SmartLink
                    href={link.href}
                    className="text-[0.9375rem] font-semibold text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
