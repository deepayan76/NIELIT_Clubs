import * as THREE from 'three';

let cachedWebGLSupport = null;

/**
 * Checks if WebGL / WebGL2 is supported and working on the current client.
 * Returns true if WebGL canvas context can be acquired, false otherwise.
 */
export function isWebGLAvailable() {
  if (cachedWebGLSupport !== null) {
    return cachedWebGLSupport;
  }

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    cachedWebGLSupport = false;
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    cachedWebGLSupport = Boolean(gl && (gl instanceof WebGLRenderingContext || (window.WebGL2RenderingContext && gl instanceof WebGL2RenderingContext)));
    return cachedWebGLSupport;
  } catch {
    cachedWebGLSupport = false;
    return false;
  }
}

const textureLoader = new THREE.TextureLoader();
const textureCache = new Map();

/**
 * Loads a texture with caching to prevent duplicate network/decoding overhead.
 */
export function loadCachedTexture(url, onLoad, onError) {
  if (textureCache.has(url)) {
    const tex = textureCache.get(url);
    if (onLoad) {
      setTimeout(() => onLoad(tex), 0);
    }
    return tex;
  }

  const texture = textureLoader.load(
    url,
    (loadedTex) => {
      loadedTex.colorSpace = THREE.SRGBColorSpace;
      loadedTex.generateMipmaps = true;
      loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
      loadedTex.magFilter = THREE.LinearFilter;
      if (onLoad) onLoad(loadedTex);
    },
    undefined,
    (err) => {
      if (onError) onError(err);
    }
  );

  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(url, texture);
  return texture;
}
