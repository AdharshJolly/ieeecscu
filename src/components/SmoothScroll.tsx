"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Dampened, heavyweight scrolling configuration
    // Lower wheelMultiplier and touchMultiplier reduce sensitivity and speed
    // Longer duration creates smooth, cinematic momentum and deliberate pacing
    const lenis = new Lenis({
      duration: 1.5, // Heavier, smoother momentum dampening (was 1.1)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.65, // Decreased from 1.0 -> 0.65 to calm mouse wheel speed & sensitivity
      touchMultiplier: 0.9,  // Decreased from 1.5 -> 0.9 to prevent trackpad flying
    });

    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Notify window on scroll for Framer Motion useScroll synchronization
    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("scroll"));
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
}
