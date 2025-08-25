import { motion } from "framer-motion"
import { GameRating, GameReviewSection } from "@/components/game-reviews"
import Image from "next/image"
import { ArrowLeft, Play } from "lucide-react"
import Link from "next/link"
import LeaderboardSection from "@/components/leaderboard-section"
import { cn } from "@/lib/utils"

interface GamePageProps {
  params: { id: string }
}

// Mock data for game details
type GameDetails = {
  title: string;
  mainImage: string;
  trailerUrl: string;
  tagline?: string;
  description: string;
  features?: string[];
  instructions: string[];
  developer: string;
  releaseDate: string;
  rating: number;
  genre: string;
};

const gameDetailsData: { [id: string]: GameDetails } = {
  "1": {
    title: "Jumping Ball Runner",
    mainImage: "/jbr2.png",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: `Jumping Ball Runner is a charming emoji-inspired endless runner built for quick, joyful gameplay. Guide a bouncy emoji ball across colorful parallax worlds — day turns to night, stars sparkle, and the sun or moon arcs across the sky. Tap or press to jump (double jump supported), dodge increasingly tricky obstacles and grab coins for bonus points. Pick up shields to survive collisions, and celebrate milestones with confetti bursts and satisfying audio cues. The game stores your high score locally (so your best run is saved) and can post scores to a parent hub page for leaderboard integration. Play offline by opening the game folder and loading the HTML file.\n\nCan I play offline?\nYes. Download this folder and open index.html or the game file.`,
    features: [
      "Cute emoji character with expressive faces & rainbow trail.",
      "Fluid jump & double-jump mechanics (squash/stretch animation).",
      "Parallax backgrounds + day/night cycle (sun / moon + stars).",
      "Coins (+ bonus points), shield powerups (temporary immunity).",
      "Obstacles with friendly faces — pass to gain score.",
      "Milestone confetti and sound effects (WebAudio) for satisfying feedback.",
      "Responsive canvas scaling for different screens.",
      "Local high score saved to localStorage.",
      "Posts final score to parent window for hub integration.",
      "Play offline: open the HTML file (no server needed)."
    ],
    instructions: [
      "Jump: Space / ArrowUp / W — also tap / click on screen.",
      "Double jump: press jump again while airborne (max 2 jumps).",
      "Pause / Resume: P or click the ⏯ button (top right).",
      "Mute / Unmute: M or click the 🔊 button (top right).",
      "Start: Click Start in the modal or tap the screen.",
      "Retry: Enter or use the Retry button after Game Over."
    ],
    developer: "Emoji Games Studio",
    releaseDate: "2025-08-13",
    rating: 5,
    genre: "Runner, Arcade, Emoji",
  },
  "2": {
    title: "Galactic Defender",
    mainImage: "/space-shooter-detail.png",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: `Command your starship and defend the galaxy from alien invaders. Upgrade your weapons, recruit a crew, and explore uncharted systems in this epic space shooter. The fate of the universe rests on your shoulders!

Engage in thrilling dogfights, navigate asteroid fields, and face colossal boss battles. Discover ancient alien artifacts and unravel the mystery behind the invasion.`,
    instructions: [
      "Use Mouse to aim and Left Click to fire.",
      "Use WASD to move your spaceship.",
      "Press Q or E to switch weapons.",
      "Press R to activate special ability (e.g., shield, EMP blast).",
      "Collect energy orbs from defeated enemies to upgrade your ship.",
      "Complete missions to unlock new sectors and powerful upgrades.",
    ],
    developer: "Cosmic Forge",
    releaseDate: "2078-03-15",
    rating: 4,
    genre: "Space Shooter, Action",
  },
  "3": {
    title: "Fantasy Quest",
    mainImage: "/fantasy-rpg-game-detail.png",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: `Embark on a grand adventure through mystical lands filled with ancient magic and fearsome beasts. Choose your hero, master powerful spells, and uncover the secrets of a forgotten kingdom in this immersive RPG.

Explore vast open-world environments, interact with diverse characters, and make choices that shape your destiny. Join guilds, craft legendary items, and challenge epic bosses in turn-based combat.`,
    instructions: [
      "Use WASD to move your character.",
      "Left Click to interact with NPCs and objects.",
      "Press I to open inventory, J for journal, K for skills.",
      "Engage enemies in turn-based combat: select actions from the menu.",
      "Complete quests to gain experience and level up your character.",
      "Craft potions and gear using collected resources.",
    ],
    developer: "Mythic Realms Inc.",
    releaseDate: "2076-11-01",
    rating: 5,
    genre: "RPG, Adventure",
  },
  "4": {
    title: "Pixel Dungeon",
    mainImage: "/pixel-art-dungeon-detail.png",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: `A classic rogue-like dungeon crawling experience. Descend into procedurally generated dungeons, battle monsters, collect loot, and try to survive as long as you can.

Each run is unique, offering new challenges and discoveries. Beware of traps and hidden dangers as you delve deeper into the unknown.`,
    instructions: [
      "Use Arrow Keys to move.",
      "Click on items to pick them up or interact.",
      "Click on enemies to attack.",
      "Manage hunger and health carefully.",
      "Identify unknown potions and scrolls before using them.",
      "Find the Amulet of Yendor to win the game (if you can!).",
    ],
    developer: "Indie Devs",
    releaseDate: "2023-05-20",
    rating: 3,
    genre: "Rogue-like, Pixel Art",
  },
  "5": {
    title: "Space Explorer",
    mainImage: "/sci-fi-exploration-detail.png",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: `Embark on an interstellar journey to explore uncharted systems and discover new planets. Mine resources, build outposts, and encounter diverse alien life forms.

This sandbox exploration game offers endless possibilities for discovery and creation. Chart new constellations, research advanced technologies, and establish your presence in the vast cosmos.`,
    instructions: [
      "Use WASD to control your exploration vessel.",
      "Left Click to interact with objects and mine resources.",
      "Press M for galaxy map, B for build menu.",
      "Scan planets for rare minerals and anomalies.",
      "Build and upgrade your space station.",
      "Trade resources with alien factions to gain reputation.",
    ],
    developer: "Galactic Studios",
    releaseDate: "2079-01-01",
    rating: 4,
    genre: "Exploration, Sci-Fi, Sandbox",
  },
  "6": {
    title: "Zombie Apocalypse",
    mainImage: "/zombie-survival-detail.png",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: `Survive hordes of zombies in a brutal post-apocalyptic world. Scavenge for supplies, fortify your shelter, and team up with other survivors to fight for humanity's future.

Every decision matters in this unforgiving survival horror. Manage your resources, craft weapons, and make difficult moral choices that impact your group.`,
    instructions: [
      "Use WASD to move, Mouse to aim.",
      "Left Click to fire, R to reload.",
      "Press E to interact with objects (open doors, pick up items).",
      "Press F to use melee attack.",
      "Manage hunger, thirst, and fatigue levels.",
      "Fortify your base during the day, defend it at night.",
    ],
    developer: "Survival Games Inc.",
    releaseDate: "2022-11-30",
    rating: 4,
    genre: "Survival, Horror, Action",
  },
}

export default async function IndividualGamePage({ params }: GamePageProps) {
  const { id } = params;
  const game = gameDetailsData[id as keyof typeof gameDetailsData];


  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center text-text-primary text-2xl font-anton">
        Game Not Found!
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-dark-bg-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <Link
          href="/#games"
          className="inline-flex items-center text-text-secondary hover:text-accent transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-inter">Back to Games</span>
        </Link>

        <h1 className="text-5xl md:text-7xl font-anton text-text-primary mb-2 text-center md:text-left">
          {game.title}
        </h1>
        {game.tagline && (
          <p className="text-xl font-inter text-accent mb-8 text-center md:text-left">{game.tagline}</p>
        )}


        {/* Main Game Image */}
        <motion.div
          className="relative w-full h-96 rounded-xl overflow-hidden mb-8 shadow-lg border border-dark-bg-secondary"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src={game.mainImage || "/placeholder.svg"}
            alt={game.title}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            quality={90}
            placeholder="blur"
            blurDataURL="/placeholder.svg?height=48&width=48"
          />
  </motion.div>

        {/* Description Section */}
        <motion.div
          className="bg-dark-bg-secondary p-6 rounded-xl border border-dark-bg-primary shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-anton text-text-primary mb-4">Description</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-secondary font-inter text-sm mb-6">
            <div>
              <span className="font-bold text-text-primary">Developer:</span> {game.developer}
            </div>
            <div>
              <span className="font-bold text-text-primary">Release Date:</span> {game.releaseDate}
            </div>
            <div>
              <span className="font-bold text-text-primary">Genre:</span> {game.genre}
            </div>
          </div>
          {/* Rating directly below release date/genre */}
          <div className="mt-2">
            <GameRating initialRating={game.rating} gameId={id} />
          </div>
          <p className="text-text-secondary font-inter leading-relaxed whitespace-pre-line mt-4">{game.description}</p>

        </motion.div>

        {/* Features Section */}
        {game.features && (
          <motion.div
            className="bg-dark-bg-secondary p-6 rounded-xl border border-dark-bg-primary shadow-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h3 className="text-2xl font-anton text-text-primary mb-2">Features</h3>
            <ul className="list-disc list-inside text-text-secondary font-inter space-y-1 mb-2">
              {game.features.map((feature: string, idx: number) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Instructions Section */}
        <motion.div
          className="bg-dark-bg-secondary p-6 rounded-xl border border-dark-bg-primary shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl font-anton text-text-primary mb-4">Instructions</h2>
          <ul className="list-disc list-inside text-text-secondary font-inter space-y-2">
            {game.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </motion.div>

        {/* Leaderboard Section for this specific game */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mb-12"
        >
          <LeaderboardSection gameId={id} />
        </motion.div>

        {/* Review Section (form and reviews list) */}
        <section className="max-w-3xl mx-auto w-full">
          <GameReviewSection gameId={id} />
        </section>

        {/* Trailer Section */}
        <motion.div
          className="bg-dark-bg-secondary p-6 rounded-xl border border-dark-bg-primary shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h2 className="text-3xl font-anton text-text-primary mb-6">Game Trailer</h2>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" /* 16:9 Aspect Ratio */ }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={game.trailerUrl}
              title={`${game.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
