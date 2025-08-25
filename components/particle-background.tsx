"use client"

import { useEffect, useRef } from "react"

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const numParticles = 50
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      const size = Math.random() * 3 + 1 // 1px to 4px
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 10}s`
      particle.style.animationDuration = `${20 + Math.random() * 10}s` // 20-30s
      particle.style.setProperty("--tw-translate-x", `${(Math.random() - 0.5) * 200}px`) // -100px to 100px
      particle.style.setProperty("--tw-translate-y", `${(Math.random() - 0.5) * 200}px`) // -100px to 100px
      particle.style.opacity = `${0.2 + Math.random() * 0.6}` // 0.2 to 0.8 opacity
      container.appendChild(particle)
      particles.push(particle)
    }

    return () => {
      particles.forEach((p) => p.remove())
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0"></div>
}

export default ParticleBackground
