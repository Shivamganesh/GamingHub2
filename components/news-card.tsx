"use client"

import { motion } from "framer-motion"
import Image from "next/image"

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

interface NewsCardProps {
  post: {
    id: string
    title: string
    excerpt: string
    image: string
    date: string
  }
}

const NewsCard = ({ post }: NewsCardProps) => {
  const router = useRouter();
  const { user } = useUser();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    router.push(`/news/${post.id}`);
  };

  return (
    <motion.div
      className="rounded-lg overflow-hidden bg-dark-bg-secondary border border-dark-bg-primary shadow-lg card-hover-effect cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
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
        <h3 className="text-xl font-anton text-text-primary mb-2">{post.title}</h3>
        <p className="text-sm text-text-secondary font-inter mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
        <p className="text-xs text-text-secondary/70 font-inter mb-4">{post.date}</p>
        <span className="inline-block px-4 py-2 rounded-md btn-accent text-sm">Read More</span>
      </div>
    </motion.div>
  )
}

export default NewsCard
