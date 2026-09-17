import { useState, useEffect } from 'react';

/**
 * Hook to track whether an element is in the viewport using IntersectionObserver.
 * @param {React.RefObject} targetRef - Ref of the target element.
 * @param {string} rootMargin - Margin around the root (default '150px').
 * @returns {boolean} isInView
 */
export function useInView(targetRef, rootMargin = '150px') {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetRef, rootMargin]);

  return isInView;
}
