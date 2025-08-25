"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { socialLinks } from "./social-links"
import { FaTwitter, FaFacebook, FaInstagram, FaDiscord } from "react-icons/fa"

const ContactSection = () => {
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <section id="contact" className="py-20 px-4 md:px-8 lg:px-16 bg-dark-bg-primary">
      <motion.h2
        className="text-5xl md:text-6xl font-anton text-center text-text-primary mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </motion.h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          className="bg-dark-bg-secondary p-8 rounded-xl border border-dark-bg-primary shadow-lg"
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-3xl font-anton text-text-primary mb-6">Send us a message</h3>
          <form className="space-y-6">
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-text-secondary text-sm font-inter mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-md bg-dark-bg-primary border border-dark-bg-primary text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-text-secondary text-sm font-inter mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@example.com"
                className="w-full px-4 py-2 rounded-md bg-dark-bg-primary border border-dark-bg-primary text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-text-secondary text-sm font-inter mb-2">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message..."
                rows={5}
                className="w-full px-4 py-2 rounded-md bg-dark-bg-primary border border-dark-bg-primary text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <button type="submit" className="w-full px-6 py-3 rounded-full btn-accent text-lg">
                Send Message
              </button>
            </motion.div>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="bg-dark-bg-secondary p-8 rounded-xl border border-dark-bg-primary shadow-lg flex flex-col "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-3xl font-anton text-text-primary mb-6">Get in touch</h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="w-8 h-8 text-accent" />
              <div>
                <p className="text-text-primary font-inter text-lg">Email Us</p>
                <a
                  href="mailto:support@gaminghub.com"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  support@gaminghub.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-8 h-8 text-accent" />
              <div>
                <p className="text-text-primary font-inter text-lg">Call Us</p>
                <a href="tel:+1234567890" className="text-text-secondary hover:text-accent transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="w-8 h-8 text-accent" />
              <div>
                <p className="text-text-primary font-inter text-lg">Visit Us</p>
                <p className="text-text-secondary">123 Gaming Lane, Metacity, MG 98765</p>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="text-text-secondary hover:text-accent transition-colors text-2xl"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
