import { useState, useEffect } from 'react';

/**
 * Tracks the scroll progress (0.0 to 1.0) of an element as it enters and moves through the viewport.
 * @param {React.RefObject} targetRef - Ref of the element to track
 * @returns {number} scrollProgress (0 to 1)
 */
export function useScrollProgress(targetRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = targetRef.current;
    if (!el || typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!targetRef.current) return;
          const rect = targetRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;

          // Progress from bottom of viewport (0) to center/top (1)
          const totalDistance = windowHeight + rect.height;
          const currentDistance = windowHeight - rect.top;
          const rawProgress = currentDistance / totalDistance;
          const clamped = Math.max(0, Math.min(1, rawProgress));

          setProgress(clamped);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [targetRef]);

  return progress;
}
