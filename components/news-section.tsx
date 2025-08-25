"use client"

import { motion } from "framer-motion"
import NewsCard from "./news-card"

const newsPosts = [
  {
    id: "1",
    title: "New Game Release: Cyberpunk Racer",
    excerpt: "Get ready for high-speed action in the neon-drenched streets of Neo-Kyoto...",
    fullContent: `The highly anticipated "Cyberpunk Racer" has officially launched, bringing a new era of high-octane racing to the gaming world! Players can now dive into the neon-drenched streets of Neo-Kyoto, customizing their hovercars and battling rivals in thrilling races. The game features breathtaking visuals, dynamic weather systems, and a pulsating synthwave soundtrack that promises to keep your adrenaline pumping. Compete in various modes, from intense street races to challenging time trials, and unlock new vehicles and upgrades as you climb the global leaderboards. Don't miss out on the ultimate futuristic racing experience!`,
    image: "/futuristic-racing-game-detail.png",
    date: "2024-07-28",
  },
  {
    id: "2",
    title: "Patch Notes v1.2.0 for Galactic Defender",
    excerpt: "We've implemented major balance changes and new content for your starship...",
    fullContent: `Attention Galactic Defenders! Patch v1.2.0 is now live, bringing a host of major balance changes, new content, and crucial bug fixes to enhance your space combat experience. Key updates include:
    - **New Starship Modules**: Discover and equip powerful new modules to customize your vessel.
    - **Weapon Rebalancing**: Adjustments to various weapon types to ensure fair and engaging combat.
    - **Sector Expansion**: Explore two new uncharted sectors filled with unique challenges and rewards.
    - **Performance Optimizations**: Improved frame rates and reduced load times across all platforms.
    We've also addressed several community-reported bugs to ensure a smoother gameplay experience. Jump back into the cockpit and defend the galaxy!`,
    image: "/spaceship-in-deep-space.png",
    date: "2024-07-25",
  },
  {
    id: "3",
    title: "Community Event: Fantasy Quest Tournament",
    excerpt: "Join our first official tournament and prove your might in the mystical lands...",
    fullContent: `Prepare your spells and sharpen your blades, adventurers! We are thrilled to announce the first official "Fantasy Quest Tournament," commencing on August 15th. This grand event invites all heroes to prove their might in a series of challenging quests and battles across the mystical lands of Eldoria. Participants will compete for exclusive in-game rewards, rare artifacts, and the coveted title of Grand Champion. Sign-ups are now open on our community forums. Gather your party, hone your skills, and get ready for an epic showdown!`,
    image: "/fantasy-castle.png",
    date: "2024-07-20",
  },
]

const NewsSection = () => {
  return (
    <section id="news" className="py-20 px-4 md:px-8 lg:px-16 bg-dark-bg-primary">
      <motion.h2
        className="text-5xl md:text-6xl font-anton text-center text-text-primary mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Latest News
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {newsPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <NewsCard post={post} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default NewsSection
