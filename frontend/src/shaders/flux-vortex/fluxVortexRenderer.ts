import * as THREE from "three128";

export type FluxVortexOptions = {
  speed: number;
  size: number;
  opacity: number;
  length: number;
  density: number;
  hue: number;
  saturation: number;
  brightness: number;
};

export const FLUX_VORTEX_DEFAULTS: FluxVortexOptions = {
  speed: 1.0,
  size: 1.0,
  opacity: 1.0,
  length: 1.0,
  density: 1.0,
  hue: 0,
  saturation: 1.0,
  brightness: 1.0,
};

export function createFluxVortexRenderer(
  canvas: HTMLCanvasElement,
  getOptions: () => FluxVortexOptions
) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
  camera.position.z = 6.2;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // 1. Vortex Particle Field
  const vortexCount = 9500;
  const vortexPositions = new Float32Array(vortexCount * 3);
  const vortexRadius = new Float32Array(vortexCount);
  const vortexAngle = new Float32Array(vortexCount);
  const vortexHeight = new Float32Array(vortexCount);
  const vortexSpeed = new Float32Array(vortexCount);

  for (let i = 0; i < vortexCount; i++) {
    const i3 = i * 3;
    const y = (Math.random() - 0.5) * 7.5;
    const funnel = 0.4 + Math.abs(y) * 0.2;
    const r = (0.1 + Math.pow(Math.random(), 1.5) * 2.5) * funnel;
    const a = Math.random() * Math.PI * 2;

    vortexHeight[i] = y;
    vortexRadius[i] = r;
    vortexAngle[i] = a;
    vortexSpeed[i] = 0.5 + Math.random() * 0.8;

    vortexPositions[i3] = Math.cos(a) * r;
    vortexPositions[i3 + 1] = y;
    vortexPositions[i3 + 2] = Math.sin(a) * r;
  }

  const vortexGeometry = new THREE.BufferGeometry();
  vortexGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vortexPositions, 3)
  );

  const vortexMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: 0xdddddd,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const vortexPoints = new THREE.Points(vortexGeometry, vortexMaterial);
  mainGroup.add(vortexPoints);

  // 2. Spiral Guides
  function createSpiralLine(turnOffset: number, color: number) {
    const spiralPoints: THREE.Vector3[] = [];
    const pointCount = 400;
    for (let i = 0; i < pointCount; i++) {
      const t = i / (pointCount - 1);
      const angle = t * Math.PI * 14 + turnOffset;
      const radius = 0.2 + t * 2.8;
      const y = (0.5 - t) * 6.0;
      spiralPoints.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        )
      );
    }
    const spiralGeometry = new THREE.BufferGeometry().setFromPoints(spiralPoints);
    const spiralMaterial = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    return { line: new THREE.Line(spiralGeometry, spiralMaterial), geometry: spiralGeometry, material: spiralMaterial };
  }

  const spiralA = createSpiralLine(0, 0x555555);
  const spiralB = createSpiralLine(Math.PI, 0xdddddd);
  mainGroup.add(spiralA.line);
  mainGroup.add(spiralB.line);

  // 3. Ambient Particles
  const ambientCount = 300;
  const ambientPositions = new Float32Array(ambientCount * 3);
  for (let i = 0; i < ambientCount * 3; i++) {
    ambientPositions[i] = (Math.random() - 0.5) * 12;
  }
  const ambientGeometry = new THREE.BufferGeometry();
  ambientGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(ambientPositions, 3)
  );
  const ambientMaterial = new THREE.PointsMaterial({
    size: 0.018,
    color: 0x888888,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const ambientMesh = new THREE.Points(ambientGeometry, ambientMaterial);
  scene.add(ambientMesh);

  // Mouse Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const handleMouseMove = (event: MouseEvent) => {
    const halfX = window.innerWidth / 2;
    const halfY = window.innerHeight / 2;
    mouseX = (event.clientX - halfX) * 0.0008;
    mouseY = (event.clientY - halfY) * 0.0006;
  };

  window.addEventListener("mousemove", handleMouseMove, { passive: true });

  const clock = new THREE.Clock();

  return {
    resize(width: number, height: number) {
      camera.aspect = width / Math.max(1, height);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);

      if (width >= 1024) {
        camera.position.z = 6.2;
        mainGroup.scale.setScalar(1.1);
      } else {
        camera.position.z = 7.5;
        mainGroup.scale.setScalar(0.95);
      }
    },
    render() {
      const options = getOptions();
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime() * options.speed;

      targetX = mouseX;
      targetY = mouseY;

      mainGroup.rotation.y += 0.003 * options.speed;
      mainGroup.rotation.y += 0.03 * (targetX - mainGroup.rotation.y);
      mainGroup.rotation.x += 0.03 * (targetY - mainGroup.rotation.x);

      vortexMaterial.size = 0.015 * options.size;
      vortexMaterial.opacity = 0.75 * options.opacity;

      const positions = vortexGeometry.attributes.position.array as Float32Array;
      const count = Math.floor(vortexCount * Math.min(1.0, options.density));

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const spin =
          elapsedTime * vortexSpeed[i] * 0.5 + vortexHeight[i] * 0.5;
        const angle = vortexAngle[i] + spin;
        const pulse = Math.sin(elapsedTime * 1.2 + i * 0.01) * 0.05;
        const radius = (vortexRadius[i] + pulse) * options.length;

        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] =
          vortexHeight[i] + Math.sin(elapsedTime + i * 0.02) * 0.03;
        positions[i3 + 2] = Math.sin(angle) * radius;
      }
      vortexGeometry.attributes.position.needsUpdate = true;

      spiralA.line.rotation.y = elapsedTime * 0.15;
      spiralB.line.rotation.y = -elapsedTime * 0.12;

      ambientMesh.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    },
    dispose() {
      window.removeEventListener("mousemove", handleMouseMove);
      vortexGeometry.dispose();
      vortexMaterial.dispose();
      spiralA.geometry.dispose();
      spiralA.material.dispose();
      spiralB.geometry.dispose();
      spiralB.material.dispose();
      ambientGeometry.dispose();
      ambientMaterial.dispose();
      renderer.dispose();
    },
  };
}
