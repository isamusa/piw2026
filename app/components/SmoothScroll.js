'use client';
import { useEffect } from 'react';

/**
 * SmoothScroll — initialises Lenis buttery-smooth scroll on mount.
 * Renders no UI. Import once in layout or page.
 */
export default function SmoothScroll() {
  useEffect(() => {
    let lenis;
    let rafId;

    const init = async () => {
      try {
        const { default: Lenis } = await import('lenis');
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
        });

        const raf = (time) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch {
        // lenis not yet installed — silently skip
      }
    };

    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}
