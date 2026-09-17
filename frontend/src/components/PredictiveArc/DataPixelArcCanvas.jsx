import React, { useEffect, useRef } from 'react';
import {
  createDataPixelArcRenderer,
  DATA_PIXEL_ARC_DEFAULTS
} from './dataPixelArcRenderer';

export function DataPixelArcCanvas({
  className = '',
  style = {},
  ...props
}) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const optionsRef = useRef({ ...DATA_PIXEL_ARC_DEFAULTS, ...props });
  optionsRef.current = { ...DATA_PIXEL_ARC_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    const renderer = createDataPixelArcRenderer(canvas, () => optionsRef.current);
    if (!renderer) return undefined;

    let frame = 0;
    let visible = true;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      renderer.resize(bounds.width, bounds.height);
      renderer.render();
    };

    const tick = () => {
      renderer.render();
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };

    const observer = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !frame) frame = requestAnimationFrame(tick);
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    const visibility = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (!document.hidden && visible && !frame) {
        frame = requestAnimationFrame(tick);
      }
    };

    observer.observe(host);
    intersection.observe(host);
    document.addEventListener('visibilitychange', visibility);
    resize();
    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  const hue = optionsRef.current.hue || 0;
  const sat = optionsRef.current.saturation ?? 1;

  return (
    <div
      ref={hostRef}
      className={`threeui-background data-pixel-arc data-pixel-arc--${optionsRef.current.mode || 'dark'} ${className}`}
      data-mode={optionsRef.current.mode || 'dark'}
      style={style}
    >
      <canvas
        ref={canvasRef}
        style={{
          filter: `hue-rotate(${hue}deg) saturate(${sat})`
        }}
      />
    </div>
  );
}
