import type { ComponentPropsWithoutRef, ElementType } from "react";

type Props<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;

/**
 * Marks an element for the scroll-triggered entrance. Pure markup — GSAP in
 * MotionLayer does the work, so sections stay Server Components.
 */
export function Reveal<T extends ElementType = "div">({ as, ...rest }: Props<T>) {
  const Tag: ElementType = as ?? "div";
  return <Tag data-reveal="" {...rest} />;
}
