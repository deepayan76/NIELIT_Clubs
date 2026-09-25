"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { navigate } from '../utils/router';

function initialsFor(item) {
  return (
    item.initials ??
    item.name
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase()
  );
}

function ClubPortrait({ item }) {
  const initials = initialsFor(item);

  if (item.image) {
    return (
      <div className="orbit-portrait-wrapper" style={{ borderColor: item.accent ? `${item.accent}33` : undefined }}>
        <img
          src={item.image}
          alt={item.name}
          className="orbit-portrait-img"
          loading="lazy"
        />
        <span
          className="orbit-portrait-badge"
          style={{ backgroundColor: item.accent || "#18181b" }}
        >
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div
      className="orbit-portrait-wrapper"
      style={{ "--portrait-accent": item.accent ?? "#f3f1ea" }}
    >
      <div className="orbit-portrait-fallback-bg" />
      <span className="orbit-portrait-badge">
        {initials}
      </span>
    </div>
  );
}

export default function ClubsMobileCardStack({ items = [], onCardClick }) {
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

  // Card 0 (AI Club): Starts active, exits during [0.08, 0.33]
  const card0Y = useTransform(smoothProgress, [0, 0.08, 0.33, 0.38], ["0%", "0%", "-115%", "-115%"]);
  const card0Scale = useTransform(smoothProgress, [0, 0.08, 0.33, 0.38], [1, 1, 0.94, 0.94]);
  const card0RotateX = useTransform(smoothProgress, [0, 0.08, 0.33, 0.38], ["0deg", "0deg", "-5deg", "-5deg"]);
  const card0Opacity = useTransform(smoothProgress, [0, 0.08, 0.30, 0.36], [1, 1, 0, 0]);

  // Card 1 (Programming Club): Rises to active during [0.08, 0.33], exits during [0.40, 0.65]
  const card1Y = useTransform(smoothProgress, [0, 0.08, 0.33, 0.40, 0.65, 0.70], ["14px", "14px", "0px", "0px", "-115%", "-115%"]);
  const card1Scale = useTransform(smoothProgress, [0, 0.08, 0.33, 0.40, 0.65, 0.70], [0.95, 0.95, 1, 1, 0.94, 0.94]);
  const card1RotateX = useTransform(smoothProgress, [0, 0.08, 0.33, 0.40, 0.65, 0.70], ["0deg", "0deg", "0deg", "0deg", "-5deg", "-5deg"]);
  const card1Opacity = useTransform(smoothProgress, [0, 0.08, 0.33, 0.40, 0.62, 0.68], [0.92, 0.92, 1, 1, 0, 0]);
  const card1Z = useTransform(smoothProgress, [0, 0.36, 0.38], [30, 30, 39]);

  // Card 2 (Cybersecurity Club): Steps forward during [0.08, 0.33], rises to active during [0.40, 0.65], exits during [0.72, 0.95]
  const card2Y = useTransform(smoothProgress, [0, 0.08, 0.33, 0.40, 0.65, 0.72, 0.95, 1.0], ["28px", "28px", "14px", "14px", "0px", "0px", "-115%", "-115%"]);
  const card2Scale = useTransform(smoothProgress, [0, 0.08, 0.33, 0.40, 0.65, 0.72, 0.95, 1.0], [0.90, 0.90, 0.95, 0.95, 1, 1, 0.94, 0.94]);
  const card2RotateX = useTransform(smoothProgress, [0, 0.08, 0.33, 0.40, 0.65, 0.72, 0.95, 1.0], ["0deg", "0deg", "0deg", "0deg", "0deg", "0deg", "-5deg", "-5deg"]);
  const card2Opacity = useTransform(smoothProgress, [0, 0.08, 0.33, 0.40, 0.65, 0.72, 0.92, 0.96], [0.85, 0.85, 0.92, 0.92, 1, 1, 0, 0]);
  const card2Z = useTransform(smoothProgress, [0, 0.68, 0.70], [20, 20, 38]);

  // Card 3 (IoT Club): Steps forward progressively, rises to active during [0.72, 0.95]
  const card3Y = useTransform(smoothProgress, [0, 0.08, 0.33, 0.40, 0.65, 0.72, 0.95, 1.0], ["42px", "42px", "28px", "28px", "14px", "14px", "0px", "0px"]);
  const card3Scale = useTransform(smoothProgress, [0, 0.08, 0.33, 0.40, 0.65, 0.72, 0.95, 1.0], [0.85, 0.85, 0.90, 0.90, 0.95, 0.95, 1, 1]);
  const card3Opacity = useTransform(smoothProgress, [0, 0.08, 0.33, 0.40, 0.65, 0.72, 0.95, 1.0], [0.78, 0.78, 0.85, 0.85, 0.92, 0.92, 1, 1]);
  const card3Z = useTransform(smoothProgress, [0, 0.94, 0.96], [10, 10, 37]);

  const cardTransforms = [
    { y: card0Y, scale: card0Scale, rotateX: card0RotateX, opacity: card0Opacity, zIndex: 40 },
    { y: card1Y, scale: card1Scale, rotateX: card1RotateX, opacity: card1Opacity, zIndex: card1Z },
    { y: card2Y, scale: card2Scale, rotateX: card2RotateX, opacity: card2Opacity, zIndex: card2Z },
    { y: card3Y, scale: card3Scale, rotateX: "0deg", opacity: card3Opacity, zIndex: card3Z }
  ];

  if (reduceMotion) {
    return null;
  }

  const handleInteraction = (item, event) => {
    if (onCardClick) {
      onCardClick(item, event);
    } else if (item?.href) {
      navigate(item.href);
    }
  };

  return (
    <div
      ref={containerRef}
      className="clubs-mobile-scroll-stack mobile-only"
      aria-label="NEXORA Clubs: AI, Programming, Cybersecurity, IoT (Mobile Scroll Stack)"
    >
      <div className="clubs-mobile-sticky-wrapper">
        <div className="clubs-mobile-stack-stage">
          {items.map((item, index) => {
            const motionStyle = cardTransforms[index] || {};

            return (
              <motion.div
                key={`${item.name}-mobile-${index}`}
                className="clubs-mobile-card-motion-wrapper"
                style={{
                  y: motionStyle.y,
                  scale: motionStyle.scale,
                  rotateX: motionStyle.rotateX,
                  opacity: motionStyle.opacity,
                  zIndex: motionStyle.zIndex
                }}
              >
                <article
                  role="button"
                  tabIndex={0}
                  className="orbit-card-item is-active clubs-mobile-card-item"
                  onClick={(e) => handleInteraction(item, e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleInteraction(item, e);
                    }
                  }}
                >
                  <div className="orbit-card-media">
                    <ClubPortrait item={item} />
                    <button
                      type="button"
                      className="orbit-card-arrow-btn"
                      aria-label={`Explore ${item.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInteraction(item, e);
                      }}
                    >
                      <ArrowUpRight className="orbit-arrow-icon" />
                    </button>
                  </div>

                  <div className="orbit-card-content">
                    <p
                      className="orbit-card-role"
                      style={{ color: item.accent || "var(--text-muted)" }}
                    >
                      {item.role || "Technical Club"}
                    </p>
                    <h3 className="orbit-card-title">{item.name}</h3>
                    <p className="orbit-card-desc">{item.description}</p>
                    <div className="orbit-card-footer">
                      <span className="orbit-card-stat">{item.stat ?? "Explore Club"}</span>
                      <span className="orbit-card-action-text" style={{ color: item.accent || "#111111" }}>
                        View Club &rarr;
                      </span>
                    </div>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
