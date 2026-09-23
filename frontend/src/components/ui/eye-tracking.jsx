import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
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
  mouseY
}) {
  const eyeRef = React.useRef(null)
  const [isBlinking, setIsBlinking] = React.useState(false)
  const [pupilScale, setPupilScale] = React.useState(1)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 24, mass: 0.45 })
  const springY = useSpring(y, { stiffness: 280, damping: 24, mass: 0.45 })

  const irisSize = Math.round(eyeHeight * 0.53)
  const pupilSize = Math.round(irisSize * 0.48)
  const maxOffsetX = (eyeWidth / 2 - irisSize / 2 - 6) * pupilRange
  const maxOffsetY = (eyeHeight / 2 - irisSize / 2 - 5) * pupilRange

  // Blink animation
  React.useEffect(() => {
    if (blinkInterval <= 0) return

    const blink = () => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 140)
    }

    const randomOffset = index * 100 + Math.random() * 200
    const timeout = setTimeout(() => {
      blink()
      const interval = setInterval(blink, blinkInterval + Math.random() * 1500)
      return () => clearInterval(interval)
    }, randomOffset)

    return () => clearTimeout(timeout)
  }, [blinkInterval, index])

  // Track mouse position and update pupil
  React.useEffect(() => {
    let animFrame

    const update = () => {
      if (!eyeRef.current) {
        animFrame = requestAnimationFrame(update)
        return
      }

      const rect = eyeRef.current.getBoundingClientRect()
      const eyeCenterX = rect.left + rect.width / 2
      const eyeCenterY = rect.top + rect.height / 2

      const dx = mouseX.current - eyeCenterX
      const dy = mouseY.current - eyeCenterY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)

      const clampedDistance = Math.min(distance, 500)
      const normalizedDistance = clampedDistance / 500
      
      const offsetX = Math.cos(angle) * (normalizedDistance * maxOffsetX)
      const offsetY = Math.sin(angle) * (normalizedDistance * maxOffsetY)

      // Slight natural resting offset inward (converging like the reference photo)
      const restingInward = index === 0 ? 5 : -5
      x.set(offsetX + restingInward)
      y.set(offsetY)

      // Reactive pupil dilation based on distance
      if (reactivePupil) {
        const proximityScale = distance < 200 ? 1.15 - (distance / 200) * 0.15 : 0.94 + (Math.min(distance, 800) / 800) * 0.06
        setPupilScale(proximityScale)
      }

      animFrame = requestAnimationFrame(update)
    }

    animFrame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animFrame)
  }, [x, y, maxOffsetX, maxOffsetY, reactivePupil, mouseX, mouseY, index])

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
      {/* 3D Eyeball Delicate Red Capillary Veins (Matching reference image) */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full"
        viewBox={`0 0 ${eyeWidth} ${eyeHeight}`}
      >
        {/* Left periphery veins */}
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

        {/* Top subtle vein */}
        <path
          d={`M ${eyeWidth * 0.48} ${eyeHeight * 0.06} Q ${eyeWidth * 0.51} ${eyeHeight * 0.18} ${eyeWidth * 0.53} ${eyeHeight * 0.28}`}
          fill="none"
          stroke="#df5e5e"
          strokeWidth="0.65"
          strokeLinecap="round"
          opacity="0.38"
        />

        {/* Right periphery veins */}
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

        {/* Pupil */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: pupilSize,
            height: pupilSize,
            left: irisSize / 2 - pupilSize / 2,
            top: irisSize / 2 - pupilSize / 2,
            background: pupilColor,
            boxShadow: "0 0 2px rgba(0,0,0,0.9)",
          }}
          animate={{
            scale: reactivePupil ? pupilScale : 1,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />

        {/* Specular Highlights (Matching Reference Image) */}
        {showReflection && (
          <>
            {/* Main Crisp White Specular Dot (Upper-Left 10 o'clock position) */}
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
            {/* Secondary Soft Specular Dot (Lower-Right 4 o'clock position) */}
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
  const mouseX = React.useRef(typeof window !== "undefined" ? window.innerWidth / 2 : 0)
  const mouseY = React.useRef(typeof window !== "undefined" ? window.innerHeight / 2 : 0)
  const [isMounted, setIsMounted] = React.useState(false)

  const resolvedWidth = eyeWidth || Math.round(eyeSize * 1.16)
  const resolvedHeight = eyeHeight || Math.round(eyeSize * 0.94)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  // Global mouse tracker
  React.useEffect(() => {
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
  }, [])

  // Idle animation - subtle random eye movement when no cursor activity
  React.useEffect(() => {
    if (!idleAnimation) return

    let idleInterval
    let lastX = mouseX.current
    let lastY = mouseY.current

    const checkIdle = () => {
      if (mouseX.current === lastX && mouseY.current === lastY) {
        // Start idle micro-movements
        idleInterval = setInterval(() => {
          const currentX = mouseX.current
          const currentY = mouseY.current
          mouseX.current = currentX + (Math.random() - 0.5) * 24
          mouseY.current = currentY + (Math.random() - 0.5) * 24
          // Restore after brief moment
          setTimeout(() => {
            mouseX.current = currentX
            mouseY.current = currentY
          }, 500)
        }, 2200)
      }
      lastX = mouseX.current
      lastY = mouseY.current
    }

    const idleTimeout = setInterval(checkIdle, 3000)

    return () => {
      clearInterval(idleTimeout)
      clearInterval(idleInterval)
    }
  }, [idleAnimation])

  if (!isMounted) {
    return (
      <div
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
        />
      ))}
    </div>
  )
}

