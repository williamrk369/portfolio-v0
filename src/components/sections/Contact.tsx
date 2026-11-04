import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { plain, Text } from "@/lib/content";
import { Container, grid } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SmartLink } from "@/components/ui/SmartLink";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const { contact } = site;
  const email = plain(site.email);
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line-strong py-section">
      <Container>
        <Reveal className={`${grid} gap-y-12`}>
          <div className="col-span-4 md:col-span-12 lg:col-span-9">
            <p className="mb-8 flex items-center gap-3 text-meta font-semibold uppercase text-faint">
              <span aria-hidden className="font-mono text-signal">
                (05)
              </span>
              <span>{contact.eyebrow}</span>
            </p>
            <h2
              id="contact-title"
              className="text-[clamp(2.25rem,1.2rem+4.6vw,5.75rem)] leading-[0.98] tracking-[-0.04em] text-fg"
            >
              {contact.heading}
            </h2>
          </div>

          <div className="col-span-4 md:col-span-6 lg:col-span-5">
            <p className="max-w-read text-lead text-muted">{contact.body}</p>
          </div>

          <div className="col-span-4 flex flex-col items-start gap-6 md:col-span-6 lg:col-span-5 lg:col-start-8">
            <ButtonLink href={`mailto:${email}`} icon={<ArrowUpRight size={18} strokeWidth={2.25} />}>
              Email me
            </ButtonLink>
            <p className="font-mono text-[0.9375rem] text-muted break-all">
              <Text>{site.email}</Text>
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
