
// Utility to filter out MotionValue children and render all valid ReactNode children
import { isMotionValue } from "framer-motion"
function renderValidChildren(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (
      typeof child === "string" ||
      typeof child === "number" ||
      React.isValidElement(child)
    ) {
      return child;
    }
    // Filter out MotionValue types
    if (child && typeof child === "object" && isMotionValue(child)) {
      return null;
    }
    return null;
  });
}
"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import React, { useState } from "react"

import type { ComponentPropsWithoutRef } from "react"

interface GlowingButtonProps extends Omit<ComponentPropsWithoutRef<typeof motion.button>, "children"> {
  children?: React.ReactNode;
  neonColor?: "cyan" | "magenta" | "gold"
  pulsating?: boolean
}

export const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ className, children, neonColor = "cyan", pulsating = false, onClick, ...props }, ref) => {
    const [ripple, setRipple] = useState<{ x: number; y: number; size: number } | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      setRipple({ x, y, size })
      setTimeout(() => setRipple(null), 600) // Remove ripple after animation

      onClick?.(event)
    }

    const neonClass = {
      cyan: "shadow-cyan-neon hover:shadow-cyan-neon",
      magenta: "shadow-magenta-neon hover:shadow-magenta-neon",
      gold: "shadow-gold-accent hover:shadow-gold-accent",
    }[neonColor]

    const bgColorClass = {
      cyan: "bg-cyan-neon",
      magenta: "bg-magenta-neon",
      gold: "bg-gold-accent",
    }[neonColor]

    const textColorClass = {
      cyan: "text-black",
      magenta: "text-white",
      gold: "text-black",
    }[neonColor]

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-3 rounded-full font-bold transition-all duration-300 ease-in-out overflow-hidden",
          bgColorClass,
          textColorClass,
          neonClass,
          pulsating && "animate-pulse-neon",
          className,
          "ripple-container", // Add this class for ripple effect
        )}
        whileHover={{ scale: 1.05, boxShadow: `0 0 15px var(--${neonColor}-neon)` }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        {...props}
      >
  {renderValidChildren(children)}
        {ripple && (
          <span
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        )}
      </motion.button>
    )
  },
)
GlowingButton.displayName = "GlowingButton"
