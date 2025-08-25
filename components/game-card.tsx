"use client"

import { motion } from "framer-motion"
import Image from "next/image"

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

interface GameCardProps {
  game: {
    id: string
    title: string
    thumbnail: string
    description: string
    instructions: string[] // Now an array of strings
    mainImage: string
    trailerUrl: string
  }
}



const GameCard = ({ game }: GameCardProps) => {
  const router = useRouter();
  const { user } = useUser();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    router.push(`/games/${game.id}`);
  };

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden bg-dark-bg-primary border border-dark-bg-secondary shadow-lg card-hover-effect group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={game.thumbnail || "/placeholder.svg"}
          alt={game.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-105"
          quality={88}
          placeholder="blur"
          blurDataURL="/placeholder.svg?height=48&width=48"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-anton text-text-primary mb-2">{game.title}</h3>
        <p className="text-sm text-text-secondary font-inter mb-4">{game.description}</p>
        {/* The "View Details" link is now implied by clicking the card */}
        <span className="inline-block px-4 py-2 rounded-md btn-accent text-sm">View Details</span>
      </div>
    </motion.div>
  );
}

export default GameCard
