import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable } from '../../utils/webgl';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useInView } from '../../hooks/useInView';

/**
 * Pure 3D Interactive Master Scene for NIELIT Tech Clubs Hero.
 * Perfectly fitted within camera viewport frustum to guarantee ZERO clipping
 * on top, bottom, left, and right at any screen size or hover state.
 */
export default function Hero3DScene({ className = '', style = {} }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isMountedRef = useRef(true);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef);
  const isInViewRef = useRef(isInView);

  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    curX: 0,
    curY: 0,
    isHovered: false
  });

  useEffect(() => {
    isMountedRef.current = true;
    if (!isWebGLAvailable()) {
      setWebGLSupported(false);
      return;
    }
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!webGLSupported || prefersReducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebGLSupported(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const onContextLost = (e) => {
      e.preventDefault();
      setWebGLSupported(false);
    };
    canvas.addEventListener('webglcontextlost', onContextLost);

    const scene = new THREE.Scene();

    // Camera setup with generous distance to guarantee zero clipping
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 7.4);

    // ==========================================
    // LIGHTING SYSTEM
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight1.position.set(5, 6, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight2.position.set(-5, -4, -3);
    scene.add(dirLight2);

    // Interactive cursor specular highlight light
    const cursorLight = new THREE.PointLight(0xffffff, 3.2, 14);
    cursorLight.position.set(0, 0, 3.0);
    scene.add(cursorLight);

    // Four Club Color Rim Lights
    const aiLight = new THREE.PointLight(0x10b981, 2.6, 10); // Emerald (AI)
    aiLight.position.set(2.8, 2.2, 1.2);
    scene.add(aiLight);

    const progLight = new THREE.PointLight(0x38bdf8, 2.6, 10); // Blue (Programming)
    progLight.position.set(-2.8, 2.2, 1.2);
    scene.add(progLight);

    const cyberLight = new THREE.PointLight(0xa855f7, 2.4, 10); // Purple (Cybersecurity)
    cyberLight.position.set(-2.6, -2.4, 1.2);
    scene.add(cyberLight);

    const iotLight = new THREE.PointLight(0xf59e0b, 2.4, 10); // Amber (IoT)
    iotLight.position.set(2.6, -2.4, 1.2);
    scene.add(iotLight);

    // ==========================================
    // 3D SCENE ROOT & HIERARCHY
    // ==========================================
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. CORE QUANTUM SPHERE & CRYSTAL LATTICE
    const coreGroup = new THREE.Group();
    masterGroup.add(coreGroup);

    // Inner glowing energy core
    const innerCoreGeo = new THREE.IcosahedronGeometry(0.42, 3);
    const innerCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0x60a5fa,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.45,
      roughness: 0.12,
      metalness: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreGroup.add(innerCoreMesh);

    // Outer faceted geometric lattice cage
    const outerCoreGeo = new THREE.IcosahedronGeometry(0.60, 0);
    const outerCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0xbfdbfe,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.25,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });
    const outerCoreMesh = new THREE.Mesh(outerCoreGeo, outerCoreMat);
    coreGroup.add(outerCoreMesh);

    // Core central pulsing energy octahedron
    const centerEnergyGeo = new THREE.OctahedronGeometry(0.24, 0);
    const centerEnergyMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 1.1,
      roughness: 0.05,
      metalness: 0.95
    });
    const centerEnergyMesh = new THREE.Mesh(centerEnergyGeo, centerEnergyMat);
    coreGroup.add(centerEnergyMesh);

    // Mini Core Equator Dots Ring
    const dotRingGroup = new THREE.Group();
    const dotGeo = new THREE.SphereGeometry(0.018, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd });
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(Math.cos(angle) * 0.72, Math.sin(angle) * 0.72, 0);
      dotRingGroup.add(dot);
    }
    coreGroup.add(dotRingGroup);

    // 2. GYROSCOPIC ORBITAL GIMBAL RINGS (Scaled to fit frustum safely)
    const ringGroup = new THREE.Group();
    masterGroup.add(ringGroup);

    // Ring Material Presets
    const ringMatEmerald = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.45,
      metalness: 0.92,
      roughness: 0.1,
      clearcoat: 0.9
    });

    const ringMatBlue = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.45,
      metalness: 0.94,
      roughness: 0.08,
      clearcoat: 0.95
    });

    const ringMatPurple = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.12,
      clearcoat: 0.85
    });

    const ringMatAmber = new THREE.MeshPhysicalMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      emissiveIntensity: 0.45,
      metalness: 0.92,
      roughness: 0.1,
      clearcoat: 0.9
    });

    // Ring 1 (Inner - Emerald AI Ring)
    const ring1Geo = new THREE.TorusGeometry(0.92, 0.020, 16, 120);
    const ring1Mesh = new THREE.Mesh(ring1Geo, ringMatEmerald);
    ring1Mesh.rotation.x = Math.PI * 0.28;
    ring1Mesh.rotation.z = Math.PI * 0.15;
    ringGroup.add(ring1Mesh);

    // Ring 2 (Middle - Electric Blue Programming Ring)
    const ring2Geo = new THREE.TorusGeometry(1.18, 0.022, 16, 120);
    const ring2Mesh = new THREE.Mesh(ring2Geo, ringMatBlue);
    ring2Mesh.rotation.y = Math.PI * 0.38;
    ring2Mesh.rotation.z = -Math.PI * 0.2;
    ringGroup.add(ring2Mesh);

    // Ring 3 (Outer - Purple Cybersecurity Ring)
    const ring3Geo = new THREE.TorusGeometry(1.42, 0.020, 16, 120);
    const ring3Mesh = new THREE.Mesh(ring3Geo, ringMatPurple);
    ring3Mesh.rotation.x = Math.PI * 0.62;
    ring3Mesh.rotation.z = Math.PI * 0.4;
    ringGroup.add(ring3Mesh);

    // Ring 4 (Equatorial - Amber IoT Ring)
    const ring4Geo = new THREE.TorusGeometry(1.64, 0.016, 16, 140);
    const ring4Mesh = new THREE.Mesh(ring4Geo, ringMatAmber);
    ring4Mesh.rotation.x = Math.PI * 0.5;
    ringGroup.add(ring4Mesh);

    // 3. FOUR ORBITING CLUB SATELLITES (Proportionately scaled)
    const satelliteGroup = new THREE.Group();
    masterGroup.add(satelliteGroup);

    const clubNodes = [
      { name: 'AI', color: 0x10b981, radius: 1.05, speed: 0.75, offset: 0, geo: new THREE.OctahedronGeometry(0.09, 0) },
      { name: 'Programming', color: 0x38bdf8, radius: 1.28, speed: -0.58, offset: Math.PI * 0.5, geo: new THREE.BoxGeometry(0.13, 0.13, 0.13) },
      { name: 'Cybersecurity', color: 0xa855f7, radius: 1.48, speed: 0.48, offset: Math.PI * 1.0, geo: new THREE.IcosahedronGeometry(0.10, 0) },
      { name: 'IoT', color: 0xf59e0b, radius: 1.66, speed: -0.38, offset: Math.PI * 1.5, geo: new THREE.DodecahedronGeometry(0.09, 0) }
    ];

    const satellites = clubNodes.map((club) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: club.color,
        emissive: club.color,
        emissiveIntensity: 0.75,
        roughness: 0.1,
        metalness: 0.92,
        clearcoat: 1.0
      });
      const mesh = new THREE.Mesh(club.geo, mat);

      // Micro orbit halo ring around each satellite
      const haloGeo = new THREE.TorusGeometry(0.18, 0.006, 8, 32);
      const haloMat = new THREE.MeshBasicMaterial({ color: club.color, wireframe: true, transparent: true, opacity: 0.7 });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      mesh.add(haloMesh);

      satelliteGroup.add(mesh);
      return { mesh, club, haloMesh };
    });

    // 4. DATA PARTICLE NEBULA (Confined strictly within camera visible radius)
    const particleGroup = new THREE.Group();
    masterGroup.add(particleGroup);

    const particleMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.85,
      transparent: true,
      opacity: 0.65
    });

    const pGeo1 = new THREE.OctahedronGeometry(0.032, 0);
    const pGeo2 = new THREE.TetrahedronGeometry(0.028, 0);
    const particles = [];

    for (let i = 0; i < 40; i++) {
      const geo = i % 2 === 0 ? pGeo1 : pGeo2;
      const mesh = new THREE.Mesh(geo, particleMat);

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 1.15 + Math.random() * 0.65; // Max 1.8 units, safely within 2.48 viewport

      mesh.position.set(
        dist * Math.sin(phi) * Math.cos(theta),
        dist * Math.sin(phi) * Math.sin(theta) * 0.75,
        dist * Math.cos(phi) * 0.75
      );

      mesh.scale.setScalar(0.6 + Math.random() * 0.8);
      mesh.userData = {
        basePos: mesh.position.clone(),
        rotSpeedX: (Math.random() - 0.5) * 0.025,
        rotSpeedY: (Math.random() - 0.5) * 0.025,
        floatSpeed: 1.2 + Math.random() * 1.2,
        floatOffset: Math.random() * Math.PI * 2
      };

      particleGroup.add(mesh);
      particles.push(mesh);
    }

    // Resize Handler with responsive aspect ratio updating
    const updateSize = () => {
      if (!container || !renderer || !isMountedRef.current) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width || 600;
      const height = rect.height || 600;

      if (width === 0 || height === 0) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    updateSize();

    // Mouse Parallax Listeners
    const onMouseEnter = () => {
      mouseRef.current.isHovered = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.isHovered = false;
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const isOver =
        clientX >= 0 &&
        clientX <= rect.width &&
        clientY >= 0 &&
        clientY <= rect.height;

      mouseRef.current.isHovered = isOver;

      const normX = (clientX / rect.width) * 2 - 1;
      const normY = -(clientY / rect.height) * 2 + 1;

      mouseRef.current.targetX = Math.max(-1.0, Math.min(1.0, normX));
      mouseRef.current.targetY = Math.max(-1.0, Math.min(1.0, normY));
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Render Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    let curRotX = 0;
    let curRotY = 0;
    let curTransX = 0;
    let curTransY = 0;
    let curScale = 1.0;

    const render = () => {
      if (!isMountedRef.current) return;

      if (isInViewRef.current) {
        const elapsedTime = clock.getElapsedTime();
        const { targetX, targetY, isHovered } = mouseRef.current;

        const lerpFactor = 0.06;

        // Controlled interactive mouse tracking to prevent edge overflow
        const targetRotXVal = -targetY * 0.22;
        const targetRotYVal = targetX * 0.28;
        const targetTransXVal = targetX * 0.10;
        const targetTransYVal = targetY * 0.08;
        const targetScaleVal = isHovered ? 1.03 : 1.0;

        curRotX += (targetRotXVal - curRotX) * lerpFactor;
        curRotY += (targetRotYVal - curRotY) * lerpFactor;
        curTransX += (targetTransXVal - curTransX) * lerpFactor;
        curTransY += (targetTransYVal - curTransY) * lerpFactor;
        curScale += (targetScaleVal - curScale) * lerpFactor;

        // Master Group Tilts & Position
        masterGroup.rotation.x = curRotX;
        masterGroup.rotation.y = curRotY;
        masterGroup.position.x = curTransX;
        masterGroup.position.y = curTransY + Math.sin(elapsedTime * 1.2) * 0.035;
        masterGroup.scale.setScalar(curScale);

        // Core Rotations
        innerCoreMesh.rotation.x = elapsedTime * 0.25;
        innerCoreMesh.rotation.y = elapsedTime * 0.4;
        const pulse = 1.0 + Math.sin(elapsedTime * 2.8) * 0.05;
        innerCoreMesh.scale.set(pulse, pulse, pulse);

        outerCoreMesh.rotation.x = -elapsedTime * 0.18;
        outerCoreMesh.rotation.z = elapsedTime * 0.22;

        centerEnergyMesh.rotation.y = elapsedTime * 0.7;
        centerEnergyMesh.rotation.x = elapsedTime * 0.45;

        dotRingGroup.rotation.z = -elapsedTime * 0.35;

        // Gyroscopic Rings Harmonic Counter-rotations
        ring1Mesh.rotation.x += 0.007;
        ring1Mesh.rotation.y += 0.010;

        ring2Mesh.rotation.y -= 0.009;
        ring2Mesh.rotation.z += 0.006;

        ring3Mesh.rotation.x -= 0.005;
        ring3Mesh.rotation.z -= 0.008;

        ring4Mesh.rotation.z += 0.004;

        // Satellites Orbital Motion
        satellites.forEach(({ mesh, club, haloMesh }) => {
          const t = elapsedTime * club.speed + club.offset;
          const orbitX = Math.cos(t) * club.radius;
          const orbitY = Math.sin(t * 1.15) * (club.radius * 0.32);
          const orbitZ = Math.sin(t) * club.radius;

          mesh.position.set(orbitX, orbitY, orbitZ);
          mesh.rotation.x += 0.02;
          mesh.rotation.y += 0.025;

          haloMesh.rotation.x = elapsedTime * 1.2;
          haloMesh.rotation.y = elapsedTime * 1.6;
        });

        // Background Particles Drift
        particles.forEach((p) => {
          p.rotation.x += p.userData.rotSpeedX;
          p.rotation.y += p.userData.rotSpeedY;
          const float = Math.sin(elapsedTime * p.userData.floatSpeed + p.userData.floatOffset) * 0.06;
          p.position.y = p.userData.basePos.y + float;
        });

        // Dynamic Cursor Specular Light Motion
        cursorLight.position.x += (targetX * 2.8 - cursorLight.position.x) * 0.1;
        cursorLight.position.y += (targetY * 2.0 - cursorLight.position.y) * 0.1;

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousemove', onMouseMove);

      // Dispose Three.js Resources cleanly
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      outerCoreGeo.dispose();
      outerCoreMat.dispose();
      centerEnergyGeo.dispose();
      centerEnergyMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      ring4Geo.dispose();
      ringMatEmerald.dispose();
      ringMatBlue.dispose();
      ringMatPurple.dispose();
      ringMatAmber.dispose();
      pGeo1.dispose();
      pGeo2.dispose();
      particleMat.dispose();

      satellites.forEach(({ mesh, haloMesh }) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
        haloMesh.geometry.dispose();
        haloMesh.material.dispose();
      });

      if (renderer) {
        renderer.dispose();
      }
    };
  }, [webGLSupported, prefersReducedMotion]);

  if (!webGLSupported || prefersReducedMotion) {
    return (
      <div className={`hero-3d-scene-fallback ${className}`} style={style}>
        <div className="hero-fallback-aura" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`hero-3d-scene-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        height: 'auto',
        aspectRatio: '1 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        ...style
      }}
      aria-label="NIELIT Tech Clubs 3D Interactive Animation"
      role="img"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
