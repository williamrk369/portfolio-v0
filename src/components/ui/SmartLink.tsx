import type { ReactNode } from "react";
import { isPlaceholder, Text } from "@/lib/content";

type Props = { href: string; children: ReactNode; className?: string };

/**
 * A link that refuses to be dead: when href is still a [placeholder] it
 * renders as marked text instead of an anchor.
 */
export function SmartLink({ href, children, className = "" }: Props) {
  if (isPlaceholder(href)) {
    const textOnly = className
      .split(/\s+/)
      .filter((c) => !/^(underline|decoration-|underline-offset-|hover:|transition)/.test(c))
      .join(" ");
    return (
      <span className={`${textOnly} text-muted`}>
        {children} <Text>{"[add link]"}</Text>
      </span>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} className={className} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  );
}
