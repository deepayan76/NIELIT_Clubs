/**
 * Data Pixel Arc Renderer
 * Authoritative implementation from https://threeui.com/source-code/predictive-arc.json
 */

export const DATA_PIXEL_ARC_DEFAULTS = {
  mode: 'dark',
  speed: 1,
  pixelSize: 8,
  arcCenter: 0.4,
  arcDrop: 0.9,
  thickness: 0.35,
  brightness: 1,
  hue: 0,
  saturation: 1
};

function resolveMode(mode) {
  if (mode === 'light' || mode === 1 || mode === '1') return 'light';
  return 'dark';
}

export function createDataPixelArcRenderer(canvas, getOptions) {
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) return null;

  let width = 1;
  let height = 1;
  let time = 0;
  let lightBackground = null;

  const resize = (nextWidth, nextHeight) => {
    width = Math.max(1, nextWidth);
    height = Math.max(1, nextHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    lightBackground = context.createLinearGradient(0, 0, 0, height);
    lightBackground.addColorStop(0, '#f8faf6');
    lightBackground.addColorStop(0.58, '#f3f6f1');
    lightBackground.addColorStop(1, '#edf1ec');
  };

  const render = () => {
    const options = getOptions();
    const isLight = resolveMode(options.mode) === 'light';

    // In dark mode, fill with deep black/charcoal matching hero
    context.fillStyle = isLight && lightBackground ? lightBackground : '#050708';
    context.fillRect(0, 0, width, height);

    const pixelSize = options.pixelSize || 8;
    const cols = Math.ceil(width / pixelSize);
    const rows = Math.ceil(height / pixelSize);
    const arcCenterY = height * (options.arcCenter ?? 0.4);
    const arcDrop = height * (options.arcDrop ?? 0.9);
    const thickness = height * (options.thickness ?? 0.35);

    for (let x = 0; x < cols; x += 1) {
      for (let y = 0; y < rows; y += 1) {
        const px = x * pixelSize;
        const py = y * pixelSize;
        const nx = (px / width) * 2 - 1;
        const curveY = arcCenterY + Math.pow(Math.abs(nx), 1.8) * arcDrop;
        let intensity = Math.max(0, 1 - Math.abs(py - curveY) / thickness);
        if (intensity <= 0.01) continue;

        const wave1 = Math.sin(nx * 4 - time * 1.5) * 0.1;
        const wave2 = Math.cos(py * 0.01 + time) * 0.1;
        intensity = Math.max(0, Math.min(1, intensity + wave1 + wave2));
        intensity *= Math.max(0, 1 - Math.pow(Math.abs(nx), 2.5));
        if (intensity <= 0.02) continue;

        const coreStrength = Math.pow(intensity, 3);
        const middleStrength = Math.pow(intensity, 1.5);
        let r, g, b;

        if (isLight) {
          // Sage edge pixels hold their shape on paper while the emerald core stays vivid.
          const pigment = Math.pow(intensity, 0.78);
          const inkStrength = Math.max(0.45, Math.min(1.35, options.brightness || 1));
          const paper = [238, 242, 237];
          const ink = [
            192 - 172 * pigment - 10 * coreStrength,
            204 - 88 * pigment + 18 * coreStrength,
            193 - 132 * pigment + 4 * coreStrength
          ];
          r = Math.max(0, Math.min(255, Math.round(paper[0] + (ink[0] - paper[0]) * inkStrength)));
          g = Math.max(0, Math.min(255, Math.round(paper[1] + (ink[1] - paper[1]) * inkStrength)));
          b = Math.max(0, Math.min(255, Math.round(paper[2] + (ink[2] - paper[2]) * inkStrength)));
        } else {
          // Rich emerald green data-pixel spectrum
          r = Math.floor((30 * intensity + 100 * coreStrength) * (options.brightness || 1));
          g = Math.floor((220 * middleStrength + 40 * coreStrength) * (options.brightness || 1));
          b = Math.floor((80 * intensity + 50 * coreStrength) * (options.brightness || 1));
        }

        context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        context.globalAlpha = isLight
          ? Math.min(1, 0.22 + Math.pow(intensity, 0.68) * 0.78)
          : intensity;
        context.fillRect(px, py, pixelSize - 1, pixelSize - 1);
      }
    }

    context.globalAlpha = 1;
    time += 0.02 * (options.speed || 1);
  };

  return { resize, render };
}
