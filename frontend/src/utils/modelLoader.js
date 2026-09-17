import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader();
const modelCache = new Map();

/**
 * Loads a GLTF / GLB model with in-memory caching.
 * @param {string} url - URL path to the .glb model
 * @param {Function} onLoad - Callback with cloned THREE.Group
 * @param {Function} onError - Callback on error
 */
export function loadCachedModel(url, onLoad, onError) {
  if (modelCache.has(url)) {
    const cachedGltf = modelCache.get(url);
    if (onLoad) {
      setTimeout(() => onLoad(cachedGltf.scene.clone(true)), 0);
    }
    return;
  }

  gltfLoader.load(
    url,
    (gltf) => {
      modelCache.set(url, gltf);
      if (onLoad) onLoad(gltf.scene.clone(true));
    },
    undefined,
    (err) => {
      console.warn(`Failed to load 3D model from ${url}:`, err);
      if (onError) onError(err);
    }
  );
}
