'use client';
import { useEffect } from 'react';

/**
 * ScrollAnimator — adds a 'revealed' class to all [data-reveal] elements
 * when they enter the viewport via IntersectionObserver.
 * Renders no UI; runs once on mount.
 */
export default function ScrollAnimator() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
