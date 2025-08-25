"use client"

import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { motion } from "framer-motion"

const Footer = () => {
  return (
  <motion.footer
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 32 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className="relative bg-gradient-to-t from-dark-bg-primary via-dark-bg-secondary to-transparent py-12 px-4 md:px-8 lg:px-16 border-t border-dark-bg-secondary shadow-inner overflow-hidden"
  >
    <div className="absolute inset-0 pointer-events-none select-none opacity-30 blur-2xl" aria-hidden>
      <div className="w-[60vw] h-[60vw] bg-gradient-radial from-green-500/20 to-transparent rounded-full mx-auto mt-[-10vh]" />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 items-start text-center md:text-left relative z-10"
    >
        {/* Newly Added Games */}
        <div>
          <h4 className="text-lg font-bold text-green-400 mb-4 tracking-wide uppercase border-b border-green-700/30 pb-2">Newly Added Games</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/games/cyberpunk-racer" className="text-text-secondary hover:text-green-400 focus:text-green-400 transition-colors font-medium">Cyberpunk Racer</a></li>
            <li><a href="/games/galactic-defender" className="text-text-secondary hover:text-green-400 focus:text-green-400 transition-colors font-medium">Galactic Defender</a></li>
            <li><a href="/games/pixel-dungeon" className="text-text-secondary hover:text-green-400 focus:text-green-400 transition-colors font-medium">Pixel Dungeon</a></li>
          </ul>
        </div>
        {/* Navigation */}
        <div>
          <h4 className="text-lg font-bold text-green-400 mb-4 tracking-wide uppercase border-b border-green-700/30 pb-2">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="text-text-secondary hover:text-green-400 focus:text-green-400 transition-colors text-sm font-medium">Home</a></li>
            <li><a href="/#games" className="text-text-secondary hover:text-green-400 focus:text-green-400 transition-colors text-sm font-medium">Games</a></li>
            <li><a href="/#leaderboard" className="text-text-secondary hover:text-green-400 focus:text-green-400 transition-colors text-sm font-medium">Leaderboard</a></li>
            <li><a href="/#news" className="text-text-secondary hover:text-green-400 focus:text-green-400 transition-colors text-sm font-medium">News</a></li>
            <li><a href="/#community" className="text-text-secondary hover:text-green-400 focus:text-green-400 transition-colors text-sm font-medium">Community</a></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold text-green-400 mb-4 tracking-wide uppercase border-b border-green-700/30 pb-2">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li><span className="text-text-secondary">Email:</span> <a href="mailto:support@gaminghub.com" className="hover:text-green-400 focus:text-green-400 text-text-secondary transition-colors font-medium">support@gaminghub.com</a></li>
            <li><span className="text-text-secondary">Phone:</span> <a href="tel:+1234567890" className="hover:text-green-400 focus:text-green-400 text-text-secondary transition-colors font-medium">+1 (234) 567-890</a></li>
            <li><span className="text-text-secondary">Location:</span> <span className="text-text-secondary font-medium">123 Gaming Lane, Metacity</span></li>
          </ul>
        </div>
        {/* Socials */}
        <div>
          <h4 className="text-lg font-bold text-green-400 mb-4 tracking-wide uppercase border-b border-green-700/30 pb-2">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-4 mb-2">
            <motion.a
              href="#"
              className="text-text-secondary hover:text-green-400 hover:bg-green-400/10 focus:text-green-400 rounded-full p-2 transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.18, rotate: 8 }}
              transition={{ duration: 0.18 }}
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </motion.a>
            <motion.a
              href="#"
              className="text-text-secondary hover:text-green-400 hover:bg-green-400/10 focus:text-green-400 rounded-full p-2 transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.18, rotate: -8 }}
              transition={{ duration: 0.18 }}
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </motion.a>
            <motion.a
              href="#"
              className="text-text-secondary hover:text-green-400 hover:bg-green-400/10 focus:text-green-400 rounded-full p-2 transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.18, rotate: 8 }}
              transition={{ duration: 0.18 }}
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </motion.a>
            <motion.a
              href="#"
              className="text-text-secondary hover:text-green-400 hover:bg-green-400/10 focus:text-green-400 rounded-full p-2 transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.18, rotate: -8 }}
              transition={{ duration: 0.18 }}
              aria-label="Youtube"
            >
              <Youtube size={24} />
            </motion.a>
          </div>
        </div>
  </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        className="max-w-6xl mx-auto mt-12 pt-6 border-t border-dark-bg-secondary text-center text-xs text-text-secondary opacity-70 relative z-10"
      >
        &copy; {new Date().getFullYear()} Shivam Gupta. All rights reserved.
      </motion.div>
  </motion.footer>
  )
}

export default Footer
