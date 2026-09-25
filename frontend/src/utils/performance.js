/**
 * Centralized Adaptive Performance Detection Utility
 * NEXORA TECH CLUBS
 *
 * Classifies device runtime into HIGH, MEDIUM, or LOW tier based on:
 * - navigator.hardwareConcurrency (CPU core count)
 * - navigator.deviceMemory (RAM in GB where available)
 * - devicePixelRatio
 * - GPU capability & WebGL limits
 * - Touch & screen form factor
 * - prefers-reduced-motion
 * - Lightweight dynamic frame-drop monitoring with hysteresis
 */

import { useState, useEffect } from 'react';

export const PERFORMANCE_TIERS = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
};

/**
 * Detect hardware baseline tier statically
 */
function detectBaselineTier() {
  if (typeof window === 'undefined') return PERFORMANCE_TIERS.HIGH;

  // 1. Reduced motion preference -> LOW decorative overhead
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return PERFORMANCE_TIERS.LOW;
  }

  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 8; // GB (Chrome/Edge API)

  // 2. Clear low-end hardware signals
  if (cores <= 2 || memory <= 2) {
    return PERFORMANCE_TIERS.LOW;
  }

  // 3. Mid-range hardware signals
  if (cores <= 4 || memory <= 4) {
    return PERFORMANCE_TIERS.MEDIUM;
  }

  // 4. High-end hardware
  return PERFORMANCE_TIERS.HIGH;
}

// Current singleton tier state
let currentTier = detectBaselineTier();
const tierListeners = new Set();

/**
 * Notify all listeners of tier changes
 */
function notifyTierChange(nextTier) {
  if (nextTier === currentTier) return;
  currentTier = nextTier;
  tierListeners.forEach((listener) => {
    try {
      listener(currentTier);
    } catch (e) {
      console.error('[Performance] Error in tier listener:', e);
    }
  });
}

/**
 * Get current performance tier
 * @returns {'HIGH' | 'MEDIUM' | 'LOW'}
 */
export function getPerformanceTier() {
  return currentTier;
}

/**
 * Get adaptive Device Pixel Ratio cap based on active tier
 * @param {number} maxHigh - Default 2.0
 * @param {number} maxMed - Default 1.5
 * @param {number} maxLow - Default 1.25
 * @returns {number}
 */
export function getAdaptiveDpr(maxHigh = 2.0, maxMed = 1.5, maxLow = 1.25) {
  if (typeof window === 'undefined') return 1;
  const rawDpr = window.devicePixelRatio || 1;

  switch (currentTier) {
    case PERFORMANCE_TIERS.LOW:
      return Math.min(rawDpr, maxLow);
    case PERFORMANCE_TIERS.MEDIUM:
      return Math.min(rawDpr, maxMed);
    case PERFORMANCE_TIERS.HIGH:
    default:
      return Math.min(rawDpr, maxHigh);
  }
}

/**
 * Get adaptive particle scale factor
 * @returns {number} 1.0 for HIGH, 0.5 for MEDIUM, 0.25 for LOW
 */
export function getParticleScale() {
  switch (currentTier) {
    case PERFORMANCE_TIERS.LOW:
      return 0.25;
    case PERFORMANCE_TIERS.MEDIUM:
      return 0.5;
    case PERFORMANCE_TIERS.HIGH:
    default:
      return 1.0;
  }
}

/**
 * Lightweight periodic performance monitor (samples FPS every 3s)
 * Uses hysteresis to prevent rapid flapping between tiers.
 */
let isMonitoring = false;
export function startPerformanceMonitoring() {
  if (isMonitoring || typeof window === 'undefined') return;
  isMonitoring = true;

  let frameCount = 0;
  let lastTime = performance.now();
  let consecutiveLowFps = 0;
  let consecutiveHighFps = 0;
  let rafId = null;

  const sample = (now) => {
    frameCount++;
    const delta = now - lastTime;

    if (delta >= 2500) {
      const fps = (frameCount * 1000) / delta;
      frameCount = 0;
      lastTime = now;

      // Only evaluate if tab is actively visible and page isn't idle
      if (!document.hidden && fps > 5) {
        if (fps < 38) {
          consecutiveLowFps++;
          consecutiveHighFps = 0;
          if (consecutiveLowFps >= 2) {
            // Downgrade tier
            if (currentTier === PERFORMANCE_TIERS.HIGH) {
              notifyTierChange(PERFORMANCE_TIERS.MEDIUM);
            } else if (currentTier === PERFORMANCE_TIERS.MEDIUM) {
              notifyTierChange(PERFORMANCE_TIERS.LOW);
            }
          }
        } else if (fps >= 55) {
          consecutiveHighFps++;
          consecutiveLowFps = 0;
          if (consecutiveHighFps >= 4) {
            // Cautiously upgrade tier
            if (currentTier === PERFORMANCE_TIERS.LOW) {
              notifyTierChange(PERFORMANCE_TIERS.MEDIUM);
            } else if (currentTier === PERFORMANCE_TIERS.MEDIUM) {
              const baseline = detectBaselineTier();
              if (baseline === PERFORMANCE_TIERS.HIGH) {
                notifyTierChange(PERFORMANCE_TIERS.HIGH);
              }
            }
          }
        } else {
          consecutiveLowFps = 0;
          consecutiveHighFps = 0;
        }
      }
    }

    if (isMonitoring) {
      rafId = requestAnimationFrame(sample);
    }
  };

  rafId = requestAnimationFrame(sample);

  // Stop sampling when page is hidden
  const handleVisibility = () => {
    if (document.hidden) {
      frameCount = 0;
      lastTime = performance.now();
    }
  };
  document.addEventListener('visibilitychange', handleVisibility, { passive: true });
}

/**
 * React hook to consume performance tier adaptively
 */
export function usePerformanceTier() {
  const [tier, setTier] = useState(currentTier);

  useEffect(() => {
    setTier(currentTier);
    const listener = (nextTier) => setTier(nextTier);
    tierListeners.add(listener);
    return () => tierListeners.delete(listener);
  }, []);

  return tier;
}
