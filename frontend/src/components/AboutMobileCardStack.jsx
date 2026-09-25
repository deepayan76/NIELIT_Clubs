"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HoverTransition } from '@/components/ui/hover-transition';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function AboutMobileCardStack({ pillars }) {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring physics for responsive touch and wheel scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 28,
    mass: 0.5,
    restDelta: 0.001
  });

  // Card 0 (LEARN): Starts active, leaves during scroll interval [0.10, 0.44]
  const card0Y = useTransform(smoothProgress, [0, 0.10, 0.44, 0.50], ["0%", "0%", "-115%", "-115%"]);
  const card0Scale = useTransform(smoothProgress, [0, 0.10, 0.44, 0.50], [1, 1, 0.94, 0.94]);
  const card0RotateX = useTransform(smoothProgress, [0, 0.10, 0.44, 0.50], ["0deg", "0deg", "-5deg", "-5deg"]);
  const card0Opacity = useTransform(smoothProgress, [0, 0.10, 0.40, 0.46], [1, 1, 0, 0]);

  // Card 1 (BUILD): Resting at stack offset 1, rises during [0.10, 0.44], leaves during [0.56, 0.88]
  const card1Y = useTransform(smoothProgress, [0, 0.10, 0.44, 0.56, 0.88, 0.94], ["14px", "14px", "0px", "0px", "-115%", "-115%"]);
  const card1Scale = useTransform(smoothProgress, [0, 0.10, 0.44, 0.56, 0.88, 0.94], [0.95, 0.95, 1, 1, 0.94, 0.94]);
  const card1RotateX = useTransform(smoothProgress, [0, 0.10, 0.44, 0.56, 0.88, 0.94], ["0deg", "0deg", "0deg", "0deg", "-5deg", "-5deg"]);
  const card1Opacity = useTransform(smoothProgress, [0, 0.10, 0.44, 0.56, 0.84, 0.90], [0.92, 0.92, 1, 1, 0, 0]);
  const card1Z = useTransform(smoothProgress, [0, 0.48, 0.50], [20, 20, 29]);

  // Card 2 (LEAD): Resting at stack offset 2, steps forward during [0.10, 0.44], rises to active during [0.56, 0.88]
  const card2Y = useTransform(smoothProgress, [0, 0.10, 0.44, 0.56, 0.88, 1.0], ["28px", "28px", "14px", "14px", "0px", "0px"]);
  const card2Scale = useTransform(smoothProgress, [0, 0.10, 0.44, 0.56, 0.88, 1.0], [0.90, 0.90, 0.95, 0.95, 1, 1]);
  const card2Opacity = useTransform(smoothProgress, [0, 0.10, 0.44, 0.56, 0.88, 1.0], [0.85, 0.85, 0.92, 0.92, 1, 1]);
  const card2Z = useTransform(smoothProgress, [0, 0.86, 0.90], [10, 10, 28]);

  const cardTransforms = [
    { y: card0Y, scale: card0Scale, rotateX: card0RotateX, opacity: card0Opacity, zIndex: 30 },
    { y: card1Y, scale: card1Scale, rotateX: card1RotateX, opacity: card1Opacity, zIndex: card1Z },
    { y: card2Y, scale: card2Scale, rotateX: "0deg", opacity: card2Opacity, zIndex: card2Z }
  ];

  if (reduceMotion) {
    return null;
  }

  return (
    <div ref={containerRef} className="about-pillars-mobile-stack mobile-only" aria-label="NEXORA Core Pillars: Learn, Build, Lead (Scroll Stack)">
      <div className="about-mobile-sticky-wrapper">
        <div className="about-mobile-stack-stage">
          {pillars.map((pillar, index) => {
            const motionStyle = cardTransforms[index] || {};

            return (
              <motion.div
                key={pillar.title}
                className="about-mobile-card-motion-wrapper"
                style={{
                  y: motionStyle.y,
                  scale: motionStyle.scale,
                  rotateX: motionStyle.rotateX,
                  opacity: motionStyle.opacity,
                  zIndex: motionStyle.zIndex
                }}
              >
                <HoverTransition
                  effect="morph"
                  direction="center"
                  duration={0.72}
                  easing="cubic-bezier(0.22, 1, 0.36, 1)"
                  label={pillar.accessibleLabel}
                  className="about-pillar-card"
                  defaultComponent={
                    <div className="pillar-default-content">
                      <div className="pillar-image-box">
                        <img
                          src={pillar.image}
                          alt={`${pillar.title} illustration`}
                          className="pillar-illustration"
                          loading="lazy"
                        />
                      </div>
                      <div className="pillar-default-footer">
                        <span className="pillar-default-label">{pillar.title}</span>
                      </div>
                    </div>
                  }
                  hoverComponent={
                    <div className="pillar-hover-content">
                      <h3 className="pillar-hover-title">{pillar.title}</h3>
                      <div className="pillar-hover-divider" aria-hidden="true" />
                      <p className="pillar-hover-desc">{pillar.description}</p>
                    </div>
                  }
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
