import dynamic from "next/dynamic"
import GameClient from "./GameClient"

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

export default function IndividualGamePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const game = gameDetailsData[id as keyof typeof gameDetailsData];

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center text-text-primary text-2xl font-anton">
        Game Not Found!
      </div>
    );
  }

  return <GameClient game={game} id={id} />;
}
