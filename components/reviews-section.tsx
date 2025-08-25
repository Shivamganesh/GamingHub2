"use client"

import { motion } from "framer-motion"
import { easeOut } from "framer-motion"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const reviews = [
  {
    id: "1",
    game: "Cyberpunk Racer",
    reviewer: "SpeedDemon77",
    rating: 5,
    comment:
      "Absolutely thrilling! The races are intense and the customization options are endless. A must-play for racing fans!",
  },
  {
    id: "2",
    game: "Galactic Defender",
    reviewer: "StarPilotX",
    rating: 4,
    comment: "Great space shooter with solid mechanics. A bit repetitive after a while, but still very fun.",
  },
  {
    id: "3",
    game: "Fantasy Quest",
    reviewer: "LoreSeeker",
    rating: 5,
    comment: "An immersive RPG with a rich story and beautiful world. Lost hundreds of hours here!",
  },
  {
    id: "4",
    game: "Pixel Dungeon",
    reviewer: "RetroGamer",
    rating: 3,
    comment: "Challenging and addictive, but the difficulty spikes can be frustrating. Good for quick sessions.",
  },
  {
    id: "5",
    game: "Zombie Apocalypse",
    reviewer: "SurvivorQueen",
    rating: 4,
    comment: "Intense survival horror! The co-op mode is fantastic. Could use more weapon variety.",
  },
]

const ReviewsSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  }

  return (
    <section id="reviews" className="py-20 px-4 md:px-8 lg:px-16 bg-dark-bg-secondary">
      <motion.h2
        className="text-5xl md:text-6xl font-anton text-center text-text-primary mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        What Gamers Say
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="bg-dark-bg-primary p-6 rounded-lg shadow-lg border border-dark-bg-secondary card-hover-effect"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn("w-5 h-5", i < review.rating ? "text-accent fill-accent" : "text-text-secondary")}
                />
              ))}
              <span className="ml-3 text-text-secondary text-sm font-inter">{review.game}</span>
            </div>
            <p className="text-text-primary font-inter text-lg mb-4 leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
            <p className="text-text-secondary font-inter text-sm">- {review.reviewer}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default ReviewsSection
