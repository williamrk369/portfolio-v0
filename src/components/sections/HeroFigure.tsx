/**
 * Fig. 01 — an illustrative trace of one AI feature request, drawn as a
 * waterfall. It describes the kind of system I build; it is explicitly
 * labelled as an illustration and carries no invented metrics.
 */

type Span = {
  name: string;
  note: string;
  start: number; // % of the track
  width: number; // % of the track
  tone: "base" | "accent" | "signal";
};

const spans: Span[] = [
  { name: "interface", note: "streaming UI", start: 0, width: 100, tone: "base" },
  { name: "api", note: "typed contract · auth", start: 3, width: 93, tone: "base" },
  { name: "retrieve", note: "hybrid search · rerank", start: 8, width: 24, tone: "base" },
  { name: "model", note: "tools · structured output", start: 32, width: 44, tone: "accent" },
  { name: "evaluate", note: "checks · guardrails", start: 76, width: 14, tone: "signal" },
  { name: "observe", note: "traces · cost", start: 90, width: 6, tone: "base" },
];

const toneClass: Record<Span["tone"], string> = {
  base: "bg-muted/55",
  accent: "bg-accent",
  signal: "bg-signal",
};

export function HeroFigure() {
  return (
    <figure className="shadow-hard border border-line-strong bg-surface">
      <div className="flex items-center justify-between border-b border-line-strong px-4 py-3 text-meta md:px-6">
        <span className="font-mono text-fg">fig. 01</span>
        <span className="font-mono text-faint">illustrative</span>
      </div>

      <div className="bg-blueprint px-4 py-6 md:px-6 md:py-8">
        <ol className="flex flex-col gap-4" aria-label="Stages of a production AI request">
          {spans.map((s, i) => (
            <li key={s.name} className="grid grid-cols-[6.5rem_1fr] items-center gap-4 sm:grid-cols-[11rem_1fr]">
              <div className="min-w-0">
                <p
                  className={`font-mono text-[0.8125rem] leading-tight ${s.tone === "accent" ? "text-accent" : s.tone === "signal" ? "text-signal" : "text-fg"}`}
                >
                  <span aria-hidden className="mr-2 text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.name}
                </p>
                <p className="mt-1 hidden truncate text-[0.75rem] leading-tight text-faint sm:block">{s.note}</p>
              </div>
              <div className="relative h-3" aria-hidden>
                <div className="absolute inset-y-0 left-0 right-0 border-l border-line-strong" />
                <div
                  className={`absolute origin-left motion-safe:animate-grow ${i === 0 ? "top-1/2 h-px bg-muted/60" : `inset-y-0 ${toneClass[s.tone]}`}`}
                  style={{
                    left: `${s.start}%`,
                    width: `${s.width}%`,
                    animationDelay: `${450 + i * 90}ms`,
                  }}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line-strong px-4 py-3 text-[0.8125rem] text-muted md:px-6">
        <span>One request, end to end — every stage owned, tested, observed.</span>
        <span className="font-mono text-faint">prompt → production</span>
      </figcaption>
    </figure>
  );
}
