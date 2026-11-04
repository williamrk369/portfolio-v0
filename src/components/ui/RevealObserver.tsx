"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole page. The CSS only hides
 * [data-reveal] elements once <html data-motion> is set, which happens inside
 * the observer's first callback — in the same task that marks on-screen
 * elements as revealed. So nothing visible ever flashes out, no-JS and
 * reduced-motion visitors always see content, and there is no forced layout.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    let first = true;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          io.unobserve(entry.target);
        }
        if (first) {
          first = false;
          document.documentElement.setAttribute("data-motion", "");
        }
      },
      { threshold: 0 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
