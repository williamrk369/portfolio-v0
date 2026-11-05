import Image from "next/image";
import type { Project } from "@/content/site";
import { Text } from "@/lib/content";

type Props = {
  project: Project;
  aspect: string; // Tailwind aspect class
  sizes: string; // responsive image sizes hint
  priority?: boolean;
};

const frame =
  "relative overflow-hidden border border-line-strong bg-blueprint " +
  "transition-[transform,box-shadow,border-color] duration-300 ease-out-quart " +
  "group-hover:border-fg/60 group-hover:shadow-[8px_8px_0_0_var(--color-signal)] " +
  "motion-safe:group-hover:-translate-x-1 motion-safe:group-hover:-translate-y-1";

/** Screenshot if one exists, otherwise an abstract, clearly-labelled stand-in. */
export function ProjectPreview({ project, aspect, sizes, priority }: Props) {
  const { image } = project;
  return (
    <figure>
      <div className={`${frame} ${aspect}`}>
        <div data-parallax className="absolute inset-x-0 -inset-y-[6%]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            priority={priority}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <Abstract variant={project.preview} />
        )}
        </div>
      </div>
      {!image ? (
        <figcaption className="mt-3 text-meta text-faint">
          <Text>{`[Add a screenshot of project ${project.index}]`}</Text>
        </figcaption>
      ) : null}
    </figure>
  );
}

function Abstract({ variant }: { variant: Project["preview"] }) {
  if (variant === "graph") return <GraphArt />;
  if (variant === "terminal") return <TerminalArt />;
  return <InterfaceArt />;
}

/* --- Abstract previews: decorative only, hidden from assistive tech --- */

function InterfaceArt() {
  return (
    <div aria-hidden className="absolute inset-[6%] flex flex-col border border-line-strong bg-ink">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
        <span className="size-2 bg-line-strong" />
        <span className="size-2 bg-line-strong" />
        <span className="size-2 bg-line-strong" />
        <span className="ml-3 h-1.5 w-1/4 bg-line" />
      </div>
      <div className="grid flex-1 grid-cols-[22%_1fr]">
        <div className="flex flex-col gap-3 border-r border-line p-3">
          {[70, 55, 80, 45, 60].map((w, i) => (
            <span key={i} className={`h-1.5 ${i === 1 ? "bg-signal" : "bg-line"}`} style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="flex flex-col justify-between gap-4 p-[6%]">
          <div className="flex flex-col gap-3">
            <span className="h-3 w-2/5 bg-muted/40" />
            <span className="h-1.5 w-4/5 bg-line" />
            <span className="h-1.5 w-3/5 bg-line" />
          </div>
          <div className="ml-auto w-3/5 border border-line bg-surface p-3">
            <span className="block h-1.5 w-4/5 bg-line-strong" />
            <span className="mt-2 block h-1.5 w-1/2 bg-line-strong" />
          </div>
          <div className="w-3/4 border border-line p-3">
            <span className="block h-1.5 w-full bg-muted/30" />
            <span className="mt-2 block h-1.5 w-2/3 bg-muted/30" />
            <span className="mt-2 inline-block h-3 w-1 bg-accent align-middle" />
          </div>
          <div className="flex items-center gap-3 border border-line-strong px-3 py-2">
            <span className="h-1.5 flex-1 bg-line" />
            <span className="size-4 bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GraphArt() {
  const nodes = [
    { x: 14, y: 26 },
    { x: 14, y: 74 },
    { x: 42, y: 50, hot: true },
    { x: 68, y: 22 },
    { x: 68, y: 78, pink: true },
    { x: 88, y: 50 },
  ];
  const edges = [
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
    [3, 5],
    [4, 5],
  ];
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      {edges.map(([a, b]) => (
        <path
          key={`${a}-${b}`}
          d={`M${nodes[a].x} ${nodes[a].y} H${(nodes[a].x + nodes[b].x) / 2} V${nodes[b].y} H${nodes[b].x}`}
          fill="none"
          stroke="var(--color-line-strong)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {nodes.map((n, i) => (
        <rect
          key={i}
          x={n.x - 5}
          y={n.y - 6}
          width="10"
          height="12"
          fill={n.hot ? "var(--color-accent)" : "var(--color-ink)"}
          stroke={n.pink ? "var(--color-signal)" : n.hot ? "var(--color-accent)" : "var(--color-muted)"}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

function TerminalArt() {
  const lines = [
    [8, 30],
    [12, 48],
    [12, 36],
    [8, 22],
    [12, 54, "pink"],
    [12, 40],
    [8, 26],
    [12, 44, "accent"],
    [12, 32],
  ] as const;
  return (
    <div aria-hidden className="absolute inset-[8%] flex flex-col justify-center gap-[7%] border border-line-strong bg-ink p-[8%]">
      {lines.map(([indent, width, tone], i) => (
        <div key={i} className="flex items-center gap-3" style={{ paddingLeft: `${indent - 8}%` }}>
          <span className="h-1.5 w-1.5 shrink-0 bg-faint/60" />
          <span
            className={`h-1.5 ${tone === "pink" ? "bg-signal" : tone === "accent" ? "bg-accent" : "bg-line-strong"}`}
            style={{ width: `${width}%` }}
          />
        </div>
      ))}
    </div>
  );
}
