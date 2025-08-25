"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Play } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

const HeroSection = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.5 } },
  }

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <Image
        src={currentTheme === "light" ? "/images/gamic4.JPG" : "/images/hero-background.png"}
        alt="Futuristic gaming background"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: 0 }}
        priority
        quality={90}
        placeholder="blur"
        blurDataURL="/abstract-futuristic-pattern.png"
        onError={(e) => {
          console.error("Hero image failed to load:", e.currentTarget.src, e)
        }}
      />
      <div className={`absolute inset-0 z-1 transition-colors duration-300 ${currentTheme === "dark" ? "bg-black/60" : ""}`}></div>
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <motion.h1
          className="text-7xl md:text-9xl font-anton leading-none mb-4 drop-shadow-lg will-change-transform translate-z-0 text-white"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          REDEFINE
          <br />
          GAMING
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-inter mb-8 text-white max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          Play. Compete. Connect. Welcome to the GamingHub.
        </motion.p>
        <motion.button
          className="inline-flex items-center px-8 py-4 rounded-full btn-accent text-lg"
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
        >
          <Play className="w-6 h-6 mr-2" /> Watch Trailer
        </motion.button>
      </div>
    </section>
  )
}

export default HeroSection
