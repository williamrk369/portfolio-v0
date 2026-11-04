import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from "react";

type Props<T extends ElementType> = { as?: T; delay?: number } & ComponentPropsWithoutRef<T>;

/**
 * Marks an element for the scroll-triggered entrance. Pure markup — the
 * single RevealObserver client component does the work, so sections stay
 * Server Components.
 */
export function Reveal<T extends ElementType = "div">({ as, delay = 0, style, ...rest }: Props<T>) {
  const Tag = as ?? "div";
  return <Tag data-reveal="" style={{ ...style, "--reveal-delay": delay } as CSSProperties} {...rest} />;
}
