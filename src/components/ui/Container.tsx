import type { ComponentPropsWithoutRef, ElementType } from "react";

type Props<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;

/** 1280px max width with fluid 20 → 48px side padding. */
export function Container<T extends ElementType = "div">({ as, className = "", ...rest }: Props<T>) {
  const Tag = as ?? "div";
  return <Tag className={`mx-auto w-full max-w-page px-gutter ${className}`} {...rest} />;
}

/** 4-column mobile / 12-column desktop grid with a 24px gap. */
export const grid = "grid grid-cols-4 gap-x-6 md:grid-cols-12";
