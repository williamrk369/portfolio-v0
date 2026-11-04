import type { ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 border font-sans font-semibold tracking-[-0.005em] " +
  "transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out-quart " +
  "motion-safe:active:translate-x-0 motion-safe:active:translate-y-0 motion-safe:active:shadow-none";

const variants: Record<Variant, string> = {
  // Dark text on yellow only — never light text on the accent.
  primary:
    "border-accent bg-accent text-ink " +
    "hover:shadow-[4px_4px_0_0_var(--color-signal)] motion-safe:hover:-translate-x-1 motion-safe:hover:-translate-y-1",
  secondary:
    "border-line-strong bg-transparent text-fg " +
    "hover:border-fg hover:bg-fg hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", size = "lg", icon, className = "" }: Props) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span>{children}</span>
      {icon ? (
        <span aria-hidden className="transition-transform duration-200 ease-out-quart motion-safe:group-hover/btn:translate-x-0.5">
          {icon}
        </span>
      ) : null}
    </a>
  );
}
