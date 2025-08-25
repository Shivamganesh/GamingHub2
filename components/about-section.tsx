"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const AboutSection = () => {
  return (
    <section id="about" className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Subtle moving gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-dark-bg-mid via-dark-bg-start to-dark-bg-end bg-[length:200%_200%] animate-gradient-shift"></div>

      <motion.h2
        className="relative z-10 text-5xl md:text-6xl font-pixel text-center text-gradient-neon mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h2>

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="text-white/80 font-poppins leading-relaxed text-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-6">
            Welcome to the Ultimate Modern Gaming Hub, your premier destination for an unparalleled gaming experience!
            We are passionate about bringing together gamers from all walks of life, providing a vibrant platform where
            you can discover new titles, challenge friends, and climb the leaderboards.
          </p>
          <p className="mb-6">
            Our mission is to create an immersive and responsive environment that celebrates the joy of gaming. With
            cutting-edge technology, stunning neon aesthetics, and a commitment to community, we ensure every moment you
            spend here is epic.
          </p>
          <p>
            Join us on this exciting journey as we continue to expand our library and introduce innovative features. Get
            ready to level up your playtime!
          </p>
        </motion.div>
        <motion.div
          className="relative w-full h-80 lg:h-96 rounded-xl overflow-hidden shadow-neon-gold animate-float"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Cartoon gaming illustration"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            quality={90}
            placeholder="blur"
            blurDataURL="/placeholder.svg?height=48&width=48"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
