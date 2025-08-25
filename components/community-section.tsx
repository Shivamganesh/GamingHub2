"use client"


import { motion } from "framer-motion"
import { easeOut } from "framer-motion"
import { Users, MessageSquare, ImageIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "../hooks/useUser"


const CommunitySection = () => {
  const router = useRouter();
  const { user } = useUser();
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const handleCommunityClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    if (!user) {
      e.preventDefault();
      router.push("/login");
    } else if (href && href !== "#") {
      router.push(href);
    }
  };

  return (
    <section id="community" className="py-20 px-4 md:px-8 lg:px-16 bg-dark-bg-secondary">
      <motion.h2
        className="text-5xl md:text-6xl font-anton text-center text-text-primary mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Join Our Community
      </motion.h2>
      <div className="max-w-4xl mx-auto text-center text-text-secondary font-inter text-lg mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Connect with fellow gamers, share your experiences, and be part of the ultimate gaming ecosystem.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <motion.div
          className="bg-dark-bg-primary p-8 rounded-lg text-center shadow-lg card-hover-effect"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Users className="w-16 h-16 text-accent mx-auto mb-4" />
          <h3 className="text-2xl font-anton text-text-primary mb-2">Forums</h3>
          <p className="text-text-secondary font-inter mb-4">Discuss strategies, find teammates, and get support.</p>
          <a
            href="#"
            className="inline-block px-6 py-3 rounded-full btn-accent cursor-pointer"
            onClick={e => handleCommunityClick(e, '#')}
          >
            Visit Forums
          </a>
        </motion.div>
        <motion.div
          className="bg-dark-bg-primary p-8 rounded-lg text-center shadow-lg card-hover-effect"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2 }}
        >
          <MessageSquare className="w-16 h-16 text-accent mx-auto mb-4" />
          <h3 className="text-2xl font-anton text-text-primary mb-2">Live Chat</h3>
          <p className="text-text-secondary font-inter mb-4">Chat with other players in real-time.</p>
          <a
            href="#"
            className="inline-block px-6 py-3 rounded-full btn-accent cursor-pointer"
            onClick={e => handleCommunityClick(e, '#')}
          >
            Join Chat
          </a>
        </motion.div>
        <motion.div
          className="bg-dark-bg-primary p-8 rounded-lg text-center shadow-lg card-hover-effect"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.4 }}
        >
          <ImageIcon className="w-16 h-16 text-accent mx-auto mb-4" />
          <h3 className="text-2xl font-anton text-text-primary mb-2">User Content</h3>
          <p className="text-text-secondary font-inter mb-4">Share your fan art, videos, and creations.</p>
          <a
            href="#"
            className="inline-block px-6 py-3 rounded-full btn-accent cursor-pointer"
            onClick={e => handleCommunityClick(e, '#')}
          >
            Explore Content
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default CommunitySection
