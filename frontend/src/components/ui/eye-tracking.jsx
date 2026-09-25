import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

function Eye({
  index = 0,
  eyeWidth = 142,
  eyeHeight = 110,
  tilt,
  irisColor = "#6A3614",
  irisColorSecondary = "#A8622E",
  pupilColor = "#080808",
  scleraColor = "#FAF6EE",
  pupilRange = 0.65,
  showReflection = true,
  showIrisDetail = true,
  blinkInterval = 4000,
  variant = "realistic",
  reactivePupil = true,
  mouseX,
  mouseY,
  isActive = true,
}) {
  const eyeRef = React.useRef(null)
  const [isBlinking, setIsBlinking] = React.useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const pupilScale = useMotionValue(1)
  const springX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.45 })
  const springY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.45 })

  const irisSize = Math.round(eyeHeight * 0.53)
  const pupilSize = Math.round(irisSize * 0.48)
  const maxOffsetX = (eyeWidth / 2 - irisSize / 2 - 6) * pupilRange
  const maxOffsetY = (eyeHeight / 2 - irisSize / 2 - 5) * pupilRange

  // Cached center position to avoid getBoundingClientRect() on every frame
  const centerPosRef = React.useRef({ x: 0, y: 0 })

  const updateCenter = React.useCallback(() => {
    if (!eyeRef.current) return
    const rect = eyeRef.current.getBoundingClientRect()
    centerPosRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  }, [])

  // Blink animation (only when active in viewport)
  React.useEffect(() => {
    if (blinkInterval <= 0 || !isActive) return

    let blinkTimeout = null
    let interval = null

    const blink = () => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 140)
    }

    const randomOffset = index * 100 + Math.random() * 200
    blinkTimeout = setTimeout(() => {
      blink()
      interval = setInterval(blink, blinkInterval + Math.random() * 1500)
    }, randomOffset)

    return () => {
      if (blinkTimeout) clearTimeout(blinkTimeout)
      if (interval) clearInterval(interval)
    }
  }, [blinkInterval, index, isActive])

  // Recalculate center on resize/scroll when active
  React.useEffect(() => {
    if (!isActive) return
    updateCenter()
    window.addEventListener("resize", updateCenter, { passive: true })
    window.addEventListener("scroll", updateCenter, { passive: true })
    return () => {
      window.removeEventListener("resize", updateCenter)
      window.removeEventListener("scroll", updateCenter)
    }
  }, [isActive, updateCenter])

  // Track mouse position and update pupil (only when active in viewport)
  React.useEffect(() => {
    if (!isActive) return

    let animFrame = 0
    let lastCalculatedX = -9999
    let lastCalculatedY = -9999

    const update = () => {
      const curMouseX = mouseX.current
      const curMouseY = mouseY.current

      // Only recompute when mouse actually moved
      if (curMouseX !== lastCalculatedX || curMouseY !== lastCalculatedY) {
        lastCalculatedX = curMouseX
        lastCalculatedY = curMouseY

        const eyeCenterX = centerPosRef.current.x
        const eyeCenterY = centerPosRef.current.y

        const dx = curMouseX - eyeCenterX
        const dy = curMouseY - eyeCenterY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)

        const clampedDistance = Math.min(distance, 500)
        const normalizedDistance = clampedDistance / 500

        const offsetX = Math.cos(angle) * (normalizedDistance * maxOffsetX)
        const offsetY = Math.sin(angle) * (normalizedDistance * maxOffsetY)

        const restingInward = index === 0 ? 5 : -5
        x.set(offsetX + restingInward)
        y.set(offsetY)

        if (reactivePupil) {
          const proximityScale = distance < 200 ? 1.15 - (distance / 200) * 0.15 : 0.94 + (Math.min(distance, 800) / 800) * 0.06
          pupilScale.set(proximityScale)
        }
      }

      animFrame = requestAnimationFrame(update)
    }

    animFrame = requestAnimationFrame(update)
    return () => {
      if (animFrame) cancelAnimationFrame(animFrame)
    }
  }, [isActive, x, y, pupilScale, maxOffsetX, maxOffsetY, reactivePupil, mouseX, mouseY, index])

  const resolvedTilt = tilt !== undefined ? tilt : index === 0 ? -7 : 7

  return (
    <motion.div
      ref={eyeRef}
      className="relative overflow-hidden select-none"
      style={{
        width: eyeWidth,
        height: eyeHeight,
        borderRadius: "50%",
        transform: `rotate(${resolvedTilt}deg)`,
        background: `radial-gradient(ellipse at 48% 34%, #ffffff 0%, ${scleraColor} 46%, #e5ddcf 78%, #cebfab 100%)`,
        boxShadow:
          "inset 0 -10px 22px rgba(60, 35, 15, 0.2), inset 0 6px 14px rgba(255, 255, 255, 0.98), inset 7px 0 16px rgba(45, 25, 10, 0.09), inset -7px 0 16px rgba(45, 25, 10, 0.09), 0 16px 36px rgba(0, 0, 0, 0.55), 0 4px 12px rgba(0, 0, 0, 0.35)",
      }}
      animate={{
        scaleY: isBlinking ? 0.04 : 1,
      }}
      transition={{
        scaleY: { duration: 0.09, ease: "easeInOut" },
      }}
    >
      {/* 3D Eyeball Delicate Red Capillary Veins */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full"
        viewBox={`0 0 ${eyeWidth} ${eyeHeight}`}
      >
        <path
          d={`M ${eyeWidth * 0.07} ${eyeHeight * 0.32} Q ${eyeWidth * 0.22} ${eyeHeight * 0.36} ${eyeWidth * 0.31} ${eyeHeight * 0.42}`}
          fill="none"
          stroke="#df5e5e"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d={`M ${eyeWidth * 0.12} ${eyeHeight * 0.35} Q ${eyeWidth * 0.18} ${eyeHeight * 0.44} ${eyeWidth * 0.25} ${eyeHeight * 0.48}`}
          fill="none"
          stroke="#df5e5e"
          strokeWidth="0.55"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d={`M ${eyeWidth * 0.08} ${eyeHeight * 0.64} Q ${eyeWidth * 0.22} ${eyeHeight * 0.59} ${eyeWidth * 0.31} ${eyeHeight * 0.54}`}
          fill="none"
          stroke="#df5e5e"
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d={`M ${eyeWidth * 0.48} ${eyeHeight * 0.06} Q ${eyeWidth * 0.51} ${eyeHeight * 0.18} ${eyeWidth * 0.53} ${eyeHeight * 0.28}`}
          fill="none"
          stroke="#df5e5e"
          strokeWidth="0.65"
          strokeLinecap="round"
          opacity="0.38"
        />
        <path
          d={`M ${eyeWidth * 0.92} ${eyeHeight * 0.34} Q ${eyeWidth * 0.8} ${eyeHeight * 0.38} ${eyeWidth * 0.69} ${eyeHeight * 0.44}`}
          fill="none"
          stroke="#df5e5e"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d={`M ${eyeWidth * 0.9} ${eyeHeight * 0.62} Q ${eyeWidth * 0.78} ${eyeHeight * 0.58} ${eyeWidth * 0.67} ${eyeHeight * 0.53}`}
          fill="none"
          stroke="#df5e5e"
          strokeWidth="0.65"
          strokeLinecap="round"
          opacity="0.42"
        />
      </svg>

      {/* Iris */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: irisSize,
          height: irisSize,
          left: eyeWidth / 2 - irisSize / 2,
          top: eyeHeight / 2 - irisSize / 2,
          x: springX,
          y: springY,
          background: `radial-gradient(circle at 40% 36%, ${irisColorSecondary} 0%, #874A20 40%, ${irisColor} 75%, #46220B 100%)`,
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.55), inset 0 -2px 5px rgba(255,255,255,0.15), 0 0 0 1.5px #3A1A07, 0 3px 8px rgba(0,0,0,0.35)",
        }}
      >
        {/* Subtle Iris Radial Striations */}
        {showIrisDetail && (
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-25 pointer-events-none">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 origin-left"
                style={{
                  width: irisSize * 0.45,
                  height: "1px",
                  background: "linear-gradient(to right, transparent 15%, #ffb870 60%, transparent 95%)",
                  transform: `rotate(${i * 22.5}deg)`,
                }}
              />
            ))}
          </div>
        )}

        {/* Pupil with MotionValue scaling */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: pupilSize,
            height: pupilSize,
            left: irisSize / 2 - pupilSize / 2,
            top: irisSize / 2 - pupilSize / 2,
            background: pupilColor,
            boxShadow: "0 0 2px rgba(0,0,0,0.9)",
            scale: pupilScale,
          }}
        />

        {/* Specular Highlights */}
        {showReflection && (
          <>
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: Math.round(pupilSize * 0.46),
                height: Math.round(pupilSize * 0.46),
                left: Math.round(irisSize * 0.28),
                top: Math.round(irisSize * 0.24),
                background: "#ffffff",
                boxShadow: "0 0 2px rgba(255, 255, 255, 0.95), 0 0 4px rgba(255, 255, 255, 0.5)",
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: Math.round(pupilSize * 0.2),
                height: Math.round(pupilSize * 0.2),
                left: Math.round(irisSize * 0.63),
                top: Math.round(irisSize * 0.61),
                background: "rgba(255, 255, 255, 0.8)",
              }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export function EyeTracking({
  className,
  eyeSize = 120,
  eyeWidth,
  eyeHeight,
  gap = 32,
  irisColor = "#8C4E22",
  irisColorSecondary = "#B06C38",
  pupilColor = "#0a0a0a",
  scleraColor = "#FAF6F0",
  pupilRange = 0.65,
  showReflection = true,
  showIrisDetail = true,
  idleAnimation = true,
  blinkInterval = 4000,
  eyeCount = 2,
  variant = "realistic",
  reactivePupil = true,
}) {
  const containerRef = React.useRef(null)
  const mouseX = React.useRef(typeof window !== "undefined" ? window.innerWidth / 2 : 0)
  const mouseY = React.useRef(typeof window !== "undefined" ? window.innerHeight / 2 : 0)
  const [isMounted, setIsMounted] = React.useState(false)
  const [inViewport, setInViewport] = React.useState(true)

  const resolvedWidth = eyeWidth || Math.round(eyeSize * 1.16)
  const resolvedHeight = eyeHeight || Math.round(eyeSize * 0.94)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  // IntersectionObserver to pause when off-screen
  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry?.isIntersecting ?? true)
      },
      { rootMargin: "100px" }
    )

    observer.observe(el)

    const handleVisibility = () => {
      if (document.hidden) {
        setInViewport(false)
      } else if (el) {
        const rect = el.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight + 100 && rect.bottom > -100
        setInViewport(isVisible)
      }
    }

    document.addEventListener("visibilitychange", handleVisibility, { passive: true })

    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  // Global mouse tracker (active only when in viewport)
  React.useEffect(() => {
    if (!inViewport) return

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
    }

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        mouseX.current = e.touches[0].clientX
        mouseY.current = e.touches[0].clientY
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [inViewport])

  // Idle animation - subtle random eye movement when no cursor activity
  React.useEffect(() => {
    if (!idleAnimation || !inViewport) return

    let idleInterval = null
    let restoreTimeout = null
    let lastX = mouseX.current
    let lastY = mouseY.current

    const checkIdle = () => {
      if (mouseX.current === lastX && mouseY.current === lastY) {
        if (!idleInterval) {
          idleInterval = setInterval(() => {
            const currentX = mouseX.current
            const currentY = mouseY.current
            mouseX.current = currentX + (Math.random() - 0.5) * 24
            mouseY.current = currentY + (Math.random() - 0.5) * 24
            restoreTimeout = setTimeout(() => {
              mouseX.current = currentX
              mouseY.current = currentY
            }, 500)
          }, 2400)
        }
      } else {
        if (idleInterval) {
          clearInterval(idleInterval)
          idleInterval = null
        }
      }
      lastX = mouseX.current
      lastY = mouseY.current
    }

    const idleTimeout = setInterval(checkIdle, 3000)

    return () => {
      clearInterval(idleTimeout)
      if (idleInterval) clearInterval(idleInterval)
      if (restoreTimeout) clearTimeout(restoreTimeout)
    }
  }, [idleAnimation, inViewport])

  if (!isMounted) {
    return (
      <div
        ref={containerRef}
        className={cn("flex items-center justify-center", className)}
        style={{ gap }}
      >
        {[...Array(eyeCount)].map((_, i) => (
          <div
            key={i}
            className="rounded-full bg-neutral-200"
            style={{ width: resolvedWidth, height: resolvedHeight }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center", className)}
      style={{ gap }}
    >
      {[...Array(eyeCount)].map((_, i) => (
        <Eye
          key={i}
          index={i}
          eyeWidth={resolvedWidth}
          eyeHeight={resolvedHeight}
          irisColor={irisColor}
          irisColorSecondary={irisColorSecondary}
          pupilColor={pupilColor}
          scleraColor={scleraColor}
          pupilRange={pupilRange}
          showReflection={showReflection}
          showIrisDetail={showIrisDetail}
          blinkInterval={blinkInterval}
          variant={variant}
          reactivePupil={reactivePupil}
          mouseX={mouseX}
          mouseY={mouseY}
          isActive={inViewport}
        />
      ))}
    </div>
  )
}
