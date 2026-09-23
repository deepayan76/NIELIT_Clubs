"use client";

import React, { useState, useRef, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "@/styles/orbit-card-stack.css";

function inRange(index, length) {
  return Math.min(Math.max(0, index), Math.max(0, length - 1));
}

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

function Portrait({ item }) {
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

export function OrbitCardStack({
  items = [],
  className = "",
  cardClassName = "",
  defaultActiveIndex = 0,
  spread = 150,
  lift = 40,
  onActiveChange,
  onCardClick,
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const cards = items;
  const restingIndex = inRange(defaultActiveIndex, cards.length);
  const [activeIndex, setActiveIndex] = useState(restingIndex);
  const [open, setOpen] = useState(false);
  const stageRef = useRef(null);
  const midpoint = (cards.length - 1) / 2;

  const layouts = useMemo(
    () =>
      cards.map((_, index) => {
        const orbit = index - midpoint;
        const stack = index - restingIndex;
        return {
          open: {
            x: orbit * spread,
            y: Math.abs(orbit) * 28 + Math.max(0, Math.abs(orbit) - 1) * 8,
            rotation: orbit * 7.5,
          },
          closed: {
            x: stack * 12,
            y: Math.abs(stack) * 5,
            rotation: stack * 2.8,
          },
        };
      }),
    [cards, midpoint, restingIndex, spread]
  );

  const activate = (index) => {
    const next = inRange(index, cards.length);
    setOpen(true);
    setActiveIndex(next);
    onActiveChange?.(cards[next], next);
  };

  const close = () => {
    setOpen(false);
    setActiveIndex(restingIndex);
  };

  const leaveFocus = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  };

  const handleCardInteraction = (item, index, event) => {
    activate(index);
    if (onCardClick) {
      onCardClick(item, index, event);
    }
  };

  return (
    <div className={cn("orbit-card-stack-stage", className)}>
      <div
        ref={stageRef}
        className="orbit-card-stack-container"
        onMouseLeave={close}
        onBlur={leaveFocus}
        role="list"
        aria-label="Clubs card stack"
      >
        {cards.map((item, index) => {
          const position = open ? layouts[index].open : layouts[index].closed;
          const active = index === activeIndex;

          const style = {
            zIndex: active ? 80 : 50 - Math.abs(index - activeIndex),
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${
              position.y - (open && active ? lift : 0)
            }px)) rotate(${position.rotation}deg) scale(${open ? (active ? 1.02 : 0.985) : 0.97})`,
            transitionDuration: reduceMotion ? "0ms" : "420ms",
          };

          return (
            <article
              key={`${item.name}-${index}`}
              role="listitem"
              tabIndex={0}
              aria-current={active ? "true" : undefined}
              className={cn("orbit-card-item", active && "is-active", cardClassName)}
              style={style}
              onMouseEnter={() => activate(index)}
              onFocus={() => activate(index)}
              onClick={(e) => handleCardInteraction(item, index, e)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleCardInteraction(item, index, event);
                }
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  const next = (index + 1) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const next = (index - 1 + cards.length) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "Escape") {
                  event.currentTarget.blur();
                  close();
                }
              }}
            >
              <div className="orbit-card-media">
                <Portrait item={item} />
                <button
                  type="button"
                  className="orbit-card-arrow-btn"
                  aria-label={`Explore ${item.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardInteraction(item, index, e);
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
          );
        })}
      </div>
    </div>
  );
}
