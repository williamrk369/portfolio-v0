import { Fragment, type ReactNode } from "react";

const SPLIT = /(\[[^\]]+\])/g;
const WHOLE = /^\[[^\]]+\]$/;

/** True when a value is (or contains) a [placeholder]. */
export function isPlaceholder(value: string): boolean {
  return /\[[^\]]+\]/.test(value);
}

/** Strips brackets — for plain-text contexts like <title> and alt text. */
export function plain(value: string): string {
  return value.replace(/\[([^\]]+)\]/g, "$1");
}

/**
 * Renders a content string, wrapping every [placeholder] in a visible
 * marker. Real copy passes through untouched.
 */
export function Text({ children }: { children: string }): ReactNode {
  if (!isPlaceholder(children)) return children;
  return children.split(SPLIT).map((part, i) =>
    WHOLE.test(part) ? (
      <span key={i} className="placeholder" title="Placeholder — edit src/content/site.ts">
        {part.slice(1, -1)}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
