import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, loadCachedTexture } from '../../utils/webgl';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useInView } from '../../hooks/useInView';

/**
 * Reusable 2.5D Interactive Three.js illustration component.
 * Preserves exact visual presentation while adding subtle depth, lighting, floating, and hover tilt.
 */
export default function ThreeIllustration({
  src,
  alt = 'Illustration',
  className = '',
  style = {},
  accentColor = null,
  maxRotX = 0.085, // ~4.9 deg
  maxRotY = 0.12,  // ~6.8 deg
  maxTrans = 0.12, // subtle translation in world units
  scaleOnHover = 1.04,
  floating = true,
  interactive = true,
  depthLayers = false,
  aspectRatio = null, // e.g. '16/9' or auto-calculated
  priority = 'lazy',
  seed = Math.random() * 10
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isMountedRef = useRef(true);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const [naturalAspect, setNaturalAspect] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef);

  // Mouse coordinate state stored in ref for 60fps rendering without React re-renders
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
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

    const scene = new THREE.Scene();

    // Perspective Camera setup
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 4.2;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(2, 4, 3);
    scene.add(dirLight);

    // Accent Light (Club or subtle theme color)
    let accentLight = null;
    if (accentColor) {
      accentLight = new THREE.PointLight(accentColor, 1.5, 8);
      accentLight.position.set(0, 0, 1.5);
      scene.add(accentLight);
    } else {
      // Soft ambient blue-white rim light
      accentLight = new THREE.PointLight(0xa5c4e8, 1.0, 8);
      accentLight.position.set(0, 0, 1.5);
      scene.add(accentLight);
    }

    let mainMesh = null;
    let planeGeo = null;
    let mainMat = null;
    let loadedTex = null;

    // Optional subtle depth micro-particles
    let particleGroup = null;
    if (depthLayers) {
      particleGroup = new THREE.Group();
      const particleGeo = new THREE.OctahedronGeometry(0.04, 0);
      const particleMat = new THREE.MeshStandardMaterial({
        color: accentColor ? new THREE.Color(accentColor) : new THREE.Color(0x9fc3e8),
        roughness: 0.3,
        metalness: 0.5,
        transparent: true,
        opacity: 0.45
      });

      for (let i = 0; i < 6; i++) {
        const pMesh = new THREE.Mesh(particleGeo, particleMat);
        const zLayer = i % 2 === 0 ? 0.35 : -0.35;
        pMesh.position.set(
          (Math.random() - 0.5) * 2.8,
          (Math.random() - 0.5) * 2.0,
          zLayer
        );
        pMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        pMesh.scale.setScalar(0.6 + Math.random() * 0.8);
        pMesh.userData = {
          speedX: (Math.random() - 0.5) * 0.008,
          speedY: (Math.random() - 0.5) * 0.008,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          zLayer
        };
        particleGroup.add(pMesh);
      }
      scene.add(particleGroup);
    }

    // Function to resize canvas and maintain correct mesh aspect ratio
    const updateSize = () => {
      if (!container || !renderer || !isMountedRef.current) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width || 300;
      const height = rect.height || 200;

      if (width === 0 || height === 0) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Recalculate plane mesh size to fit camera view nicely while preserving image natural aspect ratio
      if (mainMesh && loadedTex && loadedTex.image) {
        const imgAspect = loadedTex.image.width / loadedTex.image.height;
        const vFov = (camera.fov * Math.PI) / 180;
        const visibleHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
        const visibleWidth = visibleHeight * camera.aspect;

        const maxMeshW = visibleWidth * 0.92;
        const maxMeshH = visibleHeight * 0.92;

        let planeW = maxMeshW;
        let planeH = planeW / imgAspect;

        if (planeH > maxMeshH) {
          planeH = maxMeshH;
          planeW = planeH * imgAspect;
        }

        mainMesh.scale.set(planeW, planeH, 1);
      }
    };

    // Load texture
    loadedTex = loadCachedTexture(
      src,
      (tex) => {
        if (!isMountedRef.current) return;
        setTextureLoaded(true);
        if (tex.image && tex.image.width && tex.image.height) {
          setNaturalAspect(tex.image.width / tex.image.height);
        }

        // Create Mesh with premium physical material
        planeGeo = new THREE.PlaneGeometry(1, 1, 16, 16);
        mainMat = new THREE.MeshPhysicalMaterial({
          map: tex,
          transparent: true,
          alphaTest: 0.005,
          roughness: 0.25,
          metalness: 0.08,
          clearcoat: 0.35,
          clearcoatRoughness: 0.15,
          reflectivity: 0.5,
          side: THREE.DoubleSide
        });

        mainMesh = new THREE.Mesh(planeGeo, mainMat);
        scene.add(mainMesh);
        updateSize();
      },
      () => {
        setWebGLSupported(false);
      }
    );

    // Resize Observer for responsive sizing
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Mouse Interaction handlers
    const onMouseEnter = () => {
      mouseRef.current.isHovered = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.isHovered = false;
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    const onMouseMove = (e) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates from -1 to 1
      const normX = (clientX / rect.width) * 2 - 1;
      const normY = -(clientY / rect.height) * 2 + 1;

      mouseRef.current.targetX = Math.max(-1, Math.min(1, normX));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, normY));
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mousemove', onMouseMove, { passive: true });

    // Render Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    // Lerp values
    let currentRotX = 0;
    let currentRotY = 0;
    let currentTransX = 0;
    let currentTransY = 0;
    let currentScale = 1.0;
    let currentZLift = 0;

    const render = () => {
      if (!isMountedRef.current) return;

      // Only animate if in view or reduced motion not requested
      if (isInView) {
        const elapsedTime = clock.getElapsedTime();
        const delta = Math.min(clock.getDelta(), 0.1);

        const { targetX, targetY, isHovered } = mouseRef.current;

        // Smooth Lerp factor
        const lerpFactor = 0.08;

        // Idle floating sine wave
        const floatY = floating ? Math.sin(elapsedTime * 1.6 + seed) * 0.04 : 0;
        const floatRotX = floating ? Math.sin(elapsedTime * 1.2 + seed) * 0.012 : 0;
        const floatRotY = floating ? Math.cos(elapsedTime * 1.0 + seed) * 0.012 : 0;

        // Targets
        const targetRotXVal = -targetY * maxRotX + floatRotX;
        const targetRotYVal = targetX * maxRotY + floatRotY;
        const targetTransXVal = targetX * maxTrans;
        const targetTransYVal = targetY * maxTrans + floatY;
        const targetScaleVal = isHovered ? scaleOnHover : 1.0;
        const targetZVal = isHovered ? 0.2 : 0;

        // Smooth interpolation
        currentRotX += (targetRotXVal - currentRotX) * lerpFactor;
        currentRotY += (targetRotYVal - currentRotY) * lerpFactor;
        currentTransX += (targetTransXVal - currentTransX) * lerpFactor;
        currentTransY += (targetTransYVal - currentTransY) * lerpFactor;
        currentScale += (targetScaleVal - currentScale) * lerpFactor;
        currentZLift += (targetZVal - currentZLift) * lerpFactor;

        if (mainMesh) {
          mainMesh.rotation.x = currentRotX;
          mainMesh.rotation.y = currentRotY;
          mainMesh.position.x = currentTransX;
          mainMesh.position.y = currentTransY;
          mainMesh.position.z = currentZLift;

          // Scale relative to original mesh dimensions
          if (loadedTex && loadedTex.image) {
            const imgAspect = loadedTex.image.width / loadedTex.image.height;
            const vFov = (camera.fov * Math.PI) / 180;
            const visibleHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
            const visibleWidth = visibleHeight * camera.aspect;

            const maxMeshW = visibleWidth * 0.92;
            const maxMeshH = visibleHeight * 0.92;

            let planeW = maxMeshW;
            let planeH = planeW / imgAspect;

            if (planeH > maxMeshH) {
              planeH = maxMeshH;
              planeW = planeH * imgAspect;
            }

            mainMesh.scale.set(
              planeW * currentScale,
              planeH * currentScale,
              1
            );
          }
        }

        // Accent light movement and intensity
        if (accentLight) {
          accentLight.position.x += (targetX * 1.2 - accentLight.position.x) * 0.1;
          accentLight.position.y += (targetY * 1.2 - accentLight.position.y) * 0.1;
          const targetLightIntensity = isHovered ? 2.8 : 1.4;
          accentLight.intensity += (targetLightIntensity - accentLight.intensity) * 0.08;
        }

        // Particle floating
        if (particleGroup) {
          particleGroup.children.forEach((p) => {
            p.rotation.x += p.userData.rotSpeed;
            p.rotation.y += p.userData.rotSpeed;
            p.position.y += Math.sin(elapsedTime * 2 + p.position.x) * 0.001;

            // Parallax shift based on Z layer
            const parallaxMultiplier = p.userData.zLayer > 0 ? 1.4 : 0.4;
            p.position.x = (p.position.x + currentTransX * parallaxMultiplier * delta * 0.2);
          });
        }

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mousemove', onMouseMove);

      if (planeGeo) planeGeo.dispose();
      if (mainMat) mainMat.dispose();
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
    };
  }, [
    src,
    webGLSupported,
    prefersReducedMotion,
    isInView,
    accentColor,
    maxRotX,
    maxRotY,
    maxTrans,
    scaleOnHover,
    floating,
    interactive,
    depthLayers,
    seed
  ]);

  // Fallback to standard <img> if WebGL unavailable or reduced motion preferred
  if (!webGLSupported || prefersReducedMotion) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={priority === 'eager' ? 'eager' : 'lazy'}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`three-illustration-container ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        aspectRatio: aspectRatio || (naturalAspect ? `${naturalAspect}` : undefined),
        ...style
      }}
      aria-label={alt}
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
      {/* Hidden fallback image for SEO and screen readers */}
      <img
        src={src}
        alt={alt}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          width: '1px',
          height: '1px'
        }}
        aria-hidden="true"
      />
    </div>
  );
}
