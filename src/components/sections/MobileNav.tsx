"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { LinkItem } from "@/content/site";

/**
 * Disclosure-style menu for small screens: aria-expanded/aria-controls,
 * Escape and outside-click close it, focus returns to the toggle, and the
 * page behind is made inert while it is open.
 */
export function MobileNav({ items }: { items: LinkItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const main = document.getElementById("main");
    main?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => window.matchMedia("(min-width: 48rem)").matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      main?.removeAttribute("inert");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const all = [...items, { label: "Contact", href: "#contact" }];

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 inline-flex h-11 items-center gap-2 px-2 text-[0.9375rem] font-semibold text-fg"
      >
        <span>{open ? "Close" : "Menu"}</span>
        {open ? <X aria-hidden size={20} strokeWidth={2} /> : <Menu aria-hidden size={20} strokeWidth={2} />}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-ink px-gutter pt-8 pb-12"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        <nav aria-label="Mobile">
          <ol className="border-t border-line">
            {all.map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <a
                  href={item.href}
                  className="flex items-baseline justify-between py-5 font-display text-[2rem] leading-none font-bold tracking-[-0.03em] text-fg active:text-accent"
                >
                  {item.label}
                  <span aria-hidden className="font-mono text-meta text-signal">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
