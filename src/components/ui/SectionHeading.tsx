import { Text } from "@/lib/content";

type Props = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
};

/** Centred eyebrow "(02) Skills" + Syne H2 + optional one-line intro. */
export function SectionHeading({ id, index, eyebrow, title, intro, className = "" }: Props) {
  return (
    <header className={`mx-auto flex max-w-3xl flex-col items-center text-center ${className}`}>
      <p className="mb-6 flex items-center gap-3 text-meta font-semibold uppercase text-faint">
        <span className="font-mono text-signal" aria-hidden>
          ({index})
        </span>
        <span>{eyebrow}</span>
      </p>
      <h2 id={id} data-split className="text-display text-fg">
        <Text>{title}</Text>
      </h2>
      {intro ? (
        <p data-reveal className="mt-6 max-w-read text-lead text-muted">
          <Text>{intro}</Text>
        </p>
      ) : null}
    </header>
  );
}
