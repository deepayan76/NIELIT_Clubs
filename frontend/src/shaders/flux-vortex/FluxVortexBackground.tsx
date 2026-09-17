import { useEffect, useRef } from "react";
import {
  createFluxVortexRenderer,
  FLUX_VORTEX_DEFAULTS,
  type FluxVortexOptions,
} from "./fluxVortexRenderer";

export type FluxVortexBackgroundProps = Partial<FluxVortexOptions> & {
  className?: string;
};

export function FluxVortexBackground({
  className = "",
  ...props
}: FluxVortexBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef({ ...FLUX_VORTEX_DEFAULTS, ...props });
  optionsRef.current = { ...FLUX_VORTEX_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    const renderer = createFluxVortexRenderer(canvas, () => optionsRef.current);
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

    const resizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !frame) frame = requestAnimationFrame(tick);
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    resizeObserver.observe(host);
    intersection.observe(host);
    resize();
    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={`threeui-background flux-vortex${
        className ? ` ${className}` : ""
      }`}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "transparent",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          filter: optionsRef.current.hue
            ? `hue-rotate(${optionsRef.current.hue}deg)`
            : undefined,
        }}
      />
    </div>
  );
}
