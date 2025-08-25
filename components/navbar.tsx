"use client";

import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, User, Menu, X } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Games", href: "/#games" },
  { name: "Leaderboard", href: "/#leaderboard" },
  { name: "News", href: "/#news" },
  { name: "Community", href: "/#community" },
  { name: "About", href: "/#about" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, username, loading } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // prevent background scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-6 md:px-8 flex justify-between items-center transition-all duration-300 ${
          isScrolled
            ? "bg-dark-bg-primary/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/abstract-gaming-logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span
            className={`text-xl sm:text-2xl font-anton truncate ${
              isScrolled ? "text-black dark:text-text-primary" : "text-white"
            }`}
          >
            GamingHub
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-base font-inter hover:text-accent transition-colors duration-200 ${
                isScrolled ? "text-black dark:text-text-primary" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="p-2 rounded-full hover:bg-accent/20 transition"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-text-primary" />
              ) : (
                <Moon
                  className={`w-5 h-5 ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                />
              )}
            </button>
          )}

          {/* Auth */}
          {loading ? (
            <div className="w-8 h-8 flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent"></div>
            </div>
          ) : user ? (
            <Link
              href="/profile"
              className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-dark-bg-primary text-text-primary hover:bg-dark-bg-secondary transition-colors"
            >
              {user.user_metadata?.avatar_url ? (
                <Image
                  src={
                    user.user_metadata.avatar_url.includes("?")
                      ? `${user.user_metadata.avatar_url}&nav=${Math.random()}`
                      : `${user.user_metadata.avatar_url}?nav=${Math.random()}`
                  }
                  alt="avatar"
                  width={28}
                  height={28}
                  className="rounded-full w-7 h-7 object-cover border-2 border-accent mr-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-user.jpg";
                  }}
                />
              ) : (
                <User className="w-7 h-7 rounded-full border-2 border-accent bg-dark-bg-secondary p-1 mr-2" />
              )}
              <span className="font-semibold truncate max-w-[100px]">
                {username}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-full btn-accent text-sm"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-full btn-accent text-sm"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="flex md:hidden items-center justify-center p-2 rounded-full bg-dark-bg-primary/80 hover:bg-accent/80 transition border border-accent/40 shadow-lg"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <motion.div
              initial={false}
              animate={menuOpen ? { rotate: 90, scale: 1.2 } : { rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {menuOpen ? (
                <X className="w-7 h-7 text-accent" />
              ) : (
                <Menu className="w-7 h-7 text-accent" />
              )}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Side Drawer Menu rendered at root level */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-gradient-to-br from-neutral-50/90 to-white/60 dark:from-black dark:to-neutral-900/80 z-[9999] shadow-2xl flex flex-col p-6 space-y-6 backdrop-blur-xl border border-accent/20"
              initial={{ x: "-64px", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-64px", opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20, opacity: { duration: 0.32 } }}
            >
              {/* Close button */}
              <button
                className="self-end p-2 rounded-full hover:bg-accent/20 transition"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <motion.div
                  initial={{ rotate: 0, opacity: 1 }}
                  animate={{ rotate: menuOpen ? 0 : 180, opacity: menuOpen ? 1 : 0 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, opacity: { duration: 0.25 } }}
                >
                  <X className="w-6 h-6 text-accent" />
                </motion.div>
              </button>

              {/* Nav links */}
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 mt-8 mb-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.08, boxShadow: '0 2px 16px 0 rgba(80,80,255,0.18)' }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                      className="w-full max-w-xs"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block text-lg font-inter text-black dark:text-white hover:text-accent transition-colors px-2 py-1 text-center relative after:content-[''] after:block after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full after:rounded-full"
                        style={{ background: 'none', boxShadow: 'none', borderRadius: 0 }}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="h-px bg-accent/40 my-4" />

              {/* Auth (mobile view) */}
              {loading ? (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
                </div>
              ) : user ? (
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-3 py-2 rounded-lg backdrop-blur-md bg-white/60 dark:bg-dark-bg-secondary/70 border border-accent/30 shadow-lg hover:shadow-accent/40 transition-all duration-200 text-accent dark:text-white font-semibold"
                  style={{ boxShadow: '0 4px 24px 0 rgba(80,80,255,0.10)' }}
                >
                  {user.user_metadata?.avatar_url ? (
                    <Image
                      src={
                        user.user_metadata.avatar_url.includes("?")
                          ? `${user.user_metadata.avatar_url}&nav=${Math.random()}`
                          : `${user.user_metadata.avatar_url}?nav=${Math.random()}`
                      }
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full w-8 h-8 object-cover border-2 border-accent mr-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-user.jpg";
                      }}
                    />
                  ) : (
                    <User className="w-8 h-8 rounded-full border-2 border-accent bg-dark-bg-secondary p-1 mr-2" />
                  )}
                  <span className="font-semibold">{username}</span>
                </Link>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 rounded-full bg-accent text-white dark:text-black font-semibold text-center shadow-lg hover:shadow-accent/40 transition-all duration-200 border border-accent/30"
                    style={{ boxShadow: '0 4px 24px 0 rgba(80,80,255,0.10)' }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 rounded-full bg-accent text-white dark:text-black font-semibold text-center shadow-lg hover:shadow-accent/40 transition-all duration-200 border border-accent/30"
                    style={{ boxShadow: '0 4px 24px 0 rgba(80,80,255,0.10)' }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Theme toggle in drawer */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className="mt-auto flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md bg-white/60 dark:bg-dark-bg-secondary/70 border border-accent/30 shadow-lg hover:shadow-accent/40 transition-all duration-200 text-accent dark:text-white font-semibold"
                  style={{ boxShadow: '0 4px 24px 0 rgba(80,80,255,0.10)' }}
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-5 h-5 text-yellow-400" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-blue-400" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
