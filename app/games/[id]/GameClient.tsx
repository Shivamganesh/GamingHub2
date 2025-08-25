"use client";

import { motion } from "framer-motion";
import { GameRating, GameReviewSection } from "@/components/game-reviews";
import Image from "next/image";
import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import LeaderboardSection from "@/components/leaderboard-section";
import { cn } from "@/lib/utils";

interface GameClientProps {
  game: any;
  id: string;
}

export default function GameClient({ game, id }: GameClientProps) {
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
            {game.instructions.map((instruction: string, index: number) => (
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
  );
}
