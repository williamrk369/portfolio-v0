/**
 * Scroll choreography, built on GSAP ScrollTrigger + SplitText.
 *
 * Rules this file keeps:
 * - Nothing on screen when it runs is ever hidden: only elements below the
 *   fold get an entrance state, so there is no flash of disappearing content.
 * - Everything is inside gsap.matchMedia, so prefers-reduced-motion gets a
 *   static page (and a static object) and resizing rebuilds cleanly.
 * - Motion is scrubbed to scroll or plays once; nothing hijacks scrolling.
 */

import type { SceneState } from "./scene";

type GSAP = typeof import("gsap").gsap;
type ST = typeof import("gsap/ScrollTrigger").ScrollTrigger;
type Split = typeof import("gsap/SplitText").SplitText;

type Keyframes = Record<"hero" | "work" | "capabilities" | "approach" | "about" | "contact", SceneState>;

const base = { spread: 0, rot: 0, opacity: 1, accent: 0 };

/** Where the object sits as each section arrives (viewport fractions). */
const DESKTOP: Keyframes = {
  hero: { ...base, x: 0.34, y: 0.2, size: 0.3 },
  work: { ...base, x: 0.46, y: 0.36, size: 0.12, spread: 0.9, rot: 1.4, opacity: 0.5 },
  capabilities: { ...base, x: -0.3, y: -0.2, size: 0.28, spread: 0.12, rot: 2.6 },
  approach: { ...base, x: 0, y: 0.05, size: 0.22, spread: 1.1, rot: 3.6, opacity: 0.5 },
  about: { ...base, x: 0.43, y: 0.37, size: 0.08, spread: 0.4, rot: 4.4, opacity: 0.8 },
  contact: { ...base, x: 0.28, y: 0.15, size: 0.36, rot: 5.6, accent: 1 },
};

const MOBILE: Keyframes = {
  hero: { ...base, x: 0.46, y: 0.24, size: 0.26, opacity: 0.32 },
  work: { ...base, x: 0.42, y: 0.36, size: 0.1, spread: 0.9, rot: 1.4, opacity: 0.35 },
  capabilities: { ...base, x: 0.38, y: 0.34, size: 0.14, spread: 0.2, rot: 2.6, opacity: 0.45 },
  approach: { ...base, x: 0.2, y: 0.3, size: 0.12, spread: 1.1, rot: 3.6, opacity: 0.3 },
  about: { ...base, x: 0.34, y: 0.4, size: 0.08, spread: 0.4, rot: 4.4, opacity: 0.5 },
  contact: { ...base, x: 0.32, y: -0.1, size: 0.17, rot: 5.6, opacity: 0.85, accent: 1 },
};

export const restingState = (desktop: boolean): SceneState => ({ ...(desktop ? DESKTOP : MOBILE).hero });

const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight;

export function initScrollMotion({
  gsap,
  ScrollTrigger,
  SplitText,
  state,
  onSceneReady,
}: {
  gsap: GSAP;
  ScrollTrigger: ST;
  SplitText: Split;
  state: SceneState;
  /** Called once the object's start state is set, so the canvas can fade in. */
  onSceneReady?: () => void;
}): () => void {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const mm = gsap.matchMedia();

  mm.add(
    {
      desktop: "(min-width: 768px)",
      motion: "(prefers-reduced-motion: no-preference)",
    },
    (ctx) => {
      const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
      const K = desktop ? DESKTOP : MOBILE;

      /* --- Object: one scrubbed segment per section -------------------- */
      Object.assign(state, K.hero);
      if (!motion) {
        onSceneReady?.();
        return; // Static object, static page.
      }

      const atTop = window.scrollY < 80;
      if (atTop) {
        // Load moment: the object assembles itself once.
        gsap.from(state, { spread: 1.6, opacity: 0, rot: -1.2, duration: 2.2, ease: "expo.out", delay: 0.2 });
      }
      onSceneReady?.();

      const order = ["work", "capabilities", "approach", "about", "contact"] as const;
      let prev: SceneState = K.hero;
      order.forEach((id, i) => {
        const section = document.getElementById(id);
        if (!section) return;
        const last = i === order.length - 1;
        gsap.fromTo(
          state,
          { ...prev },
          {
            ...K[id],
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: last ? "bottom bottom" : "top 20%",
              scrub: 1.2,
            },
          },
        );
        prev = K[id];
      });

      // The object's scroll path is set up first. Each DOM group then gets its
      // own task, so startup never becomes one long main-thread block.
      const timers = domSteps(desktop).map((step, i) =>
        window.setTimeout(() => ctx.add(step), 16 * (i + 1)),
      );
      return () => timers.forEach((t) => window.clearTimeout(t));
    },
  );

  function domSteps(desktop: boolean): Array<() => void> {
    return [
      /* --- Hero: headline and figure drift as the page leaves ---------- */
      () => {
        const hero = document.querySelector("[data-hero]");
        if (!hero) return;
        const scrub = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
        gsap.to("#hero-title", { yPercent: -18, opacity: 0.25, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-hero-figure]", { y: -60, ease: "none", scrollTrigger: scrub });
      },

      /* --- Headings: lines rise out of a mask -------------------------- */
      () => {
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          if (!belowFold(el)) return;
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1,
                ease: "expo.out",
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });
      },

      /* --- Blocks: fade and rise in small batches ---------------------- */
      () => {
        const blocks = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(belowFold);
        gsap.set(blocks, { opacity: 0, y: 36 });
        ScrollTrigger.batch(blocks, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
        });
      },

      /* --- Project previews: inner art moves against the frame --------- */
      () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      },

      /* --- Approach: the rail draws itself, step by step --------------- */
      () => {
        const steps = document.querySelector("[data-steps]");
        if (!steps) return;
        const rails = steps.querySelectorAll("[data-rail]");
        const markers = steps.querySelectorAll("[data-marker]");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: steps,
            start: desktop ? "top 85%" : "top 80%",
            end: desktop ? "top 55%" : "bottom 75%",
            scrub: 1,
          },
        });
        markers.forEach((marker, i) => {
          tl.from(marker, { scale: 0, duration: 0.2, ease: "back.out(3)" }, i);
          if (rails[i]) {
            tl.from(
              rails[i],
              desktop
                ? { scaleX: 0, transformOrigin: "left center", duration: 1, ease: "none" }
                : { scaleY: 0, transformOrigin: "center top", duration: 1, ease: "none" },
              i + 0.1,
            );
          }
        });
      },

      /* --- Portrait: wipes open from the top --------------------------- */
      () => {
        const portrait = document.querySelector<HTMLElement>("[data-portrait]");
        if (!portrait || !belowFold(portrait)) return;
        gsap.from(portrait, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.3,
          ease: "expo.inOut",
          clearProps: "clipPath",
          scrollTrigger: { trigger: portrait, start: "top 85%", once: true },
        });
      },
    ];
  }

  // Fonts change line lengths. Motion usually starts after they've loaded;
  // only re-measure if they arrive later.
  if (document.fonts && document.fonts.status !== "loaded") {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  return () => mm.revert();
}
