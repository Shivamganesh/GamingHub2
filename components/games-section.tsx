"use client"

import { motion } from "framer-motion"
import GameCard from "./game-card"

const games = [
  {
    id: "1",
    title: "Jumping Ball Runner",
  thumbnail: "/jbr2.png",
    description: "Charming emoji endless runner. Jump, dodge, collect coins!",
    instructions: [
      "Jump: Space / ArrowUp / W or tap/click",
      "Pause/Resume: P or ⏯ button",
      "Mute/Unmute: M or 🔊 button",
      "Goal: Jump over obstacles; collect coins; shield blocks collisions"
    ],
  mainImage: "/gamic1.JPG",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Galactic Defender",
    thumbnail: "/space-shooter.png",
    description: "Defend the galaxy from alien invaders.",
    instructions: [
      "Use Mouse to aim and Left Click to fire.",
      "Use WASD to move your spaceship.",
      "Press Q or E to switch weapons.",
    ],
    mainImage: "/space-shooter-detail.png",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "Fantasy Quest",
    thumbnail: "/fantasy-rpg-game.png",
    description: "Embark on an epic adventure through mystical lands.",
    instructions: [
      "Use WASD to move your character.",
      "Left Click to interact with NPCs and objects.",
      "Press I to open inventory, J for journal, K for skills.",
    ],
    mainImage: "/fantasy-rpg-game-detail.png",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Pixel Dungeon",
    thumbnail: "/pixel-art-dungeon.png",
    description: "Classic rogue-like dungeon crawling.",
    instructions: [
      "Use Arrow Keys to move.",
      "Click on items to pick them up or interact.",
      "Click on enemies to attack.",
    ],
    mainImage: "/pixel-art-dungeon-detail.png",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "5",
    title: "Space Explorer",
    thumbnail: "/sci-fi-exploration.png",
    description: "Explore uncharted systems and discover new planets.",
    instructions: [
      "Use WASD to control your exploration vessel.",
      "Left Click to interact with objects and mine resources.",
      "Press M for galaxy map, B for build menu.",
    ],
    mainImage: "/sci-fi-exploration-detail.png",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "6",
    title: "Zombie Apocalypse",
    thumbnail: "/zombie-survival.png",
    description: "Survive hordes of zombies in a post-apocalyptic world.",
    instructions: [
      "Use WASD to move, Mouse to aim.",
      "Left Click to fire, R to reload.",
      "Press E to interact with objects (open doors, pick up items).",
    ],
    mainImage: "/zombie-survival-detail.png",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
]

const GamesSection = () => {
  return (
    <section id="games" className="py-20 px-4 md:px-8 lg:px-16 bg-dark-bg-secondary">
      <motion.h2
        className="text-5xl md:text-6xl font-anton text-center text-text-primary mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Our Games
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GameCard game={game} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default GamesSection
