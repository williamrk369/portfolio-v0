"use client";

import { useEffect, useRef } from "react";
import type { SceneHandle } from "./scene";
import { createScene } from "./scene";
import { initScrollMotion, restingState } from "./scroll";

/** Hand the main thread back to the browser between startup phases. */
const yieldToMain = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

/** Token values the WebGL object draws with (mirrors globals.css). */
const PALETTE = { line: "#6a6a74", point: "#f5f5f3", accent: "#eeff41", signal: "#ff397d" };

/**
 * Fixed WebGL layer behind the page plus all scroll choreography.
 * GSAP and Three.js are loaded after the page is idle, in their own chunks,
 * so neither competes with the first paint or hydration.
 */
export function MotionLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    let stop: (() => void) | undefined;
    let scene: SceneHandle | null = null;

    const start = async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      if (cancelled) return;
      await yieldToMain();

      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const state = restingState(desktop);
      const canvas = canvasRef.current;

      if (canvas) {
        const THREE = await import("three");
        if (cancelled) return;
        await yieldToMain();
        scene = createScene(THREE, canvas, state, PALETTE, { animate: motion });
        await yieldToMain();
        if (cancelled) {
          scene?.dispose();
          return;
        }
      }

      stop = initScrollMotion({
        gsap,
        ScrollTrigger,
        SplitText,
        state,
        onSceneReady: () => scene && canvas?.setAttribute("data-ready", ""),
      });
    };

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => void start(), { timeout: 1500 });

    return () => {
      cancelled = true;
      cancelIdle(handle);
      stop?.();
      scene?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-lvh w-full opacity-0 transition-opacity duration-1000 data-ready:opacity-100"
    />
  );
}
