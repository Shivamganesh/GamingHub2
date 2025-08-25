"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import React from "react"

import type { ComponentPropsWithoutRef } from "react"
interface NeonInputProps extends Omit<ComponentPropsWithoutRef<typeof motion.input>, "children"> {
  neonColor?: "cyan" | "magenta" | "gold"
}

export const NeonInput = React.forwardRef<HTMLInputElement, NeonInputProps>(
  ({ className, neonColor = "cyan", type = "text", ...props }, ref) => {
    const neonBorderClass = {
      cyan: "focus:ring-cyan-neon focus:border-cyan-neon",
      magenta: "focus:ring-magenta-neon focus:border-magenta-neon",
      gold: "focus:ring-gold-accent focus:border-gold-accent",
    }[neonColor]

    return (
      <motion.input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/50",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg-start",
          neonBorderClass,
          className,
        )}
        {...props}
      />
    )
  },
)
NeonInput.displayName = "NeonInput"
