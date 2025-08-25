"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Re-using the newsPosts data from components/news-section.tsx for consistency
// In a real application, you would fetch this data from an API or database
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
    - **Sector Expansion**: Explore two new uncharted sectors with unique challenges and rewards.
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

interface NewsPageProps {
  params: Promise<{ id: string }>
}

const IndividualNewsPage = async ({ params }: NewsPageProps) => {
  const { id } = await params;
  const post = newsPosts.find((p) => p.id === id)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-text-primary text-2xl font-anton">
        News Article Not Found!
      </div>
    )
  }

  return (
  <div className="min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-white dark:bg-dark-bg-primary transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Link
          href="/#news"
          className="inline-flex items-center text-text-secondary hover:text-accent transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-inter">Back to Latest News</span>
        </Link>

        <h1 className="text-4xl md:text-6xl font-anton text-text-primary mb-6 leading-tight">{post.title}</h1>
        <p className="text-sm text-text-secondary/70 font-inter mb-8">{post.date}</p>

        <motion.div
          className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden mb-8 shadow-lg border border-accent/20 bg-white dark:bg-dark-bg-secondary"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            quality={90}
            placeholder="blur"
            blurDataURL="/placeholder.svg?height=48&width=48"
          />
        </motion.div>

        <motion.div
          className="bg-white/90 dark:bg-dark-bg-secondary p-6 rounded-xl border border-accent/10 shadow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="prose dark:prose-invert max-w-none text-lg">
            {post.fullContent}
          </div>
        </motion.div>
        {/* Related News Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-accent">Related News</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {newsPosts.filter(n => n.id !== post.id).slice(0,2).map((related) => (
              <Link key={related.id} href={`/news/${related.id}`} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-dark-bg-primary shadow hover:shadow-lg border border-accent/10 transition-all">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={related.image} alt={related.title} width={80} height={80} className="object-cover w-full h-full" />
                </div>
                <div>
                  <div className="text-accent text-xs font-semibold mb-1">{related.date}</div>
                  <div className="font-bold text-base mb-1 line-clamp-1">{related.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{related.excerpt}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  )
}

export default IndividualNewsPage
